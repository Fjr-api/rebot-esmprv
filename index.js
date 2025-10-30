import "./config.js"
import makeWASocket, { useMultiFileAuthState, Browsers, DisconnectReason, fetchLatestBaileysVersion, fetchLatestWaWebVersion, jidDecode, downloadContentFromMessage, generateWAMessageFromContent, generateForwardMessageContent } from "@whiskeysocket/baileys";
import Pino from "pino";
import {fileTypeFromBuffer} from "file-type";
import path from "path"
import fs from "fs";
import { Boom } from "@hapi/boom"
import NodeCache from 'node-cache';
import { smsg, getBuffer, getSizeMedia} from "./lib/myfunc.js";
import { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif } from "./lib/exif.js"
import rebotHandler from "./rebot.js";
import { Low, JSONFile } from "lowdb"
import yargs  from "yargs/yargs";
import _  from "lodash";
import PhoneNumber from "awesome-phonenumber";
import schedule from 'node-schedule';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pairingCode = true
const useMobile = false

const groupMetadataCache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 600,
  useClones: false
});

const store = {
  messages: {},
  contacts: {},
  chats: {},
  
  // Group metadata with cache
  groupMetadata: async (jid, rebot) => {
    if (!jid.endsWith('@g.us')) {
      return null;
    }
    
    const cached = groupMetadataCache.get(jid);
    if (cached) {
      console.log(`📦 Using cached metadata for ${jid}`);
      return cached;
    }
    
    try {
      console.log(`🌐 Fetching metadata for ${jid}`);
      const metadata = await rebot.groupMetadata(jid);
      groupMetadataCache.set(jid, metadata);
      return metadata;
    } catch (error) {
      console.error(`Error fetching group metadata for ${jid}:`, error.message);
      return null;
    }
  },
  
  // Helper: Invalidate single group cache
  invalidateGroupCache: (jid) => {
    console.log(`🗑️ Invalidating cache for ${jid}`);
    groupMetadataCache.del(jid);
  },
  
  // Helper: Clear all group cache
  clearGroupCache: () => {
    console.log('🗑️ Clearing all group metadata cache');
    groupMetadataCache.flushAll();
  },
  
  // Helper: Get cache statistics (BARU!)
  getCacheStats: () => {
    const stats = groupMetadataCache.getStats();
    const keys = groupMetadataCache.keys();
    
    return {
      stats: stats,
      keys: keys,
      totalCached: keys.length,
      hits: stats.hits,
      misses: stats.misses,
      hitRate: stats.hits + stats.misses > 0 
      ? ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(2) 
      : 0
    };
  },
  
  // Helper: Get specific cache entry info (BARU!)
  getCacheInfo: (jid) => {
    const cached = groupMetadataCache.get(jid);
    const ttl = groupMetadataCache.getTtl(jid);
    
    return {
      exists: cached !== undefined,
      data: cached || null,
      ttl: ttl,
      expiresIn: ttl ? Math.floor((ttl - Date.now()) / 1000) : null // seconds
    };
  },
  
  // Helper: Get all cached group JIDs (BARU!)
  getCachedGroups: () => {
    return groupMetadataCache.keys();
  },
  
  // Helper: Preload group metadata (BARU!)
  preloadGroupMetadata: async (rebot) => {
    try {
      console.log('🔄 Preloading group metadata...');
      
      const chats = await rebot.groupFetchAllParticipating();
      const groups = Object.values(chats);
      
      let loaded = 0;
      for (const group of groups) {
        if (group.id.endsWith('@g.us')) {
          await store.groupMetadata(group.id, rebot);
          loaded++;
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      console.log(`✅ Preloaded ${loaded} group metadata`);
      return { success: true, count: loaded };
    } catch (error) {
      console.error('Error preloading group metadata:', error.message);
      return { success: false, error: error.message };
    }
  },
  
  // Helper: Set custom TTL for specific group (BARU!)
  setCacheTTL: (jid, ttl) => {
    const cached = groupMetadataCache.get(jid);
    if (cached) {
      groupMetadataCache.set(jid, cached, ttl);
      return true;
    }
    return false;
  },
  
  // Bind events
  bind: function (ev) {
    ev.on("messages.upsert", ({ messages }) => {
      messages.forEach((msg) => {
        if (msg.key && msg.key.remoteJid) {
          this.messages[msg.key.remoteJid] = this.messages[msg.key.remoteJid] || {};
          this.messages[msg.key.remoteJid][msg.key.id] = msg;
        }
      });
    });
    
    ev.on("contacts.update", (contacts) => {
      contacts.forEach((contact) => {
        if (contact.id) {
          this.contacts[contact.id] = contact;
        }
      });
    });
    
    ev.on("chats.set", (chats) => {
      this.chats = chats;
    });
    
    ev.on("groups.update", (updates) => {
      updates.forEach(update => {
        if (update.id) {
          console.log(`🔄 Group updated: ${update.id}, invalidating cache`);
          this.invalidateGroupCache(update.id);
        }
      });
    });
    
    ev.on("group-participants.update", (update) => {
      if (update.id) {
        console.log(`👥 Participants updated in ${update.id}, invalidating cache`);
        this.invalidateGroupCache(update.id);
      }
    });
  },
  
  loadMessage: async (jid, id) => {
    return this.messages[jid]?.[id] || null;
  },
};

global.cacheHelpers = {
  getStats: () => store.getCacheStats(),
  getCacheInfo: (jid) => store.getCacheInfo(jid),
  invalidate: (jid) => store.invalidateGroupCache(jid),
  clear: () => store.clearGroupCache(),
  getCachedGroups: () => store.getCachedGroups(),
  preload: async (rebot) => await store.preloadGroupMetadata(rebot)
};

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse(),
  );
global.db = new Low(new JSONFile(`src/database.json`));
global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(function () {
        !global.db.READ
        ? (clearInterval(this),
          resolve(
            global.db.data == null
            ? global.loadDatabase()
            : global.db.data,
            ))
        : null;
      }, 1 * 1000),
      );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    anonymous: {},
    anonconfess: {},
    fitur: {},
    ...(global.db.data || {}),
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();

// save database every 30seconds
if (global.db)
  setInterval(async () => {
    if (global.db.data) await global.db.write();
  }, 30 * 1000);

async function startRebot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  // const { version, isLatest } = await fetchLatestWaWebVersion();
  const rebot = makeWASocket({
    version: [2, 3000, 1028355510],
    // browser: ['MacOS', 'Safari', '14.4.1'],
    auth: state,
    printQRInTerminal: !pairingCode,
    mobile: useMobile,
    logger: Pino({ level: "silent" }),

    getMessage: async (key) => {
      let jid = jidNormalizedUser(key.remoteJid);
      let msg = await store.loadMessage(jid, key.id);

      return msg?.message || "";
    },
    defaultQueryTimeoutMs: undefined,
  });

  store.bind(rebot.ev);

  rebot.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      const mek = chatUpdate.messages[0];
      // console.log(chatUpdate)
      if (!mek.message) return;

      if (mek.userReceipt && mek.reactions && mek.pollUpdates) {
      // console.log("[SKIP] Bukan WebMessageInfo penuh:", mek.key?.id);
        return;
      }

    // handle ephemeral
      mek.message = Object.keys(mek.message)[0] === "ephemeralMessage"
      ? mek.message.ephemeralMessage.message
      : mek.message;

    // auto read status
      if (mek.key?.remoteJid === "status@broadcast") {
        await rebot.readMessages([mek.key]);
        return;
      }

    // auto read chat biasa
      let readChats = mek.key ? mek.key : mek.message.key;
      rebot.readMessages([readChats]);

    // filter DM (supaya gak double)
      if (!rebot.public && !mek.key.fromMe && chatUpdate.type === "notify") return;


    // filter WA ID tertentu (biasanya message echo)
      if (mek.key.id?.startsWith("3EB0") && mek.key.id.length === 22) return;

    // format pesan dengan smsg
      const m = smsg(rebot, mek, store);

    // filter pesan protocol
      if (m.mtype === "protocolMessage" && m.msg?.type === 17) return;

    // panggil handler utama
      await rebotHandler(rebot, m, chatUpdate, store);

    } catch (e) {
      console.error("Error handling message:", e);
    }
  });


  // rebot.ev.on("messages.upsert", async ( chatUpdate ) => {
  //   try {
  //     const mek = chatUpdate.messages[0];
  //     if (!mek.message) return;
  //     mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

  //     if (mek.key && mek.key.remoteJid === 'status@broadcast') {
  //       await rebot.readMessages([mek.key]);
  //     }

  //     let readChats = mek.key ? mek.key : mek.message.key;
  //     rebot.readMessages([readChats]);

  //     if (!rebot.public && !mek.key.fromMe && chatUpdate.type === "notify") return

  //       if (mek.messageStubType) return

  //         if (mek.key.remoteJid.endsWith('@g.us')) {
  //           if (chatUpdate.type !== "notify") return
  //         }

  //       if (mek.key.id.startsWith("3EB0") && mek.key.id.length === 22) return

  //         const m = smsg(rebot, mek, store);

  //       if (m.mtype === "protocolMessage" && m.msg?.type === 17) return
  //         rebotHandler(rebot, m, chatUpdate, store);

  //     } catch (e) {
  //       console.error("Error handling message:", e);
  //     }
  //   });

  if (pairingCode && !rebot.authState.creds.registered) {
    if (useMobile) throw new Error('Cannot use pairing code with mobile API');

    let phoneNumber;

    if (!!global.pairingNumber) {
      phoneNumber = global.pairingNumber.replace(/[^0-9]/g, '');

      if (!phoneNumber.startsWith('62')) {
        console.log("Start with your country's WhatsApp code, Example: 62xxx");
        process.exit(0);
      }
    }

    setTimeout(async () => {
      // let pairCode = 'REBOT225'
      let code = await rebot.requestPairingCode(phoneNumber);
      code = code?.match(/.{1,4}/g)?.join("-") || code;
      console.log(`Your Pairing Code (${phoneNumber}): `, code);
    }, 3000);
  }

  rebot.ev.on("creds.update", saveCreds);
  rebot.serializeM = (m) => smsg(rebot, m, store);
  rebot.public = true

  rebot.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(
      `Bad Session File, Please Delete Session and Scan Again`,
      );
        rebot.logout();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        startRebot();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        startRebot();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First",
          );
        rebot.logout();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Scan Again And Run.`);
        rebot.logout();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        startRebot();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        startRebot();
      } else if (reason === DisconnectReason.Multidevicemismatch) {
        console.log("Multi device mismatch, please scan again");
        rebot.logout();
      } else
      rebot.end(`Unknown DisconnectReason: ${reason}|${connection}`);
    }
    // else if (connection === 'open') {
    //     let lpor = `6289692509996@s.whatsapp.net`
    //     rebot.sendMessage(lpor, { text: `BOT ON`})
    // }
    console.log("Connected...", update);

  });

 //  rebot.ev.on('lid-mapping.update', (update) => {
 //   console.log('LID mapping updated:', update);
 //     // Auto-stored by v7, tapi bisa log untuk debugging
 // });

  async function resetLimit() {
    let sthum = ['https://rebot.my.id/assets/img/5a55c61d057189da67e0e%20(1).jpg','https://rebot.my.id/assets/img/3ef3144887d67003aacea%20(2).jpg','https://rebot.my.id/assets/img/04239eb81d2feb91d27d0.jpg']
    let rthum = sthum[Math.floor(Math.random() * sthum.length)]
    let userIds = Object.keys(global.db.data.users);

    console.log('Reseted Limit work');

    const groupMetadatal = await rebot.groupMetadata('6289692509996-1632716615@g.us').catch((err) => console.log(err));

// Jumlah seluruh user
    let totalAllUsers = userIds.length;

// Jumlah user non-premium yang limitnya kurang dari 15
    let totalUsersWithLowLimit = userIds.filter(jid => {
      let userData = global.db.data.users[jid];
      return !userData.premium.status && userData.limit < 15;
    }).length;

// const participantsl = await groupMetadatal.participants;

// //Kirim pemberitahuan ke grup bahwa limit telah direset
// rebot.sendMessage('6289692509996@s.whatsapp.net', { 
//     text: 'INFO: Limit telah direset, bagi yang limitnya habis bisa menggunakan bot kembali\n\n> *!* _Free user hanya mendapatkan limit 15/hari, limit akan di reset setiap jam 00.00 WITA, gunakan limit sebaik mungkin_\n> *Kalian bisa membeli limit, list harga ketik .toko, dan chat owner untuk membeli .buy*', 
//     mentions: participantsl.map(a => a.id)
// });

    let respond = `
*[ Reset Limit Notification ]* 

*────────────────────*

- *Rebot™© | 2019-2025*
- *Number:* wa.me/${global.pairingNumber}
- *Total Limit:* 15 / Users
- *Total Users:* ${totalAllUsers} Users
- *Total Reset:* ${totalUsersWithLowLimit} / ${totalAllUsers}
- *Status:* Sukses

*────────────────────*
> *INFO:* Limit sudah direset, bagi yang limitnya habis bisa menggunakan bot kembali\n> *!* _Free user hanya mendapatkan limit 15/hari, limit akan di reset setiap jam 00.00 WIB, gunakan limit sebaik mungkin_\n> *Kalian bisa membeli limit, list harga ketik .toko, dan chat owner untuk membeli .buy*
    `    

    await rebot.sendMessage('120363189865606412@newsletter', { 
      text: respond,
      contextInfo: {
        "externalAdReply": {
          "showAdAttribution": false,
          "renderLargerThumbnail": true,
          "title": `[ Notification Information! ]`, 
          "body": `Reset Limit Notification`,
          "containsAutoReply": true,
          "mediaType": 1, 
          "thumbnailUrl": rthum,
        }
      }
    }, {});

    setTimeout(() => {

      for (let jid of userIds) {
        let userData = global.db.data.users[jid];

// Hanya reset limit untuk user free yang limitnya sudah habis (0)
        if (!userData.premium.status && userData.limit < 15) {
          userData.limit = global.limitawal.free;
        }
      }
    }, 10000)


  }

  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 59
  rule.second = 1

  schedule.scheduleJob(rule, () => {
    resetLimit();

  });

  /**
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} quoted
     * @returns
     */
  rebot.sendMessErr = async (
    jid,
    text,
    mkey,
    quoted,
    ) => {
   await rebot.sendMessage(
    jid,
    {
      text: text,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: false,
          renderLargerThumbnail: true,
          title: `⛔ 𝙴𝚛𝚛𝚘𝚛`,
          body: `ᴛʀʏ ʟᴀᴛᴇʀ...`,
          containsAutoReply: true,
          mediaType: 1,
          thumbnailUrl: 'https://telegra.ph/file/0cafdfb175ba6d2e51d67.png',
        },
      },
    },
    {
      quoted,
    },
    );

   await rebot.sendMessage(jid, {
    react: {
      text: '❌',
      key: mkey,
    }})
 }

   /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} caption
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
 rebot.sendImage = async (jid, path, caption = "", quoted = "", options) => {
  let buffer = Buffer.isBuffer(path)
  ? path
  : /^data:.*?\/.*?;base64,/i.test(path)
  ? Buffer.from(path.split`,`[1], "base64")
  : /^https?:\/\//.test(path)
  ? await await getBuffer(path)
  : fs.existsSync(path)
  ? fs.readFileSync(path)
  : Buffer.alloc(0);
  return await rebot.sendMessage(
    jid,
    { image: buffer, caption: caption, ...options },
    { quoted },
    );
};

  // Setting
rebot.decodeJid = (jid) => {
  if (!jid) return jid;

    // Memeriksa apakah JID memiliki format dengan ":angka@" di dalamnya
  if (/:\d+@/gi.test(jid)) {
    let decode = jidDecode(jid) || {};
    return (
      (decode.user && decode.server && `${decode.user}@${decode.server}`) ||
      jid
      );
  } else {
    return jid;
  }
};

  /**
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
rebot.sendText = (jid, text, quoted = "", options) =>
rebot.sendMessage(
  jid,
  { text: text, ...options },
  { quoted, ...options },
  );

  /**
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
rebot.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
rebot.sendMessage(
  jid,
  {
    text: text,
    mentions: [...text.matchAll(/@(\d{0,16})/g)].map(
      (v) => v[1] + "@s.whatsapp.net",
      ),
    ...options,
  },
  { quoted },
  );

  /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
rebot.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
  let buff = Buffer.isBuffer(path)
  ? path
  : /^data:.*?\/.*?;base64,/i.test(path)
  ? Buffer.from(path.split`,`[1], "base64")
  : /^https?:\/\//.test(path)
  ? await await getBuffer(path)
  : fs.existsSync(path)
  ? fs.readFileSync(path)
  : Buffer.alloc(0);
  let buffer;
  if (options && (options.packname || options.author)) {
    buffer = await writeExifImg(buff, options);
  } else {
    buffer = await imageToWebp(buff);
  }

  await rebot.sendMessage(
    jid,
    { sticker: { url: buffer }, ...options },
    { quoted },
    );
  return buffer;
};
  /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
rebot.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
  let buff = Buffer.isBuffer(path)
  ? path
  : /^data:.*?\/.*?;base64,/i.test(path)
  ? Buffer.from(path.split`,`[1], "base64")
  : /^https?:\/\//.test(path)
  ? await await getBuffer(path)
  : fs.existsSync(path)
  ? fs.readFileSync(path)
  : Buffer.alloc(0);
  let buffer;
  if (options && (options.packname || options.author)) {
    buffer = await writeExifVid(buff, options);
  } else {
    buffer = await videoToWebp(buff);
  }

  await rebot.sendMessage(
    jid,
    { sticker: { url: buffer }, ...options },
    { quoted },
    );
  return buffer;
};

/**
     *
     * @param {*} message
     * @param {*} filename
     * @param {*} attachExtension
     * @returns
     */
rebot.downloadAndSaveMediaMessage = async (
  message,
  filename,
  attachExtension = true,
  ) => {
  let quoted = message.msg ? message.msg : message;
  let mime = (message.msg || message).mimetype || "";
  let messageType = message.mtype
  ? message.mtype.replace(/Message/gi, "")
  : mime.split("/")[0];
  const stream = await downloadContentFromMessage(quoted, messageType);
  let buffer = Buffer.from([]);
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  let type = await fileTypeFromBuffer(buffer);
  let trueFileName = attachExtension ? filename + "." + type.ext : filename;
        // save to file
  await fs.writeFileSync(trueFileName, buffer);
  return trueFileName;
};

rebot.downloadMediaMessage = async (message) => {
  let mime = (message.msg || message).mimetype || "";
  let messageType = message.mtype
  ? message.mtype.replace(/Message/gi, "")
  : mime.split("/")[0];
  const stream = await downloadContentFromMessage(message, messageType);
  let buffer = Buffer.from([]);
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  return buffer;
};

rebot.sendMedia = async (
  jid,
  path,
  fileName = "",
  caption = "",
  quoted = "",
  options = {},
  ) => {
  let types = await rebot.getFile(path, true);
  let { mime, ext, res, data, filename } = types;
  if ((res && res.status !== 200)) {
    try {
      throw { json: JSON.parse(file.toString()) };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }
  let type = "",
  mimetype = mime,
  pathFile = filename;
  if (options.asDocument) type = "document";
  if (options.asSticker || /webp/.test(mime)) {
    let media = { mimetype: mime, data };
    pathFile = await writeExif(media, {
      packname: options.packname ? options.packname : global.packname,
      author: options.author ? options.author : global.author,
      categories: options.categories ? options.categories : [],
    });
    await fs.promises.unlink(filename);
    type = "sticker";
    mimetype = "image/webp";
  } else if (/image/.test(mime)) type = "image";
  else if (/video/.test(mime)) type = "video";
  else if (/audio/.test(mime)) type = "audio";
  else type = "document";
  await rebot.sendMessage(
    jid,
    {
      [type]: { url: pathFile },
      caption,
      mimetype,
      fileName,
      ...options,
    },
    { quoted, ...options },
    );
  return fs.promises.unlink(pathFile);
};

rebot.getFile = async (PATH, save) => {
  let res;
  let data = Buffer.isBuffer(PATH)
  ? PATH
  : /^data:.*?\/.*?;base64,/i.test(PATH)
  ? Buffer.from(PATH.split`,`[1], "base64")
  : /^https?:\/\//.test(PATH)
  ? await (res = await getBuffer(PATH))
  : fs.existsSync(PATH)
  ? ((filename = PATH), fs.readFileSync(PATH))
  : typeof PATH === "string"
  ? PATH
  : Buffer.alloc(0);
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
  let type = (await fileTypeFromBuffer(data)) || {
    mime: "application/octet-stream",
    ext: ".bin",
  };
  let filename = path.join(
    __dirname,
    "../src/" + new Date() * 1 + "." + type.ext,
    );
  if (data && save) fs.promises.writeFile(filename, data);
  return {
    res,
    filename,
    size: await getSizeMedia(data),
    ...type,
    data,
  };
};

rebot.getName = (jid, withoutContact = false) => {
  let id = rebot.decodeJid(jid);
  withoutContact = rebot.withoutContact || withoutContact;
  let v;
  if (id.endsWith("@g.us"))
    return new Promise(async (resolve) => {
      v = store.contacts[id] || {};
      if (!(v.name || v.subject)) v = rebot.groupMetadata(id) || {};
      resolve(
        v.name ||
        v.subject ||
        PhoneNumber(
          "+" + id.replace("@s.whatsapp.net", ""),
          ).getNumber("international"),
        );
    });
  else
    v =
  id === "0@s.whatsapp.net"
  ? {
    id,
    name: "WhatsApp",
  }
  : id === rebot.decodeJid(rebot.user.id)
  ? rebot.user
  : store.contacts[id] || {};
  return (
    (withoutContact ? "" : v.name) ||
    v.subject ||
    v.verifiedName ||
    PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
      "international",
      )
    );
};

 /**
     *
     * @param {*} jid
     * @param {*} message
     * @param {*} forceForward
     * @param {*} options
     * @returns
     */
rebot.copyNForward = async (
  jid,
  message,
  forceForward = false,
  options = {},
  ) => {
  let vtype;
  if (options.readViewOnce) {
    message.message =
    message.message &&
    message.message.ephemeralMessage &&
    message.message.ephemeralMessage.message
    ? message.message.ephemeralMessage.message
    : message.message || undefined;
    vtype = Object.keys(message.message.viewOnceMessage.message)[0];
    delete (message.message && message.message.ignore
      ? message.message.ignore
      : message.message || undefined);
    delete message.message.viewOnceMessage.message[vtype].viewOnce;
    message.message = {
      ...message.message.viewOnceMessage.message,
    };
  }

  let mtype = Object.keys(message.message)[0];
  let content = await generateForwardMessageContent(
    message,
    forceForward,
    );
  let ctype = Object.keys(content)[0];
  let context = {};
  if (mtype != "conversation")
    context = message.message[mtype].contextInfo;
  content[ctype].contextInfo = {
    ...context,
    ...content[ctype].contextInfo,
  };
  const waMessage = await generateWAMessageFromContent(
    jid,
    content,
    options
    ? {
      ...content[ctype],
      ...options,
      ...(options.contextInfo
        ? {
          contextInfo: {
            ...content[ctype].contextInfo,
            ...options.contextInfo,
          },
        }
        : {}),
    }
    : {},
    );
  await rebot.relayMessage(jid, waMessage.message, {
    messageId: waMessage.key.id,
  });
  return waMessage;
};

return rebot;

}

startRebot();

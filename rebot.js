 import "./config.js";
 import { jidNormalizedUser, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia } from "@whiskeysocket/baileys"
 import util, { promisify } from "util";
 import fs from "fs";
 import qs from "qs";
 import axios from 'axios';
 import * as cheerio from "cheerio";
 import FormData from 'form-data';
 import { fileURLToPath } from 'url';
 import path, { dirname } from "path"
 import ffmpeg from "fluent-ffmpeg";
 import chalk from "chalk"
 import os from "os"
 import { exec, spawn, execSync } from "child_process"
 import { fileTypeFromBuffer } from 'file-type';
 import { runtime, smsg, getBuffer, fetchJson, isUrl, getRandom, jsonformat, getGroupAdmins, formatp} from "./lib/myfunc.js"
 import ms from 'parse-ms'
 import toMs from "ms";
 import moment from 'moment-timezone'
 import yts  from "yt-search"
 import { uploadFile, btch } from './lib/uploader.js'
 import { checkUserMessageLimit } from "./lib/antispam.js"
 import { makeBrat } from './lib/brat.js'
 import { apkpuredl } from './lib/apkpuredl.js'
 import { MusicalDown } from './lib/tiktokdl.js'
 import { pinterest, pindl } from './lib/pin.js'

 const execPromise = promisify(exec);

 //Variabel declared
 let cmhit = []
 let multi = true
 let nopref = false
 let enhance = {};

 export default async function rebotHandler(rebot, m, chatUpdate, store) { 
  try {

// variabel body to prefix
    const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') ? m.message.documentMessage.caption : (m.mtype == 'reactionMessage') ? m.message.reactionMessage.text : (m.mtype == 'locationMessage') ? m.message.locationMessage.comment : (m.mtype == 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    const budy = (typeof m.text == 'string' ? m.text : '')
    var prefix;

    if (multi && !nopref) {
      prefix = /^[z°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[z°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : ".";
    } else {
      prefix = nopref ? "" : global.prefa || ".";
    }

const isCmd = (new RegExp(`^\\${prefix}\\S+`, 'gi')).test(body) || (!prefix && !body.startsWith('.')); // Memeriksa apakah pesan dimulai dengan prefix atau langsung command tanpa prefix
const command = isCmd ? (body.startsWith(prefix) ? body.split(' ')[0].slice(prefix.length).toLowerCase() : body.split(' ')[0].toLowerCase()) : ''; // Mengambil command setelah prefix atau langsung jika tanpa prefix
const args = isCmd ? body.trim().split(/ +/).slice(1) : [];

  // variabel user and subject
const text = args.join(" ")
const q = args.join(" ")
const pushname = m.pushName || "GK ada namanya"
const botNumber = await rebot.decodeJid(rebot.user.id)
const fatkuns = (m.quoted || m)
const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const isMedia = /image|video|sticker|audio/.test(mime)
const creatorIds = [botNumber, ...global.owner]
.map(v => {
  const num = v.replace(/[^0-9]/g, '');
  return [
    `${num}@s.whatsapp.net`,
    `${num}@c.us`,
    `${num}@lid`
  ];
})
.flat();
const isCreator = creatorIds.includes(m.sender);
const isModerator = isCreator || (global.db.data.users[m.sender] && global.db.data.users[m.sender].moderator?.status === true)
const isPremium = isCreator || (global.db.data.users[m.sender] && global.db.data.users[m.sender].premium && global.db.data.users[m.sender].premium.status === true);
const isBan = (global.db.data.users[m.sender] && global.db.data.users[m.sender].banned && global.db.data.users[m.sender].banned === true);
const isBanspam = (global.db.data.users[m.sender] && global.db.data.users[m.sender].banspam && global.db.data.users[m.sender].banspam.status === true);



  // variabel Group
const groupMetadata = m.isGroup ? await store.groupMetadata(m.chat, rebot).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

//Another variabel 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const more = String.fromCharCode(8206);
const readmore = more.repeat(550);
const timeWib = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const timeWita = moment().tz('Asia/Makassar').format('DD/MM HH:mm:ss')
const timeWit = moment().tz('Asia/Jayapura').format('DD/MM HH:mm:ss')
const introthumb = fs.readFileSync('./lib/introthumb.mp4')
const _datamenfes = './src/datamenfes.json';
const tiktokRegex = /(https?:\/\/(?:www\.)?(?:tiktok\.com|vt\.tiktok\.com|vm\.tiktok\.com)\/[^\s]+)/g;
const instagramRegex = /(https?:\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:p|reel|stories)\/[A-Za-z0-9_-]+\/?)/g;
const twitterRegex = /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[^\s]+/g;
let thumkula = fs.readFileSync('./lib/logo_kulakoding.png')
let lnkgc = 'https://chat.whatsapp.com/EKZYKac5IKs6RIzl26Dhku'
let sthum = ['https://rebot-studio.xyz/assets/img/5a55c61d057189da67e0e%20(1).jpg','https://rebot-studio.xyz/assets/img/3ef3144887d67003aacea%20(2).jpg','https://rebot-studio.xyz/assets/img/04239eb81d2feb91d27d0.jpg']
let rthum = sthum[Math.floor(Math.random() * sthum.length)]
let thumbmenu = await getBuffer(rthum)



//DATABASE INISIALIZATION
let isNumber = x => typeof x === 'number' && !isNaN(x);

// Determine limit based on premium status
let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free;

// Determine JID & LID
let jid, lid;
if (m.key.remoteJid.endsWith('@s.whatsapp.net')) {
  jid = m.key.remoteJid;
  lid = m.key.remoteJidAlt;
} else if (m.key.remoteJid.endsWith('@g.us')) {
  jid = m.key.participantAlt;
  lid = m.key.participant;
}

let keyUser = jid || m.sender;

// === CRITICAL FIX: Initialize user object properly ===

// Ensure users object exists
if (!global.db.data.users) {
  global.db.data.users = {};
}

// Check if user exists, if not create with defaults
if (!global.db.data.users[keyUser]) {
  console.log(`Creating new user: ${keyUser}`);
  
  global.db.data.users[keyUser] = {
    afkTime: -1,
    afkReason: '',
    limit: limitUser,
    moderator: { status: false, expired: 0 },
    premium: { status: false, expired: 0 },
    banspam: { status: false, expired: 0 },
    banned: false,
    jid: jid,
    lid: lid
  };
}

// NOW get user reference (guaranteed to exist)
let user = global.db.data.users[keyUser];

// Validate and fill missing properties (for existing users)
if (!isNumber(user.afkTime)) user.afkTime = -1;
if (!('afkReason' in user)) user.afkReason = '';
if (!isNumber(user.limit)) user.limit = limitUser;
if (!('banned' in user)) user.banned = false;

// Ensure objects exist with proper structure
if (!user.moderator || typeof user.moderator !== 'object') {
  user.moderator = { status: false, expired: 0 };
}
if (!user.premium || typeof user.premium !== 'object') {
  user.premium = { status: false, expired: 0 };
}
if (!user.banspam || typeof user.banspam !== 'object') {
  user.banspam = { status: false, expired: 0 };
}

// Update identities (in case they changed)
user.jid = jid;
user.lid = lid;

// === VERIFICATION (Optional but recommended) ===
console.log(`User loaded: ${keyUser}`, {
  limit: user.limit,
  premium: user.premium?.status || false,
  banned: user.banned
});


let chats = global.db.data.chats[m.chat]
if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
  if (chats) {
    if (!('mute' in chats)) chats.mute = false
      if (!('antilink' in chats)) chats.antilink = false
        if (!('mentionsTag' in chats)) chats.mentionsTag = { antiMention: false, autoKick: false }
          if (!('antiurl' in chats)) chats.antiurl = { antiurls: false, autoKickurl: false, setMessageUrl: true }
        } else global.db.data.chats[m.chat] = {
          mute: false,
          antilink: false,
          mentionsTag: { antiMention: false, autoKick: false },
          antiurl: { antiurls: false, autoKickurl: false, setMessageUrl: true },
        }

        let setting = global.db.data.settings[botNumber]
        const now = new Date();
        if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
          if (setting) {
            if (!isNumber(setting.status)) setting.status = 0
              if (!isNumber(setting.hit)) setting.hit = 0
                if (!isNumber(setting.resetlimit)) setting.resetlimit = { dateYesterday:  new Date().getDate(), boolLimit: false }
                  if (!('earthquakeData' in setting)) setting.earthquakeData = null
                    if (!('autobio' in setting)) setting.autobio = true
                      if (!('changelog' in setting)) setting.changelog = []
                        if (!('templateImage' in setting)) setting.templateImage = false
                          if (!('templateVideo' in setting)) setting.templateVideo = false
                            if (!('templateGif' in setting)) setting.templateGif = false
                              if (!('templateLoc' in setting)) setting.templateLoc = true
                                if (!('templateMsg' in setting)) setting.templateMsg = false    
                              } else global.db.data.settings[botNumber] = {
                                status: 0,
                                hit: 0,
resetlimit: { dateYesterday:  new Date().getDate(), boolLimit: false }, // Fixed this line
earthquakeData: null,
autobio: true,
changelog: [],
templateImage: false,
templateVideo: false,
templateGif: false,
templateLoc: true,
templateMsg: false,
}


if (m.message) {
  console.log(chalk.black(chalk.bgGreen('[ TIME ]')), chalk.black(chalk.bgGreen(new Date)) + '\n' + chalk.white('[ PESAN ]'), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? groupName : 'Private Chat', m.chat))
  // console.log(m)
}

cmhit.push(command)
global.db.data.settings[botNumber].hit += 1

if (isBan) {
  return m.reply('> _ⓘ Maaf kamu sudah terbanned permanen di bot ini_')
} 

async function getLidFromJid(id) {
  if (id.endsWith("@lid")) return id;
  const res = await rebot.onWhatsApp(id).catch(() => []);
  // console.log(res)
  return res[0]?.lid || id;
}

async function normalizedMention(id) {
  if (id.startsWith("@")) {
    let lidNumber = id.replace(/^@/, '') 
    let userLid = lidNumber + '@lid'
    let userEntry = Object.values(global.db.data.users).find(u => u.lid === userLid)
    if (userEntry) {
      let res = userEntry.jid
      console.log(userLid + "<-->" + res)
      return res
    }
  } else {
    let res = id.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    console.log(res)
    return res
  }
}

function shuffleArray(array) {
 for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
}

async function createImage(url) {
  const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: rebot.waUploadToServer
  });
  return imageMessage;
}

async function createVideo(url) {
  const { videoMessage } = await prepareWAMessageMedia({
    video: {
      url
    }
  }, {
    upload: rebot.waUploadToServer
  });
  return videoMessage;
}

async function reactAwait() {
  rebot.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }})
}

async function reactDone() {
  rebot.sendMessage(m.chat, {
    react: {
      text: '✅',
      key: m.key,
    }})
}
async function reactError() {
  rebot.sendMessage(m.chat, {
    react: {
      text: '❌',
      key: m.key,
    }})
}

function generateSessionId() {
 return Math.random().toString(36).substr(2, 5);
}

function findAnonConfessSessionByUser(user) {
  return Object.values(db.data.anonconfess).find(session => session.a === user || session.b === user);
}

function findAnonConfessSessionForTarget(target) {
  return Object.values(db.data.anonconfess).find(session => session.b === target && session.state === 'WAITING');
}

function tambahHitFitur(fiturId) {
  if (global.db.data.fitur[fiturId]) {
    global.db.data.fitur[fiturId].hit = (global.db.data.fitur[fiturId].hit || 0) + 1;
  }
}

var speecTime = moment.tz('Asia/Jakarta').format('HH')

var jm = parseInt(speecTime)

var textSpeech = ''

if (jm === 0) {
  textSpeech = "Midnight 🌚"
} else if (jm === 1) {
  textSpeech = "Midnight 🌚"
} else if (jm === 2) {
  textSpeech = "Midnight 🌚"
} else if (jm === 3) {
  textSpeech = "Midnight 🌔"
} else if (jm === 4) {
  textSpeech = "Midnight 🌔"
} else if (jm === 5) {
  textSpeech = "Subuh 🌄"
} else if (jm === 6) {
  textSpeech = "Morning 🌄"
} else if (jm === 7) {
  textSpeech = "Morning 🌄"
} else if (jm === 8) {
  textSpeech = "Morning ☀️"
} else if (jm === 9) {
  textSpeech = "Morning ☀️"
} else if (jm === 10) {
  textSpeech = "Morning ☀️"
} else if (jm === 11) {
  textSpeech = "Afternoon 🌞"
} else if (jm === 12) {
  textSpeech = "Zuhur 🌞"
} else if (jm === 13) {
  textSpeech = "Afternoon 🌞"
} else if (jm === 14) {
  textSpeech = "Afternoon 🌞"
} else if (jm === 15) {
  textSpeech = "Ashar 🌞"
} else if (jm === 16) {
  textSpeech = "Afternoon ☀️"
} else if (jm === 17) {
  textSpeech = "Evening 🌄"
} else if (jm === 18) {
  textSpeech = "Maghrib 🌄"
} else if (jm === 19) {
  textSpeech = "Isha 🌙"
} else if (jm === 20) {
  textSpeech = "Night 🌙"
} else if (jm === 21) {
  textSpeech = "Night 🌙"
} else if (jm === 22) {
  textSpeech = "Midnight 🌙"
} else if (jm === 23) {
  textSpeech = "Midnight 🌚"
}
// console.log(`${textSpeech}`)

var tampilUcapan = `${textSpeech}`


let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
const week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString(locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})


// Helper function untuk webp to mp4
async function webpToMp4ImageMagick(inputPath, outputPath, options = {}) {
  try {
    const {
      duration = 3,
      fps = 15,
      quality = "medium"
    } = options;

    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const tempPattern = path.join(tempDir, `frame_%03d.png`);
    const tempVideo = path.join(tempDir, `temp_${Date.now()}.mp4`);

    // Extract frames using ImageMagick
    await execPromise(`convert "${inputPath}" "${tempPattern}"`);

    // Check if frames were extracted
    const frames = fs.readdirSync(tempDir).filter(file => file.startsWith('frame_'));
    
    if (frames.length === 0) {
      throw new Error('No frames extracted from webp');
    }

    console.log(`Extracted ${frames.length} frames`);

    // Convert frames to mp4 using FFmpeg
    const framerate = frames.length > 1 ? fps : `1/${duration}`;
    
    await execPromise(`ffmpeg -y -framerate ${framerate} -i "${tempPattern}" -c:v libx264 -pix_fmt yuv420p -vf "scale=512:512" "${outputPath}"`);

    // Cleanup temp files
    frames.forEach(frame => {
      fs.unlinkSync(path.join(tempDir, frame));
    });

    return outputPath;

  } catch (error) {
    throw new Error(`ImageMagick conversion failed: ${error.message}`);
  }
}



async function handleTiktokLink(text) {
  reactAwait()
  let datas = await fetchJson(`https://api.tiklydown.eu.org/api/download?apikey=tk_313440a1e84256af41b33a6db8f13d65248bd121fd915a1400d95d29f55e1b7f&url=${encodeURIComponent(text)}`);
  // console.log(datas)

  if (datas.images) {
    try {
      let push = [];
      let res = datas.images.map(photo => photo.url).filter(url => url !== undefined);
      let i = 1;
      // console.log(res)

      for (let pus of res) {
        push.push({
          body: {
            text: `Image slide ke - ${i++}`
          },
          footer: {
            text: '*Rebot™© | 2019-2025*'
          },
          header: {
            title: 'TikTok Slideshow Image',
            hasMediaAttachment: true,
            imageMessage: await createImage(pus)
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: 'Source',
                  url: pus,
                  merchant_url: pus
                })
              }
            ]
          }
        });
      }

      const interactiveMessage = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: {
                text: `Tiktok Slide Image\n\nStatus: Success\nUrl: ${text}`
              },
              footer: {
                text: '*Rebot™© | 2019-2025*'
              },
              header: {
                hasMediaAttachment: false
              },
              carouselMessage: {
                cards: push
              }
            }
          }
        }
      };
      await rebot.relayMessage(m.chat, interactiveMessage, { quoted: m });
      user.limit -= 1;
    } catch (err) {
      throw err
    }

  }  else  {
    try {
      const dataDownload = await fetchJson(`https://api.tiklydown.eu.org/api/download?apikey=tk_313440a1e84256af41b33a6db8f13d65248bd121fd915a1400d95d29f55e1b7f&url=${encodeURIComponent(text)}`);

      let ttl = '⭔ Status: Success Server Default 1';
      rebot.sendMessage(m.chat, { video : {url: dataDownload.video.noWatermark } , mimetype: 'video/mp4',caption : `Rebot - Make your activities simpler\n\n${ttl}\n\n> Gunakan fitur\n> _.ttmp3 [untuk versi audio]_\n> _.tthd [untuk versi HD]_`},{quoted : m})
      user.limit -= 1;
    } catch (err) {
      try {
        const dataDownload2 = await fetchJson(`https://api.zenzxz.my.id/downloader/tiktok?url=${encodeURIComponent(text)}`);
        await MusicalDown(text)

        let ttl = '⭔ Status: Success Server Default 2';
        rebot.sendMessage(m.chat, { video : {url: dataDownload2.result.data.play } , mimetype: 'video/mp4',caption : `Rebot - Make your activities simpler\n\n${ttl}\n\n> Gunakan fitur\n> _.ttmp3 [untuk versi audio]_\n> _.tthd [untuk versi HD]_`},{quoted : m})
        user.limit -= 1;
      } catch (err) {
        try {
          const dataDownload3= await MusicalDown(text)

          let ttl = '⭔ Status: Success Server Default 3';
          rebot.sendMessage(m.chat, { video : {url: dataDownload3.result.video1} , mimetype: 'video/mp4',caption : `Rebot - Make your activities simpler\n\n${ttl}\n\n> Gunakan fitur\n> _.ttmp3 [untuk versi audio]_\n> _.tthd [untuk versi HD]_`},{quoted : m})
          user.limit -= 1;
        } catch (err) {
          throw err
        }
      }
    }
  }
}

async function handleInstagramLink(text) {
  reactAwait()

  try {
    let datas = await fetchJson(`https://api.zenzxz.my.id/api/downloader/instagram?url=${encodeURIComponent(text)}`);
    
    // Validasi response baru
    if (!datas.success || !datas.data || !Array.isArray(datas.data)) {
      return m.reply('❌ Gagal mengambil data dari Instagram. Link mungkin tidak valid atau private.');
    }
    
    // Filter media yang valid berdasarkan struktur baru
    let medias = datas.data.filter(media => 
      media && media.type && (media.downloadUrl || media.videoUrl || media.imageUrl)
      );
    
    if (medias.length === 0) {
      return m.reply('❌ Tidak ada media yang dapat diunduh dari link tersebut.');
    }
    
    // Pisahkan images dan videos berdasarkan struktur baru
    let images = medias.filter(media => media.type === 'image');
    let videos = medias.filter(media => media.type === 'video');
    
    let successCount = 0;
    let failedCount = 0;
    
    // 🔥 TAMBAH HIT COUNTER
    tambahHitFitur('igdl');
    
    // Dapatkan info author dari media pertama
    const author = medias[0]?.author;
    const authorInfo = author ? `👤 **Author:** ${author.name || 'Unknown'} (@${author.username || 'unknown'})\n` : '';
    
    // PART 1: Handle IMAGES
    if (images.length > 0) {
      try {
        let push = [];
        
        for (let [index, image] of images.entries()) {
          try {
            // Gunakan downloadUrl jika ada, fallback ke imageUrl
            const imageUrl = image.downloadUrl || image.imageUrl;
            if (!imageUrl) continue;
            
            push.push({
              body: {
                text: `📸 Image ${index + 1}/${images.length}\n\n${authorInfo}🆔 ID: ${image.id || 'Unknown'}`
              },
              footer: {
                text: '*Rebot™© | 2019-2025*'
              },
              header: {
                title: '📷 Instagram Image',
                hasMediaAttachment: true,
                imageMessage: await createImage(imageUrl)
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: 'View Original',
                      url: imageUrl,
                      merchant_url: imageUrl
                    })
                  }
                ]
              }
            });
            successCount++;
          } catch (err) {
            failedCount++;
          }
        }
        
        // Kirim image cards jika berhasil
        if (push.length > 0) {
          const imageCarousel = {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: {
                  body: {
                    text: `📸 Instagram Images\n\n${authorInfo}📊 Total Images: ${push.length}/${images.length}`
                  },
                  footer: {
                    text: '*Rebot™© | 2019-2025*'
                  },
                  header: {
                    hasMediaAttachment: false
                  },
                  carouselMessage: {
                    cards: push
                  }
                }
              }
            }
          };
          
          await rebot.relayMessage(m.chat, imageCarousel, { quoted: m });
        }
        
      } catch (err) {
        // Fallback: kirim images normal
        for (let [index, image] of images.entries()) {
          try {
            const imageUrl = image.downloadUrl || image.imageUrl;
            if (!imageUrl) continue;
            
            await rebot.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: `📸 **Instagram Image ${index + 1}/${images.length}**\n\n${authorInfo}🆔 **ID:** ${image.id || 'Unknown'}\n\n*Rebot™© | 2019-2025*`
            }, { quoted: m });
            
            successCount++;
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (err) {
            failedCount++;
          }
        }
      }
    }
    
    // PART 2: Handle VIDEOS
    if (videos.length > 0) {
      if (images.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      for (let [index, video] of videos.entries()) {
        try {
          // Gunakan downloadUrl jika ada, fallback ke videoUrl
          const videoUrl = video.downloadUrl || video.videoUrl;
          if (!videoUrl) continue;
          
          await rebot.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `🎥 **Instagram Video ${index + 1}/${videos.length}**\n\n${authorInfo}🆔 **ID:** ${video.id || 'Unknown'}\n\n*Rebot™© | 2019-2025*`
          }, { quoted: m });
          
          successCount++;
          
          if (index < videos.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          }
          
        } catch (err) {
          failedCount++;
        }
      }
    }
    
    // Kurangi limit user
    user.limit -= 1;
    reactDone()
    if (successCount === 0) {
      return m.reply('❌ Gagal mengunduh media dari Instagram.');
    }
    
  } catch (err) {
    throw err
  }
}

async function handleTwitterxLink(text) {
  reactAwait();
  
  try {
    let datas = await fetchJson(`https://api.zenzxz.my.id/api/downloader/twitter?url=${encodeURIComponent(text)}`);
    
    if (!datas.success || !datas.data || !datas.data.download_url) {
      return m.reply('❌ Gagal mengambil data dari Twitter. Link mungkin tidak valid atau private.');
    }
    
    // 🔥 TAMBAH HIT COUNTER
    tambahHitFitur('xdl');
    
    const mediaData = datas.data;
    const downloadUrl = mediaData.download_url;
    const thumbnail = mediaData.thumbnail;
    const author = mediaData.author || 'Unknown';
    const description = mediaData.description || 'No description';
    
    // Deteksi tipe media dari thumbnail URL pattern (Twitter specific)
    const isVideo = thumbnail && thumbnail.includes('amplify_video_thumb');
    
    if (isVideo) {
      // Kirim sebagai VIDEO
      await rebot.sendMessage(m.chat, {
        video: { url: downloadUrl },
        caption: `🐦 **Twitter Video**\n\n📝 **Tweet:** ${author}\n🔍 **Description:** ${description}\n\n*Rebot™© | 2019-2025*`
      }, { quoted: m });
    } else {
      // Kirim sebagai IMAGE
      await rebot.sendMessage(m.chat, {
        image: { url: downloadUrl },
        caption: `🐦 **Twitter Image**\n\n📝 **Tweet:** ${author}\n🔍 **Description:** ${description}\n\n*Rebot™© | 2019-2025*`
      }, { quoted: m });
    }
    
    // Kurangi limit user
    user.limit -= 1;
    reactDone()
  } catch (err) {
    throw err
  }
}

/////////////////////////Funcion moderator/////////////////////////////// 

const expiredModeratorCheck = (rebot, db) => {
  setInterval(() => {
    Object.keys(db.data.users).forEach((jid) => {
      let user = db.data.users[jid];
// Pastikan user memiliki properti premium dan waktu expired tidak nol
      if (
        user.moderator && 
        user.moderator.status === true && 
        user.moderator.expired !== 0 &&
        Date.now() >= user.moderator.expired
        ) {
// Reset status premium dan limit ke nilai free
        user.moderator = { status: false, expired: 0 };

// Kirim notifikasi ke user bahwa premium telah expired
      rebot.sendText(jid, '「 *moderator Expired* 」\n\n*_Masa moderator kamu sudah berakhir, sekarang kamu tidak lagi Menjadi Moderator_*\n\n> _ⓘ Jika kamu ingin membeli bisa ketik .toko atau chat owner_');
      rebot.sendText(global.ownerJid+`@s.whatsapp.net`,`*「  MODERATOR EXPIRED 」* \n\nHai Owner! Waktu moderator *${jid}*, Telah Berakhir!`, m);

    }
  });
}, 1000); // Pengecekan dilakukan setiap 1 detik
};

expiredModeratorCheck(rebot, global.db)
/////////////////////////end function///////////////////////////////


// Auto cleanup fitur expired setiap 1 jam
const cleanupFitur = (rebot, db) => {
  setInterval(() => {
    const now = Date.now();
    let cleanedCount = 0;

    Object.keys(db.data.fitur).forEach(id => {
      const fitur = db.data.fitur[id];
      if (fitur.isNew && fitur.isNew.status && fitur.isNew.expired > 0 && fitur.isNew.expired < now) {
        fitur.isNew.status = false;
        cleanedCount++;
      }
    });

    if (cleanedCount > 0) {
      console.log(`🔄 Auto-cleanup: ${cleanedCount} fitur expired di-nonaktifkan`);
    }
}, 60 * 60 * 1000); // Setiap 1 jam
}

cleanupFitur(rebot, global.db)
/////////////////////////Funcion antispam/////////////////////////////// 

function extractCommands(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /case\s+'([^']+)'(?=:)/g;
  let match;
  const cmdTect = [];

  while ((match = regex.exec(content)) !== null) {
    cmdTect.push(match[1]);
  }

  return cmdTect;
}

const cmdTecth = extractCommands(path.join(__dirname, 'rebot.js'));


if (!isCreator && isCmd && checkUserMessageLimit(m.sender)) {
  const spamTime = toMs("30m")
const additionalTime = toMs("10m"); // Waktu tambahan 15 menit
const user = global.db.data.users[m.sender]

if (!isBanspam) {
  user.banspam = { status: true, expired: Date.now() + spamTime };
} else {
  const remainingTime = user.banspam.expired - Date.now();
  const newDuration = remainingTime + additionalTime;
  user.banspam.expired += toMs(`${newDuration}ms`);
  m.reply('> _ⓘ Melakukan spam saat masa banned/coldown, waktu coldown kamu ditambahkan 5 menit_')
}

rebot.sendText(`6289692509996@s.whatsapp.net`, 'SPAM DETECTION!!', m);
m.reply('> _ⓘ Maaf kamu terdeteksi melakukan spam, kamu akan dibanned dan tidak bisa menggunakan fitur bot sementara dengan coldown waktu 60 menit_\n> _Silahkan gunakan fitur .cekspam untuk melihat detail coldown_');
}

const expiredBanSpam = (rebot, db) => {
  setInterval(() => {
    Object.keys(db.data.users).forEach((jid) => {
      let user = db.data.users[jid];
// Pastikan user memiliki properti premium dan waktu expired tidak nol
      if (
        user.banspam && 
        user.banspam.status === true && 
        user.banspam.expired !== 0 &&
        Date.now() >= user.banspam.expired
        ) {
// Reset status premium dan limit ke nilai free
        user.banspam = { status: false, expired: 0 };

// Kirim notifikasi ke user bahwa premium telah expired
      rebot.sendText(jid, '「 *Masa Banned Selesai* 」 \n\n*_Waktu banned kamu sudah selesai, Sekarang kamu sudah bisa menggunakan bot kembali_*\n\n> _ⓘ Mohon agar tidak melakukan spam lagi!!_')
     // rebot.sendText(global.ownerJid+`@s.whatsapp.net`,`*「  MODERATOR EXPIRED 」* \n\nHai Owner! Waktu moderator *${jid}*, Telah Berakhir!`, m);

    }
  });
}, 1000); // Pengecekan dilakukan setiap 1 detik
};

expiredBanSpam(rebot, global.db)
/////////////////////////end function///////////////////////////////



switch (command) {
case "tesfit": {
  if (isBanspam) return m.reply(mess.spam)
    if (!isCreator) return m.reply(mess.owner)
     if (!text) return m.reply('Masukkan Link Group!')
      if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply('Link Invalid!')
       m.reply(mess.wait)
     let result = args[0].split('https://chat.whatsapp.com/')[1]
     console.log(result)
     await rebot.groupAcceptInvite(result)

   }
   break;


 case 'menu':
 case 'help':
 case '?': {
  if (isBanspam) return m.reply(mess.spam)
    let about = (await rebot.fetchStatus(m.sender).catch(console.error) || {}).status || 'Nothing'
  let statuser = `${isCreator ? 'Owner' : isPremium ? 'Premium User' : isModerator ? 'Moderator' : 'Basic User'}`
  let limituser = user.limit
  let cekspamUser = ms(user.banspam.expired - Date.now())
  let spamuser = `YES ${cekspamUser.days} day ${cekspamUser.hours} hour ${cekspamUser.minutes} minute`
  let blockList = await rebot.fetchBlocklist() || []; 
  let isBlocked = blockList.includes(m.sender);

  let menunya = `┌──⭓ *Bot Info*
│
│⭔ _Nama Bot : Rebot_
│⭔ _Nama Owner : Mas F_
│⭔ _Mode : ${rebot.public ? 'Public' : 'Self'}_
│⭔ _Total Hit : ${global.db.data.settings[botNumber].hit}_
│⭔ _Runtime : ${runtime(process.uptime())}_
│⭔ _Prefix : Multi Prefix_
│⭓ _Group : https://cutt.ly/Twya7t9K_
│⭓ _Website : https://rebot-studio.xyz_
│
└───────⭓
✄┈┈┈┈┈┈┈${readmore}┈┈
┌──⭓ *User Info*
│
│⭔ _Status : ${statuser}_
│⭔ _Nama : ${pushname}_
│⭔ _Bio : ${about}_
│⭔ _Nomor : @${m.sender.split('@')[0]}_
│⭔ _Limit : ${isPremium ? 'Infinity' : limituser}_
│⭔ _Banned : ${isBan ? '✅' : '❌' }_
│⭔ _Spam : ${isBanspam ? '✅' + spamuser : '❌'}_
│⭔ _Block : ${isBlocked ? '✅' : '❌'}_
│
└───────⭓

┌──⭓ *Today*
│
│⭔ _${tampilUcapan}_
│⭔ _Jam : ${timeWib} WIB_
│⭔ _Hari : ${week} ${weton}_
│⭔ _Tanggal : ${calender}_
│⭔ _WIB : ${timeWib}_
│⭔ _WITA : ${timeWita}_
│⭔ _WIT : ${timeWit}_
│
└───────⭓

┌───────⭓ *Menu*
│
│
│────⭓ *🏪Toko*
│
│⭓ ${prefix}snkmarket
│⭓ ${prefix}toko
│⭓ ${prefix}buy
│
│
│────⭓ *ℹ️ About Rebot*
│
│⭓ ${prefix}rules
│⭓ ${prefix}owner
│⭓ ${prefix}credit
│⭓ ${prefix}sewabot
│⭓ ${prefix}donasi
│⭓ ${prefix}allmenu
│
│────
│
│⭓ ${prefix}newfitur
│⭓ ${prefix}fiturpopuler
│⭓ ${prefix}changelog
│⭓ ${prefix}ping
│
│
│────⭓ *🌏List Menu*
│
│⭔ ${prefix}downloader
│⭔ ${prefix}stickermenu
│⭔ ${prefix}anonymenu
│⭔ ${prefix}ai-fitur
│⭔ ${prefix}info
│⭔ ${prefix}randomimage
│⭔ ${prefix}groupmenu
│⭔ ${prefix}search
│⭔ ${prefix}story
│⭔ ${prefix}funmenu
│⭔ ${prefix}primbonmenu
│⭔ ${prefix}converter
│⭔ ${prefix}mainmenu
│⭔ ${prefix}database
│⭔ ${prefix}islamic
│⭔ ${prefix}asupanmenu
│⭔ ${prefix}voicechanger
│⭔ ${prefix}ownermenu
│
└───────⭓

> _Saat ini Rebot masih dalam tahap pemanambahan fitur, jika kamu menggunakan salah satu fitur dan bot tidak merespon, mungkin fitur belum ditambahkan_
`

await rebot.sendMessage(m.chat, {
  text: menunya,
  contextInfo: {
    forwardingScore: 5,
    isForwarded: true,
    mentionedJid: [m.sender],
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363189865606412@newsletter',
      newsletterName: "Rebot Studio.",
      serverMessageId: -1
    },
    externalAdReply: {
      showAdAttribution: false,
      renderLargerThumbnail: true,
      title: 'Profile User',
      body: `⭓Name: ${pushname} ⭓Status: ${statuser} ⭓Limit: ${isPremium ? 'Infinity' : limituser}`,
      mediaType: 1,
      thumbnailUrl: rthum,
    },
  },
}, { quoted: m });

}
break

case 'downloader' : case 'downloadermenu': case 'menudownloader' :{
  let about = (await rebot.fetchStatus(m.sender).catch(console.error) || {}).status || 'Nothing'
  let statuser = `${isCreator ? 'Owner' : isPremium ? 'Premium User' : isModerator ? 'Moderator' : 'Basic User'}`
  let limituser = user.limit
  let cekspamUser = ms(user.banspam.expired - Date.now())
  let spamuser = `YES ${cekspamUser.days} day ${cekspamUser.hours} hour ${cekspamUser.minutes} minute`
  let blockList = await rebot.fetchBlocklist() || []; 
  let isBlocked = blockList.includes(m.sender);

  let anome =`
┌──⭓ *User Info*
│
│⭔ _Status : ${statuser}_
│⭔ _Nama : ${pushname}_
│⭔ _Bio : ${about}_
│⭔ _Nomor : @${m.sender.split('@')[0] || m.sender}_
│⭔ _Limit : ${isPremium ? 'Infinity' : limituser}_
│⭔ _Banned : ${isBan ? '✅' : '❌' }_
│⭔ _Spam : ${isBanspam ? '✅' + spamuser : '❌'}_
│⭔ _Block : ${isBlocked ? '✅' : '❌'}_
│
└───────⭓

┌──⭓ *Today*
│
│⭔ _${tampilUcapan}_
│⭔ _Jam : ${timeWib}_
│⭔ _Hari : ${week} ${weton}_
│⭔ _Tanggal : ${calender}_
│
└───────⭓

┌──⭓ *Downloader Menu*
│
│⭔ ${prefix}apkdl [nama aplikasi]
│⭔ ${prefix}tiktok [url]
│⭔ ${prefix}tiktokhd [url]
│⭔ ${prefix}tiktokmp3 [url]
│⭔ ${prefix}instagram [url]
│⭔ ${prefix}igstory [url]
│⭔ ${prefix}twitter [url]
│⭔ ${prefix}x [url]
│⭔ ${prefix}facebook [url]
│⭔ ${prefix}pinterest [url]
│⭔ ${prefix}play [judul]
│⭔ ${prefix}ytmp3 [url]
│⭔ ${prefix}ytmp4 [url]
│⭔ ${prefix}spotify [judul]
│
└───────⭓
  `
  await rebot.sendMessage(m.chat, {
    text: anome,
    contextInfo: {
      forwardingScore: 5,
      isForwarded: true,
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363189865606412@newsletter',
        newsletterName: "Rebot Studio.",
        serverMessageId: -1
      },
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: true,
        title: 'Profile User',
        body: `⭓Name: ${pushname} ⭓Status: ${statuser} ⭓Limit: ${isPremium ? 'Infinity' : limituser}`,
        mediaType: 1,
        thumbnailUrl: rthum,
      },
    },
  }, { quoted: m });
}
break

case 'search' : case 'searchmenu': case 'menusearch' :{
  let about = (await rebot.fetchStatus(m.sender).catch(console.error) || {}).status || 'Nothing'
  let statuser = `${isCreator ? 'Owner' : isPremium ? 'Premium User' : isModerator ? 'Moderator' : 'Basic User'}`
  let limituser = user.limit
  let cekspamUser = ms(user.banspam.expired - Date.now())
  let spamuser = `YES ${cekspamUser.days} day ${cekspamUser.hours} hour ${cekspamUser.minutes} minute`
  let blockList = await rebot.fetchBlocklist() || []; 
  let isBlocked = blockList.includes(m.sender);

  let anome =`
┌──⭓ *User Info*
│
│⭔ _Status : ${statuser}_
│⭔ _Nama : ${pushname}_
│⭔ _Bio : ${about}_
│⭔ _Nomor : @${m.sender.split('@')[0]}_
│⭔ _Limit : ${isPremium ? 'Infinity' : limituser}_
│⭔ _Banned : ${isBan ? '✅' : '❌' }_
│⭔ _Spam : ${isBanspam ? '✅' + spamuser : '❌'}_
│⭔ _Block : ${isBlocked ? '✅' : '❌'}_
│
└───────⭓

┌──⭓ *Today*
│
│⭔ _${tampilUcapan}_
│⭔ _Jam : ${timeWib}_
│⭔ _Hari : ${week} ${weton}_
│⭔ _Tanggal : ${calender}_
│
└───────⭓

┌──⭓ *Search Menu*
│
│⭔ ${prefix}whatsong [reply audio]
│⭔ ${prefix}play [query]
│⭔ ${prefix}lirik [query]
│⭔ ${prefix}yts [query]
│⭔ ${prefix}google [query]
│⭔ ${prefix}gimage [query]
│⭔ ${prefix}pinterest [query]
│⭔ ${prefix}wallpaper [query]
│⭔ ${prefix}wikimedia [query]
│⭔ ${prefix}ytsearch [query]
│⭔ ${prefix}spotify [judul]
│⭔ ${prefix}whatnime _reply image_
│⭔ ${prefix}whatnime2 _reply image_
│
└───────⭓
  `
  await rebot.sendMessage(m.chat, {
    text: anome,
    contextInfo: {
      forwardingScore: 5,
      isForwarded: true,
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363189865606412@newsletter',
        newsletterName: "Rebot Studio.",
        serverMessageId: -1
      },
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: true,
        title: 'Profile User',
        body: `⭓Name: ${pushname} ⭓Status: ${statuser} ⭓Limit: ${isPremium ? 'Infinity' : limituser}`,
        mediaType: 1,
        thumbnailUrl: rthum,
      },
    },
  }, { quoted: m });
}
break

case 'stickermenu' : case 'menusticker' :{
  let about = (await rebot.fetchStatus(m.sender).catch(console.error) || {}).status || 'Nothing'
  let statuser = `${isCreator ? 'Owner' : isPremium ? 'Premium User' : isModerator ? 'Moderator' : 'Basic User'}`
  let limituser = user.limit
  let cekspamUser = ms(user.banspam.expired - Date.now())
  let spamuser = `YES ${cekspamUser.days} day ${cekspamUser.hours} hour ${cekspamUser.minutes} minute`
  let blockList = await rebot.fetchBlocklist() || []; 
  let isBlocked = blockList.includes(m.sender);

  let anome =`
┌──⭓ *User Info*
│
│⭔ _Status : ${statuser}_
│⭔ _Nama : ${pushname}_
│⭔ _Bio : ${about}_
│⭔ _Nomor : @${m.sender.split('@')[0]}_
│⭔ _Limit : ${isPremium ? 'Infinity' : limituser}_
│⭔ _Banned : ${isBan ? '✅' : '❌' }_
│⭔ _Spam : ${isBanspam ? '✅' + spamuser : '❌'}_
│⭔ _Block : ${isBlocked ? '✅' : '❌'}_
│
└───────⭓

┌──⭓ *Today*
│
│⭔ _${tampilUcapan}_
│⭔ _Jam : ${timeWib}_
│⭔ _Hari : ${week} ${weton}_
│⭔ _Tanggal : ${calender}_
│
└───────⭓

┌──⭓ *Sticker Menu*
│
│⭔ ${prefix}dadu
│⭔ ${prefix}qc [text]
│⭔ ${prefix}attp
│⭔ ${prefix}ttp
│⭔ ${prefix}brat
│⭔ ${prefix}bratvideo
│⭔ ${prefix}sticker
│⭔ ${prefix}stickerwm
│⭔ ${prefix}emojimix
│⭔ ${prefix}emojimix2
│⭔ ${prefix}smeme
│
└───────⭓
  `
  await rebot.sendMessage(m.chat, {
    text: anome,
    contextInfo: {
      forwardingScore: 5,
      isForwarded: true,
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363189865606412@newsletter',
        newsletterName: "Rebot Studio.",
        serverMessageId: -1
      },
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: true,
        title: 'Profile User',
        body: `⭓Name: ${pushname} ⭓Status: ${statuser} ⭓Limit: ${isPremium ? 'Infinity' : limituser}`,
        mediaType: 1,
        thumbnailUrl: rthum,
      },
    },
  }, { quoted: m });
}
break

case 'anonymenu' : {
  let about = (await rebot.fetchStatus(m.sender).catch(console.error) || {}).status || 'Nothing'
  let statuser = `${isCreator ? 'Owner' : isPremium ? 'Premium User' : isModerator ? 'Moderator' : 'Basic User'}`
  let limituser = user.limit
  let cekspamUser = ms(user.banspam.expired - Date.now())
  let spamuser = `YES ${cekspamUser.days} day ${cekspamUser.hours} hour ${cekspamUser.minutes} minute`
  let blockList = await rebot.fetchBlocklist() || []; 
  let isBlocked = blockList.includes(m.sender);

  let anome =`
┌──⭓ *User Info*
│
│⭔ _Status : ${statuser}_
│⭔ _Nama : ${pushname}_
│⭔ _Bio : ${about}_
│⭔ _Nomor : @${m.sender.split('@')[0]}_
│⭔ _Limit : ${isPremium ? 'Infinity' : limituser}_
│⭔ _Banned : ${isBan ? '✅' : '❌' }_
│⭔ _Spam : ${isBanspam ? '✅' + spamuser : '❌'}_
│⭔ _Block : ${isBlocked ? '✅' : '❌'}_
│
└───────⭓

┌──⭓ *Today*
│
│⭔ _${tampilUcapan}_
│⭔ _Jam : ${timeWib}_
│⭔ _Hari : ${week} ${weton}_
│⭔ _Tanggal : ${calender}_
│
└───────⭓

┌──⭓ *Anonymous Chat*
│
│⭔ ${prefix}menfes
│⭔ ${prefix}confes
│⭔ ${prefix}anonconfess [confes anonim]
│⭔ ${prefix}anonymous [chat]
│⭔ ${prefix}start
│⭔ ${prefix}next
│⭔ ${prefix}keluar
│
└───────⭓
  `
  await rebot.sendMessage(m.chat, {
    text: anome,
    contextInfo: {
      forwardingScore: 5,
      isForwarded: true,
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363189865606412@newsletter',
        newsletterName: "Rebot Studio.",
        serverMessageId: -1
      },
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: true,
        title: 'Profile User',
        body: `⭓Name: ${pushname} ⭓Status: ${statuser} ⭓Limit: ${isPremium ? 'Infinity' : limituser}`,
        mediaType: 1,
        thumbnailUrl: rthum,
      },
    },
  }, { quoted: m });
}
break

case 'groupmenu' : {
  let about = (await rebot.fetchStatus(m.sender).catch(console.error) || {}).status || 'Nothing'
  let statuser = `${isCreator ? 'Owner' : isPremium ? 'Premium User' : isModerator ? 'Moderator' : 'Basic User'}`
  let limituser = user.limit
  let cekspamUser = ms(user.banspam.expired - Date.now())
  let spamuser = `YES ${cekspamUser.days} day ${cekspamUser.hours} hour ${cekspamUser.minutes} minute`
  let blockList = await rebot.fetchBlocklist() || []; 
  let isBlocked = blockList.includes(m.sender);

  let anome =`
┌──⭓ *User Info*
│
│⭔ _Status : ${statuser}_
│⭔ _Nama : ${pushname}_
│⭔ _Bio : ${about}_
│⭔ _Nomor : @${m.sender.split('@')[0]}_
│⭔ _Limit : ${isPremium ? 'Infinity' : limituser}_
│⭔ _Banned : ${isBan ? '✅' : '❌' }_
│⭔ _Spam : ${isBanspam ? '✅' + spamuser : '❌'}_
│⭔ _Block : ${isBlocked ? '✅' : '❌'}_
│
└───────⭓

┌──⭓ *Today*
│
│⭔ _${tampilUcapan}_
│⭔ _Jam : ${timeWib}_
│⭔ _Hari : ${week} ${weton}_
│⭔ _Tanggal : ${calender}_
│
└───────⭓

┌──⭓ *Downloader Menu*
│
│⭔ ${prefix}groupinfo
│⭔ ${prefix}cachestatus
│⭔ ${prefix}checkcache
│⭔ ${prefix}listcache
│⭔ ${prefix}refreshgroupcache
│⭔ ${prefix}cleargroupcache
│⭔ ${prefix}clearthiscache
│⭔ ${prefix}preloadcache
│
└───────⭓
  `
  await rebot.sendMessage(m.chat, {
    text: anome,
    contextInfo: {
      forwardingScore: 5,
      isForwarded: true,
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363189865606412@newsletter',
        newsletterName: "Rebot Studio.",
        serverMessageId: -1
      },
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: true,
        title: 'Profile User',
        body: `⭓Name: ${pushname} ⭓Status: ${statuser} ⭓Limit: ${isPremium ? 'Infinity' : limituser}`,
        mediaType: 1,
        thumbnailUrl: rthum,
      },
    },
  }, { quoted: m });
}
break   

case 'snkmarket': {
  if (isBanspam) return m.reply(mess.spam)
    let rull =`
📍 *Syarat dan Ketentuan MARKETBOT*
───────────────────────
Ketersediaan Produk:
> Kami akan berusaha memastikan bahwa produk yang tersedia di platform kami telah diupdate secara berkala. Namun, dalam situasi tertentu, ketersediaan produk dapat berubah tanpa pemberitahuan terlebih dahulu.

Persetujuan SNK:
> Kami menyarankan agar setiap pembeli membaca dengan cermat dan memahami syarat dan ketentuan yang berlaku sebelum melakukan transaksi. Dengan melanjutkan pembelian, pembeli dianggap telah membaca, memahami, dan menyetujui semua syarat dan ketentuan yang ada.

Garansi:
> Garansi yang disediakan hanya berlaku ketika ada kesalahan pada produk atau kami. Kerusakan akibat penggunaan yang tidak wajar atau kelalaian pengguna tidak termasuk dalam cakupan garansi.
> Klaim garansi harus disertai dengan bukti pembelian asli dan dapat diajukan dalam waktu 15 hari setelah tanggal pembelian.

Keterlambatan dan Komunikasi:
> Jika terjadi keterlambatan dalam pengiriman atau terdapat kendala lainnya, kami akan berusaha memberikan informasi terbaru kepada pembeli secepat mungkin melalui kontak yang tersedia. Pembeli diharapkan untuk memahami dan bersabar dalam situasi tersebut.

Kebijakan Pengembalian Dana:
> Kami berhak untuk menolak permintaan pengembalian dana atau dana tidak bisa di refund.

Dengan demikian, kami berharap syarat dan ketentuan yang telah disampaikan ini dapat memberikan pemahaman yang lebih baik kepada pembeli tentang hak dan kewajiban mereka saat bertransaksi dengan kami.

Owner  BOT:
wa.me/6289692509996
    `
    rebot.sendText(m.chat, rull, m)

  }
  break

case 'plan':
case 'market':
case 'produk':
case 'sewabot':
case 'buyprem':
case 'buypremium':
case 'toko': {

  let cuanpiwz2 =`
_ⓘ Sebelum Membeli pastikan kamu sudah membaca .snkmarket dan .rules. Jika kamu membeli, kami menganggap kamu sudah membaca dan menyetujui snk toko dan rules bot_

*LIST HARGA PANEL*
- All Panel soldout

> _📮RAM 1 GB CPU 30% RP 2.000 / BULAN_
> _📮RAM 2 GB CPU 60% RP 3.000 / BULAN_
> _📮RAM 3 GB CPU 80% RP 4.000 / BULAN_
> _📮RAM 4 GB CPU 110% RP 5.000 / BULAN_
> _📮RAM 5 GB CPU 140% RP 6.000 / BULAN_
> _📮RAM 6 GB CPU 170% RP 7.000 / BULAN_
> _📮RAM 7 GB CPU 180% RP 8.000 / BULAN_
> _📮RAM 8 GB CPU 190% RP 9.000 / BULAN_
> _📮RAM & CPU UNLIMITED RP 12.000/ BULAN_
> *------------------------------------------------*

*LIST MODERATOR*

> _👮MODERATOR 10K/MINGGU_
> _👮MODERATOR 15K/2 MINGGU_
> _👮MODERATOR 20K/BULAN_
> _👮MODERATOR 45K/3 BULAN_
> _👮MODERATOR 150K/PERMANENT_
> *------------------------------------------------*

*LIST PREMIUM*

> _💎PREMIUM 5K/MINGGU_
> _💎PREMIUM 10K/2 MINGGU_
> _💎PREMIUM 15K/BULAN_
> _💎PREMIUM 40K/3 BULAN_
> _💎PREMIUM 100K/PERMANENT_
> *------------------------------------------------*

*LIST SEWA BOT*

> _🏪SEWA BOT 5K/MINGGU_
> _🏪SEWA BOT 15K/BULAN_
> _🏪SEWA BOT 45K/PERMANEN_
> *------------------------------------------------*

*LIST BUY LIMIT*

> _⚡LIMIT 2K/50 limit_
> _⚡LIMIT 3K/90 limit_
> _⚡LIMIT 5K/150 limit_
> _⚡LIMIT 10K/275 limit_
> _⚡LIMIT 15K/400 limit_
> _⚡LIMIT 20K/600 limit_
> *------------------------------------------------*

*PANEL:*
- Untuk Run bot
- Hemat Kuota
- Online 24/7
- Fastrespon
- Web close tetap on

*MODERATOR:*
- Bebas Bertindak pada bot dan user
- Fitur Khusus seperti owner
- Tidak Menggunakan limit
- Bisa banned user
- memberikan sanksi ke user

*PREMIUM:*
- BEBAS MENGGUNAKAN FITUR
- LIMIT TIDAK TERBATAS
- TIDAK PERLU MENUNGGU RESET LIMIT
- ALL WARNING/PELANGGARAN DAPAT DIKOMPENSASI (SnK berlaku)

*SEWABOT:*
- BISA MENJAGA GROUP
- MERAMAIKAN GROUP
- BERMAIN BERSAMA TEMAN GRUP
- MEMPERMUDAH TUGAS ADMIN
- AND SIMPELY

*LIMIT:*
- menambahkan limit jika habis
- tidak perlu menunggu reset
- tidak terkena reset jika limit masih di atas 15

Nego? Aman langsung angkut
Minat/Beli? ketik .buy
  `
  rebot.sendMessage(m.chat, { image: { url: "https://rebot-studio.xyz/assets/img/jestDrbl.png" }, caption:  cuanpiwz2 }, { quoted: m });
}
break

case 'buyplan': case 'buy': case 'beli': {

  const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;Mas F;;;FN:Mas F\nitem1.TEL;waid=6289692509996:+62 896 9250 9996\nitem1.X-ABLabel:Creator Bot\nX-WA-BIZ-DESCRIPTION:Silahkan bang\nX-WA-BIZ-NAME:MAS F\nEND:VCARD`

  const cntk = await rebot.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: `Mas F`,
        contacts: [{vcard}]
      }
    }, {quoted: m}
    )

  await rebot.sendMessage(
    m.chat,
    { text: 'Silahkan Chat owner untuk membeli\n\n> _Ketik .toko untuk melihat produk_' },
    { quoted: cntk }
    )
}
break

case 'owner': case 'creator': {
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;Mas F;;;FN:Mas F\nitem1.TEL;waid=6289692509996:+62 896 9250 9996\nitem1.X-ABLabel:Creator Bot\nX-WA-BIZ-DESCRIPTION:Silahkan bang\nX-WA-BIZ-NAME:MAS F\nEND:VCARD`
  await rebot.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: `Mas F`,
        contacts: [{vcard}]
      }
    }, {quoted: m}
    )

}
break

case 'rules': case 'peraturan': case 'snk': case 'syaratdanketentuan': {
  if (isBanspam) return m.reply(mess.spam)
   let rull =`
📍 *RULES*
───────────────────────
*1. Pengguna dapat menggunakan semua fitur atau perintah/command dengan batasan limit 15/day, terkecuali fitur infromasi dan main fitur*
*2. Rebot menggunakan sistem buylimit dan reset limit, limit akan di reset setiap jam 00.00 WITA (BOT hanya akan mereset limit pengguna free yang sudah mencapai nol '0', pengguna yang limitnya di atas 0 tidak akan di reset).*
*3. Dilarang keras mengirim pesan virus dan semacamnya yang membuat server down ataupun bot crash*
*4. Pengguna yang mengirim hal atau data pribadi tidak akan disimpan oleh bot ini, dan kami tidak akan bertanggung jawab atas data pribadi tersebut!*
*5. Kami tidak menyimpan pesan atau data yang anda kirim, setiap bot off kami akan membersihkan semua pesan termasuk Grup chat.*

┌──⭓ ❗ *POINT RULES* ❗ 
│
│⭓ Jangan spam bot. 
│Sanksi: *WARN/SOFT BAN*
│
│⭓ Jangan telepon/vc bot.
│Sanksi: *SOFT BLOCK*
│
│⭓ Jangan mengeksploitasi bot.
│Sanksi: *PERMANENT BLOCK/BAN*
│
│⭓ Jangan membuat bot crash atau down.
│Sanksi: *PERMANENT BLOCK/BAN*
│
│⭓ Jangan menyerang bot/owner bot.
│Sanksi: *PERMANENT BLOCK/BAN*
│
│⭓ Silahkan Hubungi Owner Jika
│Ada Permesalahan
│⭓ Owner:wa.me/6289692509996
│
└──────────⭓

Jika User Atau Pengguna melanggar rules, owner tidak segan segan akan melakukan sanksi terhadap pelanggar dan sewaktu waktu owner bisa memeriksa WhatsApp bot.
Seluruh rules dan SNK berlaku kepada semua Pengguna Rebot, termasuk user premium tapi dengan kompensasi, jika tetap melanggar maka status premium akan hangus dan biaya yang di keluarkan oleh user kepada bot tidak dapat di refund atau tidak dapat di kembalikan.
───────────────────────

📍 *SYARAT DAN KETENTUAN*

╠═══════════════╡
✅ *-* _*Kami tidak pernah menyimpan foto/video/data penting milik penggunaa* bahkan kami tidak meminta pengguna untuk melihatkan data pribadinya._

╠═══════════════╡
✅ *-* _Dimohon untuk pengguna bot saya untuk tidak menyalin atau mengcopas menu yang ada di bot, kalau mau minta minta aja langsung ke owner._

╠═══════════════╡
✅ *-* _*Pengguna dilarang menyepam bot, menyerang bot, menelpon ataupun menvideocall bot* karna bisa eror dan lag._
_Jika sengaja melakukan hal tersebut bot akan melakukan blocking atau owner yang langsung bertindak._

╠═══════════════╡
✅ *-* _Jika ada masalah pada bot atau tidak merespon atau erorr langsung saja *ketik ${prefix}report* Atau chat owner agar bisa diperbaiki secepatnya untuk kenyamanan pengguna._

╠═══════════════╡
✅ *-* _Apa yang dikatakan/diketik atau yang dikirim oleh bot, itu hanyalah sebuah program Komputer Dan Bot Berserta Owner Tidak Bertanggung jawab Atas Apa Yang Dikirim oleh bot._

╠═══════════════╡
✅ *-* _Jika bot tidak merespon cukup ulangi sekali lagi, jika masih tidak merespon, kemungkinan bot sedang off, atau langsung tanyakan ke owner untuk informasi yang lebih pasti, *mohon untuk tidak menspam ketika bot tidak merespon.*_

╠═══════════════╡
✅ *-* _bot selalu ontime 24 jam, jika off mungkin ada kendala pada koneksi dan jaringan._


╠═══════════════╡
❇️ *•* *Jika anda sudah membaca Rules Dan SNK di atas atau menggunakan bot, Maka anda sudah setuju dengan syarat dan ketentuan dari kami.*
*_Selebihnya Kami tidak bertanggung jawab_*
╠═══════════════╡


🔰 _Terimakasih atas perhatiannya_🔰
Jika sudah dipahami rules-nya, silakan ketik *#menu* untuk memulai!

Owner  BOT:
wa.me/6289692509996
   `
   rebot.sendText(m.chat, rull, m)

 }
 break

case 'thanksto':
case 'credit': {

  let cr = `
┌──⭓ *𝙏𝙃𝘼𝙉𝙆𝙎 𝙏𝙊*
│
│⭓ ALLAH SWT
│⭓ Keluarga
│⭓ Saudara
│⭓ Mhankbabar
│⭓ Nurutomo
│⭓ Dika (Referensi base)
│⭓ Zeeone
│⭓ fatiharridho
│⭓ Denis
│⭓ ScRaPe Community (Source Fitur)
│⭓ NB Script (Source Fitur)
│⭓ ZenzzXD (Api's Fitur)
│⭓ Farid (Asuna-Bot)
│⭓ Alvianto (Yann-Bot)
│⭓ Farrel (XiryuuDev)
│⭓ akuari (Api's Fitur)
│⭓ Fajar (Creator Rebot)
│⭓ Kwn² Yg Bantu Gw
│⭓ And all dev/creator bot
│
└───────⭓
  `
  await rebot.sendMessage(m.chat, {
    text: cr,
    contextInfo: {
      forwardingScore: 5,
      isForwarded: true,
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363189865606412@newsletter',
        newsletterName: "Rebot Studio.",
        serverMessageId: -1
      },
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: true,
        title: '𝙏𝙃𝘼𝙉𝙆𝙎 𝙏𝙊',
        body: `Contribution `,
        mediaType: 1,
        thumbnailUrl: rthum,
      },
    },
  }, { quoted: m });
}
break

case 'donasi': case 'donate': {
  if (isBanspam) return m.reply(mess.spam)
    let txtdonate =`╭─❒ 「 Donasi 」 ──────*
*│*
*│*⬡ *Donasi untuk biaya server:)*
*│*
*│*⬡ *DANA    : 0896922509996*
*│*⬡ *GOPAY    : 089692509996*
*│*⬡ *PULSA    : 089692509996*
*│* 
*│*⬡ *Sqan Qris allpayment*
*│*
*│*⬡ *Thanks for donate*
*└───────────────────*
`

rebot.sendMessage(m.chat, { image: { url: "https://rebot-studio.xyz/assets/img/jestDrbl.png" }, caption: txtdonate }, { quoted: m });
}
break

case 'apkdl': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (!text) return m.reply(`Contoh penggunaan: ${prefix + command} WhatsApp`);
  m.reply(mess.wait);


const data = await apkpuredl(text); // Menunggu hasil dari operasi asinkron
const valueinMB = parseFloat(data[0].fileSize.replace(/[^\d.]/g, ''))
const valueinKB = Math.round(valueinMB * 1024);
console.log(valueinKB)
if (valueinKB < 250000) {
  await rebot.sendImage(m.chat, data[0].icon, `⭔ Title : ${data[0].title}\n⭔ Developer : ${data[0].developer}\n⭔ Version : ${data[0].version}\n⭔ Filesize : ${data[0].fileSize || '-'}\n⭔ Url : ${data[0].url}\n⭔ Urldl : ${data[0].directDownloadUrl}\n⭔ Status : _Sedang dikirim..._\n\n_Jika file tidak terkirim, silakan download melalui link Urldl di atas_`, m);
  const bufapk = await getBuffer(data[0].directDownloadUrl);
  await rebot.sendMessage(m.chat, { document: { url: bufapk }, mimetype: 'application/vnd.android.package-archive', fileName: `${data.name}.apk` }, { quoted: m });
  user.limit -= 1;
} else {
  m.reply(`_Maaf Ukuran file media melebihi batas 100Mb, Silahkan download melalui link urldl di bawah_\n\n⭔ Title : ${data[0].title}\n⭔ Developer : ${data[0].developer}\n⭔ Version : ${data[0].version}\n⭔ Filesize : ${data[0].fileSize || '-'}\n⭔ Url : ${data[0].url}\n⭔ Urldl : ${data[0].directDownloadUrl}\n⭔Status : _Oversize_`);
}

tambahHitFitur('apkdl')

}
break;

case 'tthd': case 'tiktokhd': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 5) return m.reply("Limit kamu tidak mencukupi. Untuk menggunakan tiktok HD memerlukan 5 limit.\n\n> _Silahkan ketik .toko untuk membeli limit jika tidak mencukupi_");
  if (!text) return m.reply('Masukkan Query Link!');
  if (!isUrl(args[0]) || !args[0].includes('tiktok.com')) return m.reply('Link yang kamu berikan tidak valid');
  reactAwait()
  m.reply(mess.wait + '\n\n> Penggunaan Tiktok HD akan *menghabiskan 5 limit*. Silahkan ketik .toko untuk membeli limit jika tidak mencukupi')

  try {
    const hd1 = await MusicalDown(text)
    await rebot.sendMessage(m.chat, {video: {url: hd1.result.video_hd }}, {quoted: m})
    user.limit -= 5;
  } catch (err) {
    try {
      const hd2 = await fetchJson(`https://api.zenzxz.my.id/downloader/tiktok?url=${encodeURIComponent(text)}`)
      await rebot.sendMessage(m.chat, {video: {url: hd2.result.data.hdplay}}, {quoted: m})
      user.limit -= 5;
    } catch (err) {
      throw err
    }
  }
  tambahHitFitur('tthd')
}
break

case 'tiktok':
case 'tt':
case 'tiktoknowm': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (!text) return m.reply('Masukkan Query Link!');
  if (!isUrl(args[0]) || !args[0].includes('tiktok.com')) return m.reply('Link yang kamu berikan tidak valid');

  m.reply(mess.wait);
  reactAwait()

  
  let datas = await fetchJson(`https://api.tiklydown.eu.org/api/download?apikey=tk_313440a1e84256af41b33a6db8f13d65248bd121fd915a1400d95d29f55e1b7f&url=${encodeURIComponent(text)}`);
  // console.log(datas)

  if (datas.images) {
    try {
      let push = [];
      let res = datas.images.map(photo => photo.url).filter(url => url !== undefined);
      let i = 1;
      // console.log(res)

      for (let pus of res) {
        push.push({
          body: {
            text: `Image slide ke - ${i++}`
          },
          footer: {
            text: '*Rebot™© | 2019-2025*'
          },
          header: {
            title: 'TikTok Slideshow Image',
            hasMediaAttachment: true,
            imageMessage: await createImage(pus)
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: 'Source',
                  url: pus,
                  merchant_url: pus
                })
              }
            ]
          }
        });
      }

      const interactiveMessage = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: {
                text: `Tiktok Slide Image\n\nStatus: Success\nUrl: ${text}`
              },
              footer: {
                text: '*Rebot™© | 2019-2025*'
              },
              header: {
                hasMediaAttachment: false
              },
              carouselMessage: {
                cards: push
              }
            }
          }
        }
      };
      await rebot.relayMessage(m.chat, interactiveMessage, { quoted: m });
      user.limit -= 1;
    } catch (err) {
      throw err
    }

  }  else  {
    try {
      const dataDownload = await fetchJson(`https://api.tiklydown.eu.org/api/download?apikey=tk_313440a1e84256af41b33a6db8f13d65248bd121fd915a1400d95d29f55e1b7f&url=${encodeURIComponent(text)}`);

      let ttl = '⭔ Status: Success Server Default 1';
      rebot.sendMessage(m.chat, { video : {url: dataDownload.video.noWatermark } , mimetype: 'video/mp4',caption : `Rebot - Make your activities simpler\n\n${ttl}\n\n> Gunakan fitur\n> _.ttmp3 [untuk versi audio]_\n> _.tthd [untuk versi HD]_`},{quoted : m})
      user.limit -= 1;
    } catch (err) {
      try {
        const dataDownload2 = await fetchJson(`https://api.zenzxz.my.id/downloader/tiktok?url=${encodeURIComponent(text)}`);
        await MusicalDown(text)

        let ttl = '⭔ Status: Success Server Default 2';
        rebot.sendMessage(m.chat, { video : {url: dataDownload2.result.data.play } , mimetype: 'video/mp4',caption : `Rebot - Make your activities simpler\n\n${ttl}\n\n> Gunakan fitur\n> _.ttmp3 [untuk versi audio]_\n> _.tthd [untuk versi HD]_`},{quoted : m})
        user.limit -= 1;
      } catch (err) {
        try {
          const dataDownload3= await MusicalDown(text)

          let ttl = '⭔ Status: Success Server Default 3';
          rebot.sendMessage(m.chat, { video : {url: dataDownload3.result.video1} , mimetype: 'video/mp4',caption : `Rebot - Make your activities simpler\n\n${ttl}\n\n> Gunakan fitur\n> _.ttmp3 [untuk versi audio]_\n> _.tthd [untuk versi HD]_`},{quoted : m})
          user.limit -= 1;
        } catch (err) {
          throw err
        }
      }
    }
  }
  tambahHitFitur('tt')
}
break;

case 'tiktokmp3': case 'ttmp3': case 'tiktokaudio': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (!text) return m.reply('Masukkan Query Link!')
    if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return m.reply('Link yang kamu berikan tidak valid')
      m.reply(mess.wait)
    reactAwait()
    try {

      const data = await fetchJson(`https://api.zenzxz.my.id/downloader/tiktok?url=${encodeURIComponent(text)}`)

      rebot.sendMessage(m.chat, {document: {url: data.result.data.music_info.play }, mimetype: 'audio/mpeg', fileName: `${data.result.data.music_info.title}.mp3`}, { quoted : m })
      user.limit -= 1;
      reactDone()
// rebot.sendMessage(m.chat, {audio: {url: data.result.data.music}, mimetype: 'audio/mp4'}, { quoted: m })
    } catch (err) { 
      throw err
    }
    tambahHitFitur('ttmp3')
  }
  break

case 'instagram':
case 'ig':
case 'igstory':
case 'igdl': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (!text) return m.reply('Masukkan URL Instagram!');
  if (!isUrl(args[0]) || !args[0].includes('instagram.com')) return m.reply('Link yang kamu berikan tidak valid');

  reactAwait();
  
  try {
    let datas = await fetchJson(`https://api.zenzxz.my.id/api/downloader/instagram?url=${encodeURIComponent(text)}`);
    
    // Validasi response baru
    if (!datas.success || !datas.data || !Array.isArray(datas.data)) {
      return m.reply('❌ Gagal mengambil data dari Instagram. Link mungkin tidak valid atau private.');
    }
    
    // Filter media yang valid berdasarkan struktur baru
    let medias = datas.data.filter(media => 
      media && media.type && (media.downloadUrl || media.videoUrl || media.imageUrl)
      );
    
    if (medias.length === 0) {
      return m.reply('❌ Tidak ada media yang dapat diunduh dari link tersebut.');
    }
    
    // Pisahkan images dan videos berdasarkan struktur baru
    let images = medias.filter(media => media.type === 'image');
    let videos = medias.filter(media => media.type === 'video');
    
    let successCount = 0;
    let failedCount = 0;
    
    // 🔥 TAMBAH HIT COUNTER
    tambahHitFitur('igdl');
    
    // Dapatkan info author dari media pertama
    const author = medias[0]?.author;
    const authorInfo = author ? `👤 **Author:** ${author.name || 'Unknown'} (@${author.username || 'unknown'})\n` : '';
    
    // PART 1: Handle IMAGES
    if (images.length > 0) {
      try {
        let push = [];
        
        for (let [index, image] of images.entries()) {
          try {
            // Gunakan downloadUrl jika ada, fallback ke imageUrl
            const imageUrl = image.downloadUrl || image.imageUrl;
            if (!imageUrl) continue;
            
            push.push({
              body: {
                text: `📸 Image ${index + 1}/${images.length}\n\n${authorInfo}🆔 ID: ${image.id || 'Unknown'}`
              },
              footer: {
                text: '*Rebot™© | 2019-2025*'
              },
              header: {
                title: '📷 Instagram Image',
                hasMediaAttachment: true,
                imageMessage: await createImage(imageUrl)
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: 'View Original',
                      url: imageUrl,
                      merchant_url: imageUrl
                    })
                  }
                ]
              }
            });
            successCount++;
          } catch (err) {
            failedCount++;
          }
        }
        
        // Kirim image cards jika berhasil
        if (push.length > 0) {
          const imageCarousel = {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: {
                  body: {
                    text: `📸 Instagram Images\n\n${authorInfo}📊 Total Images: ${push.length}/${images.length}`
                  },
                  footer: {
                    text: '*Rebot™© | 2019-2025*'
                  },
                  header: {
                    hasMediaAttachment: false
                  },
                  carouselMessage: {
                    cards: push
                  }
                }
              }
            }
          };
          
          await rebot.relayMessage(m.chat, imageCarousel, { quoted: m });
        }
        
      } catch (err) {
        // Fallback: kirim images normal
        for (let [index, image] of images.entries()) {
          try {
            const imageUrl = image.downloadUrl || image.imageUrl;
            if (!imageUrl) continue;
            
            await rebot.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: `📸 **Instagram Image ${index + 1}/${images.length}**\n\n${authorInfo}🆔 **ID:** ${image.id || 'Unknown'}\n\n*Rebot™© | 2019-2025*`
            }, { quoted: m });
            
            successCount++;
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (err) {
            failedCount++;
          }
        }
      }
    }
    
    // PART 2: Handle VIDEOS
    if (videos.length > 0) {
      if (images.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      for (let [index, video] of videos.entries()) {
        try {
          // Gunakan downloadUrl jika ada, fallback ke videoUrl
          const videoUrl = video.downloadUrl || video.videoUrl;
          if (!videoUrl) continue;
          
          await rebot.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `🎥 **Instagram Video ${index + 1}/${videos.length}**\n\n${authorInfo}🆔 **ID:** ${video.id || 'Unknown'}\n\n*Rebot™© | 2019-2025*`
          }, { quoted: m });
          
          successCount++;
          
          if (index < videos.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          }
          
        } catch (err) {
          failedCount++;
        }
      }
    }
    
    // Kurangi limit user
    user.limit -= 1;
    
    if (successCount === 0) {
      return m.reply('❌ Gagal mengunduh media dari Instagram.');
    }
    
  } catch (err) {
    throw err
  }
}
break;

case 'facebook':
case 'fb':
case 'fbdl': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (!text) return m.reply('Masukkan URL Facebook Video!');
  
  m.reply(mess.wait);
  reactAwait();
  
  try {
    let datas = await fetchJson(`https://api.xyro.site/download/facebook?url=${encodeURIComponent(text)}`);
    
    
    // Khusus ambil 720p saja
    const video720p = datas.result.find(item => 
      item.url && 
      item.url !== '/' && 
      item.quality && 
      (item.quality.includes('720p') || item.quality.includes('HD'))
      );
    
    if (!video720p) {
      return m.reply('❌ Kualitas 720p tidak tersedia untuk video ini. Coba gunakan link video lain.');
    }
    
    // 🔥 TAMBAH HIT COUNTER
    tambahHitFitur('fbdl');
    
    // Kirim video
    await rebot.sendMessage(m.chat, {
      video: { url: video720p.url },
      caption: `📹 **Facebook Video**\n\n🔗 **Source:** ${text}\n💾 **Quality:** ${video720p.quality}\n\n*Rebot™© | 2019-2025*`
    }, { quoted: m });
    
    user.limit -= 1;
    
  } catch (err) {
    throw err
  }
}
break;

case 'twitter':
case 'x':
case 'xdl':
case 'twitterdl': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (!text) return m.reply('Masukkan URL Twitter!\n\n> Example: .xdl  https://x.com/kegblgnunfaedh/status/1979452751932481624');

  reactAwait();
  
  try {
    let datas = await fetchJson(`https://api.zenzxz.my.id/api/downloader/twitter?url=${encodeURIComponent(text)}`);
    
    if (!datas.success || !datas.data || !datas.data.download_url) {
      return m.reply('❌ Gagal mengambil data dari Twitter. Link mungkin tidak valid atau private.');
    }
    
    // 🔥 TAMBAH HIT COUNTER
    tambahHitFitur('xdl');
    
    const mediaData = datas.data;
    const downloadUrl = mediaData.download_url;
    const thumbnail = mediaData.thumbnail;
    const author = mediaData.author || 'Unknown';
    const description = mediaData.description || 'No description';
    
    // Deteksi tipe media dari thumbnail URL pattern (Twitter specific)
    const isVideo = thumbnail && thumbnail.includes('amplify_video_thumb');
    
    if (isVideo) {
      // Kirim sebagai VIDEO
      await rebot.sendMessage(m.chat, {
        video: { url: downloadUrl },
        caption: `🐦 **Twitter Video**\n\n📝 **Tweet:** ${author}\n🔍 **Description:** ${description}\n\n*Rebot™© | 2019-2025*`
      }, { quoted: m });
    } else {
      // Kirim sebagai IMAGE
      await rebot.sendMessage(m.chat, {
        image: { url: downloadUrl },
        caption: `🐦 **Twitter Image**\n\n📝 **Tweet:** ${author}\n🔍 **Description:** ${description}\n\n*Rebot™© | 2019-2025*`
      }, { quoted: m });
    }
    
    // Kurangi limit user
    user.limit -= 1;
    
  } catch (err) {
    throw err
  }
}
break;

case 'pinterest': case 'pin': {
  if (isBanspam) return m.reply(mess.spam)
   if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
 if (!text) return m.reply(`Example: ${prefix + command} cat`);

 m.reply(mess.wait);
 reactAwait()

 let data = await pinterest(text);
 if (!data || data.length === 0) return m.reply('Tidak ada hasil ditemukan.');

// Acak array dan ambil 5 item pertama
 shuffleArray(data);
 let selected = data.slice(0, 5);
 let push = [];

 let i = 1;
 for (let item of selected) {
   push.push({
    body: {
     text: `Image ke - ${i++}\n\n` +
     `> *Upload_by:* ${item.upload_by}\n` +
     `> *Name:* ${item.fullname}\n` +
     `> *Followers:* ${item.followers}\n` +
     `> *Title:* ${item.caption || 'No caption'}`
   },
   footer: { text: '*Rebot™© | 2019-2025*' },
   header: {
     title: 'Pinterest Image',
     hasMediaAttachment: true,
imageMessage: await createImage(item.image) // Pastikan fungsi createImage valid
},
nativeFlowMessage: {
 buttons: [{
  name: 'cta_url',
  buttonParamsJson: JSON.stringify({
   display_text: 'Source',
   url: item.source,
   merchant_url: item.source
 })
}]
}
});
 }

 const interactiveMessage = {
   viewOnceMessage: {
    message: {
     messageContextInfo: {
      deviceListMetadata: {},
      deviceListMetadataVersion: 2
    },
    interactiveMessage: {
      body: {
       text: 'Hasil pencarian kamu'
     },
     footer: {
       text: '*Rebot™© | 2019-2025*'
     },
     header: {
       hasMediaAttachment: false
     },
     carouselMessage: {
       cards: [
        ...push
      ]
    }
  }
}
}
};

await rebot.relayMessage(m.chat, interactiveMessage, { quoted: m});
user.limit -= 1;
reactDone()
}
break



case 'smeme': case 'stickmeme': case 'stikmeme': case 'stickermeme': case 'stikermeme': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit)
    let respond = `Kirim/reply image/sticker dengan caption ${prefix + command} text1|text2`
  if (!/image/.test(mime)) return m.reply(respond);
  if (!text) return m.reply(respond)
    m.reply(mess.wait)
  let q = m.quoted ? m.quoted : m;
  let atas = text.split('|')[0] ? text.split('|')[0] : ' '
  let bawah = text.split('|')[1] ? text.split('|')[1] : ' '
  const media = await q.download()

  if (media.length > 30 * 1024 * 1024) return m.reply('File too large (max 30MB)');

  const result = await btch(media);

//const smeme = await getBuffer(`https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${anu.url}`)
  await rebot.sendMedia(m.chat, `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${result}`, '6289699872867', 'Sticker.by Rebot', m, { asSticker: true, quality: 50 });
  user.limit -= 1
  tambahHitFitur('smeme')
}
break 

case 'sticker': case 's': case 'stickergif': case 'sgif': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (/image/.test(mime)) {
    m.reply(mess.wait)
    let media = await rebot.downloadMediaMessage(qmsg)
    let encmedia = await rebot.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
    await fs.unlinkSync(encmedia)
    user.limit -= 1;
  } else if (/video/.test(mime)) {
    m.reply(mess.wait)
    if (qmsg.seconds > 11) return m.reply('Maksimal 10 detik!')
      let media = await rebot.downloadMediaMessage(qmsg)
    let encmedia = await rebot.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
    await fs.unlinkSync(encmedia)
    user.limit -= 1;
  } else {
    m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
  }
  tambahHitFitur('sticker')
}
break

case 'brat':
case 'ttp' : {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit)
    if (!text) return m.reply(`Contoh: ${prefix + command} teks`);

  try {

    let imageBuffer = await makeBrat(text);

    await rebot.sendMedia(m.chat, imageBuffer, '6289699872867', 'Rebot(brat sticker)', m, { asSticker: true, quality: 50 });
    user.limit -= 1;
  } catch (error) {
    throw error
  }
  tambahHitFitur('brat')
}

break;

case 'bratvideo':
case 'bratvid': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit)
   if (!text) return m.reply(`Contoh: ${prefix + command} teks pp haha`);
 if (m.sender in enhance) return m.reply(`Masih ada proses yang belum diselesaikan, mohon tunggu sampai proses selesai.`);
 if (text.length > 101) return m.reply(`Karakter terbatas, max 100!`);

 const words = text.split(" ");
 const tempDir = path.join(process.cwd(), 'tmp');
 if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
 const framePaths = [];
 await reactAwait();

 try {
   enhance[m.sender] = true;

// Buat frame untuk setiap incremental teks
   for (let i = 0; i < words.length; i++) {
    const currentText = words.slice(0, i + 1).join(" ");
    const imageBuffer = await makeBrat({
      data: [{ text: currentText, color: 'black' }],
      background: 'white',
      blur: 3
    });
    const framePath = path.join(tempDir, `frame${i}.png`);
    fs.writeFileSync(framePath, imageBuffer);
    framePaths.push(framePath);
  }

// Buat file list untuk ffmpeg concat demuxer
  const fileListPath = path.join(tempDir, "filelist.txt");
  let fileListContent = "";
  for (let i = 0; i < framePaths.length; i++) {
    fileListContent += `file '${framePaths[i]}'\n`;
    fileListContent += `duration 0.7\n`;
  }
  fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`;
  fileListContent += `duration 2\n`;
  fs.writeFileSync(fileListPath, fileListContent);

  const outputVideoPath = path.join(tempDir, "output.mp4");
// Pastikan ffmpeg sudah terinstal di server
  await execSync(`ffmpeg -y -f concat -safe 0 -i "${fileListPath}" -vf "fps=30" -c:v libx264 -preset ultrafast -pix_fmt yuv420p "${outputVideoPath}"`);
// Mengirim video sebagai sticker menggunakan rebot (bukan sock)
  await rebot.sendImageAsSticker(m.chat, outputVideoPath, m, {
    packname: global.packname,
    author: global.author
  });
  await reactDone()

// Hapus file-file sementara
  framePaths.forEach((frame) => {
    if (fs.existsSync(frame)) fs.unlinkSync(frame);
  });
  if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath);
  if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath);
} catch (error) {
 throw error;
 delete enhance[m.sender];
}
delete enhance[m.sender];
db.data.users[m.sender].limit -= 1;
tambahHitFitur('bratvid')
break;
}

case "hdvideo":
case "hdvid": {
  if (isBanspam) return m.reply(mess.spam)
    if (!/video/.test(mime)) return m.reply('Fitur ini khusus untuk video, reply, atau kasih caption .hdvideo pada video yang ingin kamu HD kan');
  if (m.sender in enhance) return m.reply(`Masih ada proses yang belum diselesaikan, mohon tunggu sampai proses selesai.`);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit)

    let [res, fpsText] = text?.trim().toLowerCase().split(" ");
  let fps = 60;

  if (fpsText && fpsText.endsWith("fps")) {
    fps = parseInt(fpsText.replace("fps", ""));
    if (isNaN(fps) || fps < 30 || fps > 240) {
      return m.reply("❗ FPS antara 30 - 240 (contoh: 60fps)");
    }
  }

  const resolutions = {
    "480": "480",
    "720": "720",
    "1080": "1080",
    "2k": "1440",
    "4k": "2160",
    "8k": "4320"
  };

  if (!resolutions[res]) {
    return m.reply(`Contoh penggunaan: ${prefix + command} 1080 60fps\n\nKualitas yang tersedia\n- 480\n- 720\n- 1080\n- 2k\n- 4k\n- 8k\n- FPS yang tersedia 30 - 240fps\n\n⚠️ Tips penting\n> "Kok hasilnya sama? gk berubah"\n- Pastikan kualitas video yang kamu kirim berbeda dengan kualitas target yang kamu inginkan\n- Misalnya video kamu sudah 1080p jangan pake yang 720p\n\n> *Note!!:* _Semakin tinggi kualitas dan fps yang kamu gunakan, semakin lama juga prosesnya_`);
  }

  const targetHeight = resolutions[res];
  const id = m.sender.split("@")[0];
  const inputnya = `input_${id}.mp4`;
  const outputnya = `hdvideo_${id}.mp4`;

  m.reply(`⏳ Mengubah video ke ${res.toUpperCase()} ${fps}FPS...`);

  try {
    const downloaded = await rebot.downloadAndSaveMediaMessage(qmsg, inputnya);

    const form = new FormData();
    form.append("video", fs.createReadStream(downloaded));
    form.append("resolution", targetHeight);
    form.append("fps", fps);

    const response = await axios.post("http://api.drizznesiasite.biz.id:4167/hdvideo", form, {
      headers: form.getHeaders(),
      responseType: "stream",
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    const fileOutput = `./temp/${outputnya}`;
    const writer = fs.createWriteStream(fileOutput);
    response.data.pipe(writer);

    writer.on("finish", async () => {
      const buffer = fs.readFileSync(fileOutput);
      await rebot.sendMessage(m.chat, {
        video: buffer,
        caption: `Video berhasil diubah ke ${res.toUpperCase()} ${fps}FPS`
      }, { quoted: m });

      fs.unlinkSync(downloaded);
      fs.unlinkSync(fileOutput);
    });

    writer.on("error", () => m.reply("❌ Gagal menyimpan hasil video"));
  } catch (err) {
   throw err
 }
 tambahHitFitur('hdvid')
}
break;

case 'tohd': 
case 'hd': 
case 'remini':{
  if (isBanspam) return m.reply(mess.spam)
    if (!/image/.test(mime)) return m.reply('Fitur ini khusus untuk foto atau image');
  if (m.sender in enhance) return m.reply(`Masih ada proses yang belum diselesaikan, mohon tunggu sampai proses selesai.`);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit)
    reactAwait()
  try {
    enhance[m.sender] = true;
    const media = await quoted.download();

    if (media.length > 30 * 1024 * 1024) return m.reply('File too large (max 30MB)');

    const result = await btch(media);

      // const res = await fetchJson(`https://api.zenzxz.my.id/tools/upscale?url=${encodeURIComponent(fileUrl)}`)

    await rebot.sendMessage(m.chat, { image: { url: `https://api.zenzxz.my.id/api/tools/upscalev2?url=${encodeURIComponent(result)}&scale=4`} }, { quoted: m })
    user.limit -= 1;
    reactDone()
    delete enhance[m.sender];
  } catch (err) {
    delete enhance[m.sender];
    throw err
  }
  tambahHitFitur('hd')

}
break

case 'yts': case 'ytsearch': {
 if (isBanspam) return m.reply(mess.spam);
 if (!isPremium && user.limit < 1) return m.reply(mess.endLimit)
  if (!text) return m.reply(`Example : ${prefix + command} Love Story - Indila`)

    let search = await yts(text)
  let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
  let no = 1
  for (let i of search.all) {
    teks += `⭔ No : ${no++}\n⭔ Type : ${i.type}\n⭔ Video ID : ${i.videoId}\n⭔ Title : ${i.title}\n⭔ Views : ${i.views}\n⭔ Duration : ${i.timestamp}\n⭔ Upload At : ${i.ago}\n⭔ Author : ${i.author.name}\n⭔ Url : ${i.url}\n\n─────────────────\n\n`
  }
  rebot.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
  user.limit -= 1;
  tambahHitFitur('yts')
}
break

case "spotify":
case "spotifydl":{
 if (isBanspam) return m.reply(mess.spam);
 if (!text) return m.reply(`Example : ${prefix + command} beggin`);
 if (!isPremium && user.limit < 1) return m.reply(mess.endLimit)
  reactAwait()
try {
  let anu = await fetchJson(`https://nonamereally-botify.hf.space/play?q=${text}`)
  let cap = `
⭔ Title : ${anu.result.title}
⭔ Ext : Search From Spotify
⭔ ID : ${anu.result.id}
⭔ Duration : ${anu.result.duration}
⭔ Artist : ${anu.result.artist}
⭔ Url Spotify : ${anu.result.url}

   > _Sedang Dikirim..._`;
   rebot.sendMessage(
    m.chat,
    { image: { url: anu.result.thumbnail }, caption: cap },
    { quoted: m }
    );

   await rebot.sendMessage(m.chat, { 
    audio: {url: anu.download},
    mimetype: 'audio/mpeg',
    contextInfo: {
     mentionedJid: [m.sender],
     "externalAdReply": {
      "showAdAttribution": false,
      "renderLargerThumbnail": true,
      "title": `${anu.result.title}`, 
      "body": `${anu.result.title} • ${anu.result.artist} • Song • ${anu.result.url}`,
      "containsAutoReply": true,
      "mediaType": 1, 
      "thumbnailUrl": `${anu.result.thumbnail}`,
      "sourceUrl": `${anu.result.url}`,
    }
  }
}, {quoted: m});

   user.limit -= 1;
   tambahHitFitur('spotify')

 } catch (err) {
   throw err
 }
}
break;

case "play":
case "ytplay": {
 if (isBanspam) return m.reply(mess.spam);
 if (!text) return m.reply(`Example : ${prefix + command} beggin`);
 if (!isPremium && user.limit < 1) return m.reply(mess.endLimit)
   m.reply(mess.wait)
 try {
   let search = await yts(text)
   let anu = await fetchJson(`https://api.zenzxz.my.id/downloader/ytmp3v2?url=${encodeURIComponent(search.all[0].url)}`)
   let cap = `
⭔ Title : ${search.all[0].title || 'No title'}
⭔ Ext : Search From YouTube
⭔ ID : ${search.all[0].videoId || 'No ID'}
⭔ Duration : ${search.all[0].duration || 'No Duration'}
⭔ Author : ${search.all[0].author || 'No Author'}
⭔ Url : ${search.all[0].url || 'No Url'}

> _Sedang Dikirim..._
   `;
   rebot.sendMessage(
     m.chat,
     { image: { url: search.all[0].thumbnail }, caption: cap },
     { quoted: m }
     );

   await rebot.sendMessage(m.chat, { 
    audio: { url: anu.data.download_url},
    mimetype: 'audio/mpeg',
    contextInfo: {
      mentionedJid: [m.sender],
    }
  }, {quoted: m});

   user.limit -= 1;

 } catch (err) {
  throw err
}
tambahHitFitur('play')
}
break

case 'ytmp3': case 'ytaudio': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (!text) return m.reply(`Example : ${prefix + command} https://youtu.be/tDQikXz4N00?si=XExy_K5wqpIcFA0p`)
    if (!isUrl(args[0]) && !args[0].includes('youtube.com') && !args[0].includes('youtu.be')) return m.reply('Link yang kamu berikan tidak valid')
      reactAwait()

    try {
     let anu = await fetchJson(`https://api.zenzxz.my.id/downloader/ytmp3v2?url=${encodeURIComponent(text)}`)

     await rebot.sendImage(m.chat, anu.data.thumbnail, `⭔ Title : ${anu.data.title}\n⭔ Duration : ${anu.data.duration}\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Urldl : ${anu.data.download_url}\n ⭔Status : _Sedang dikirim..._\n\n_Jika file tidak terkirim Silahkan download melalui link urldl di atas_`, m)
     await rebot.sendMessage(m.chat, {document: {url: anu.data.download_url}, mimetype: 'audio/mpeg', fileName: `${anu.data.title}1.mp3`}, { quoted : m })
     user.limit -= 1;
     reactDone()
   } catch (err) {
     try {
      let data = await fetchJson(`https://api.deline.my.id/downloader/ytmp3?url=${encodeURIComponent(text)}`)
      await rebot.sendImage(m.chat, data.result.thumbnail, `⭔ Title : ${data.result.title}\n⭔ Quality : ${data.result.quality}\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Urldl : ${data.result.download}\n⭔ Status : _Sedang dikirim..._\n\n_Jika file tidak terkirim Silahkan download melalui link urldl di atas_`, m)
      await rebot.sendMessage(m.chat, {document: { url: data.result.download}, mimetype: 'audio/mpeg', fileName: `${data.result.title}2.mp3`}, { quoted : m })
      user.limit -= 1;
      reactDone()
    } catch (err) {
      throw err;
    }
  }
  tambahHitFitur('ytmp3')
}
break

case 'ytmp4':
case 'ytvideo': {
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);;
  if (!text) return m.reply(`Example : ${prefix + command} https://youtu.be/tDQikXz4N00?si=XExy_K5wqpIcFA0p`);
  if (!isUrl(args[0]) && !args[0].includes('youtube.com') && !args[0].includes('youtu.be')) return m.reply('Link yang kamu berikan tidak valid')
   reactAwait()

 try {
  let data = await fetchJson(`https://api.zenzxz.my.id/api/downloader/ytmp4?url=${encodeURIComponent(text)}&resolution=1080p`)
  await rebot.sendMessage(m.chat, { video: {url: data.data.download_url}, mimetype: 'video/mp4', caption: `Download Success` }, { quoted: m });
  user.limit -= 1;
  reactDone()
} catch (err) {
  try {
    let data = await fetchJson(`https://api.deline.my.id/downloader/ytmp4?url=${encodeURIComponent(text)}`)
    await rebot.sendMessage(m.chat, { video: {url: data.data.download_url}, mimetype: 'video/mp4', caption: `Download Success` }, { quoted: m });
    user.limit -= 1;
    reactDone()
  } catch (err){
   throw err;
 }
}
tambahHitFitur('ytmp4')
}
break;


case 'tovideo':
case 'tomp4': {
  // Basic checks
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  
  // Process lock
  if (m.sender in enhance) {
    return m.reply(`⏳ Masih ada proses convert yang belum diselesaikan, mohon tunggu.`);
  }
  
  // Validation
  if (!m.quoted) return m.reply('❌ Reply sticker yang mau diconvert ke video!');
  if (m.quoted.mtype !== 'stickerMessage') {
    return m.reply('❌ Hanya bisa convert sticker! Reply sticker yang mau dijadikan video.');
  }
  
  enhance[m.sender] = {
    startTime: Date.now(),
    command: 'tovideo'
  };
  
  m.reply('🔄 Converting sticker to video... Please wait...');
  
  try {
    // Download sticker
    console.log('Downloading sticker...');
    const stickerBuffer = await m.quoted.download();
    
    if (!stickerBuffer) {
      throw new Error('Failed to download sticker');
    }
    
    // Generate temp file paths
    const inputFile = `./temp/input_${getRandom('.webp')}`;
    const outputFile = `./temp/output_${getRandom('.mp4')}`;
    
    // Ensure temp directory exists
    if (!fs.existsSync('./temp')) {
      fs.mkdirSync('./temp');
    }
    
    // Write sticker buffer to file
    fs.writeFileSync(inputFile, stickerBuffer);
    
    // Conversion options
    const conversionOptions = {
      duration: 3,        // 3 seconds for static stickers
      fps: 15,           // 15 FPS
      quality: 'medium', // Balance between quality and size
      scale: '512:512'   // WhatsApp recommended size
    };
    
    console.log('Starting conversion...');
    
    // Convert webp to mp4
    await webpToMp4ImageMagick(inputFile, outputFile, conversionOptions);
    
    // Check if output file exists and has content
    if (!fs.existsSync(outputFile) || fs.statSync(outputFile).size === 0) {
      throw new Error('Conversion failed - output file is empty or missing');
    }
    
    const fileSize = fs.statSync(outputFile).size;
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    
    console.log(`Conversion completed. File size: ${fileSizeMB}MB`);
    
    // Check file size limit (WhatsApp has ~16MB limit for videos)
    if (fileSize > 15 * 1024 * 1024) { // 15MB limit
      throw new Error(`File too large (${fileSizeMB}MB). Try with a smaller sticker.`);
    }
    
    // Send the video
    await rebot.sendMessage(m.chat, {
      video: fs.readFileSync(outputFile),
      caption: `✅ *Sticker to Video*\n\n📊 **File Size:** ${fileSizeMB}MB\n⏱️ **Duration:** ${conversionOptions.duration}s\n🎬 **FPS:** ${conversionOptions.fps}\n📐 **Resolution:** 512x512\n\n*Converted by Rebot™*`
    }, { quoted: m });
    
    // Cleanup temp files
    try {
      if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
      if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    } catch (cleanupError) {
      console.log('Cleanup error:', cleanupError.message);
    }
    
    // Deduct limit
    user.limit -= 1;
    
  } catch (error) {
    console.log('tovideo Error:', error.message);
    
    let errorMsg = '❌ Gagal convert sticker ke video.\n\n';
    
    if (error.message.includes('FFmpeg')) {
      errorMsg += '🔧 **Masalah:** FFmpeg error\n💡 **Solusi:** Coba dengan sticker yang lain';
    } else if (error.message.includes('too large')) {
      errorMsg += '📊 **Masalah:** File terlalu besar\n💡 **Solusi:** Gunakan sticker yang lebih kecil';
    } else if (error.message.includes('download')) {
      errorMsg += '📥 **Masalah:** Gagal download sticker\n💡 **Solusi:** Pastikan reply sticker yang valid';
    } else {
      errorMsg += '💡 **Solusi:** Coba lagi atau gunakan sticker lain';
    }
    
    m.reply(errorMsg);
    
  } finally {
    // Always cleanup
    delete enhance[m.sender];
    
    // Cleanup any remaining temp files
    try {
      const tempDir = './temp';
      if (fs.existsSync(tempDir)) {
        const tempFiles = fs.readdirSync(tempDir)
        .filter(file => file.includes(m.sender.split('@')[0]) || 
                          (Date.now() - fs.statSync(path.join(tempDir, file)).mtime.getTime() > 300000)); // 5 minutes old
        
        tempFiles.forEach(file => {
          try {
            fs.unlinkSync(path.join(tempDir, file));
          } catch (e) {
            // Ignore cleanup errors
          }
        });
      }
    } catch (e) {
      // Ignore cleanup errors
    }
  }
  tambahHitFitur('tovid')
}
break;

/////////////////////////////////GROUP FITUR\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

case 'groupinfo':
case 'infogrup': {
  if (!m.isGroup) return m.reply(mess.group);
  if (isBanspam) return m.reply(mess.spam);
  
  try {
    // Ini akan pakai cache
    const metadata = await store.groupMetadata(m.chat, rebot);
    
    if (!metadata) {
      return m.reply('❌ Gagal mendapatkan info grup');
    }
    
    const participants = metadata.participants || [];
    const admins = participants.filter(p => p.admin).map(p => p.id);
    
    let txt = `📱 *GROUP INFO*\n\n`;
    txt += `📌 *Name:* ${metadata.subject}\n`;
    txt += `🆔 *ID:* ${metadata.id}\n`;
    txt += `👥 *Members:* ${participants.length}\n`;
    txt += `👑 *Admins:* ${admins.length}\n`;
    txt += `📅 *Created:* ${new Date(metadata.creation * 1000).toLocaleDateString()}\n`;
    txt += `🔒 *Settings:* ${metadata.announce ? 'Only Admins' : 'All Members'}\n`;
    txt += `✏️ *Edit Info:* ${metadata.restrict ? 'Only Admins' : 'All Members'}\n`;
    
    if (metadata.desc) {
      txt += `\n📝 *Description:*\n${metadata.desc}`;
    }
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
  tambahHitFitur('groupinfo')
}
break;

case 'cachestatus':
case 'cacheinfo':
case 'statuscache': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    const cacheData = global.cacheHelpers.getStats();
    
    let txt = `📊 *GROUP METADATA CACHE STATUS*\n\n`;
    txt += `╭─────────────────\n`;
    txt += `│ 🔑 *Cached Groups:* ${cacheData.totalCached}\n`;
    txt += `│ ✅ *Cache Hits:* ${cacheData.hits}\n`;
    txt += `│ ❌ *Cache Misses:* ${cacheData.misses}\n`;
    txt += `│ 📦 *Total Keys:* ${cacheData.stats.keys}\n`;
    txt += `│ ⏱️ *Hit Rate:* ${cacheData.hitRate}%\n`;
    txt += `╰─────────────────\n\n`;
    
    if (cacheData.totalCached > 0) {
      txt += `📋 *Recent Cached Groups (${Math.min(10, cacheData.totalCached)} shown):*\n\n`;
      
      const groups = cacheData.keys.slice(0, 10);
      for (let i = 0; i < groups.length; i++) {
        const jid = groups[i];
        const info = global.cacheHelpers.getCacheInfo(jid);
        
        txt += `${i + 1}. *${info.data?.subject || 'Unknown Group'}*\n`;
        txt += `   📱 ID: ${jid.split('@')[0]}\n`;
        txt += `   ⏳ Expires: ${info.expiresIn}s (${Math.floor(info.expiresIn / 60)}m)\n`;
        txt += `   👥 Members: ${info.data?.participants?.length || 0}\n\n`;
      }
      
      if (cacheData.totalCached > 10) {
        txt += `_... and ${cacheData.totalCached - 10} more groups_\n`;
      }
    } else {
      txt += `📭 *No groups cached yet*\n`;
      txt += `💡 Groups akan di-cache otomatis saat diakses`;
    }
    
    txt += `\n\n_Cache TTL: 1 hour per group_`;
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 2. Check Cache - Cek cache grup saat ini
case 'checkcache':
case 'cekcache':
case 'cekgroupcache': {
  if (!m.isGroup) return m.reply(mess.group);
  if (!isAdmins && !isCreator) return m.reply(mess.admin)

    try {
      const info = global.cacheHelpers.getCacheInfo(m.chat);

      let txt = `📦 *CACHE INFO FOR THIS GROUP*\n\n`;
      txt += `╭─────────────────\n`;
      txt += `│ 📌 *Group:* ${groupMetadata.subject || 'Unknown'}\n`;
      txt += `│ 🆔 *ID:* ${m.chat.split('@')[0]}\n`;
      txt += `│ 📊 *Status:* ${info.exists ? '✅ Cached' : '❌ Not Cached'}\n`;
      txt += `╰─────────────────\n\n`;

      if (info.exists) {
        const expiresMinutes = Math.floor(info.expiresIn / 60);
        const expiresSeconds = info.expiresIn % 60;

        txt += `⏱️ *Cache Info:*\n`;
        txt += `├ Expires in: ${expiresMinutes}m ${expiresSeconds}s\n`;
        txt += `├ Members: ${info.data.participants.length}\n`;
        txt += `├ Admins: ${info.data.participants.filter(p => p.admin).length}\n`;
        txt += `├ Created: ${new Date(info.data.creation * 1000).toLocaleDateString()}\n`;
        txt += `└ Last updated: Fresh\n\n`;
        txt += `💡 Cache akan auto-refresh dalam ${expiresMinutes} menit`;
      } else {
        txt += `⚠️ *Not Cached Yet*\n\n`;
        txt += `💡 Cache akan dibuat otomatis saat metadata diakses.\n`;
        txt += `Gunakan *.refreshgroup* untuk cache sekarang.`;
      }

      m.reply(txt);

    } catch (err) {
      throw err
    }
  }
  break;

// 3. Refresh Group Cache - Refresh cache grup saat ini
case 'refreshgroupcache':
case 'refreshgroup':
case 'refreshcache': {
  if (!m.isGroup) return m.reply(mess.group);
  if (!isAdmins && !isCreator) return m.reply(mess.admin);
  
  try {
    m.reply('🔄 Refreshing group cache...');
    
    // Invalidate current cache
    global.cacheHelpers.invalidate(m.chat);
    
    // Fetch fresh data
    const metadata = await store.groupMetadata(m.chat, rebot);
    
    if (!metadata) {
      return m.reply('❌ Failed to fetch group metadata');
    }
    
    const admins = metadata.participants.filter(p => p.admin).length;
    
    let txt = `✅ *GROUP CACHE REFRESHED!*\n\n`;
    txt += `╭─────────────────\n`;
    txt += `│ 📌 *Name:* ${metadata.subject}\n`;
    txt += `│ 👥 *Members:* ${metadata.participants.length}\n`;
    txt += `│ 👑 *Admins:* ${admins}\n`;
    txt += `│ 🔒 *Settings:* ${metadata.announce ? 'Only Admins' : 'All Members'}\n`;
    txt += `│ ✏️ *Edit Info:* ${metadata.restrict ? 'Admins Only' : 'All Members'}\n`;
    txt += `╰─────────────────\n\n`;
    txt += `⏱️ Cache akan expire dalam 1 jam`;
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 4. Clear Cache - Hapus cache tertentu atau semua
case 'clearcache':
case 'cleargroupcache':
case 'hapuscache': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    const stats = global.cacheHelpers.getStats();
    const beforeCount = stats.totalCached;
    
    if (beforeCount === 0) {
      return m.reply('📭 No cache to clear!');
    }
    
    // Clear all cache
    global.cacheHelpers.clear();
    
    let txt = `✅ *CACHE CLEARED SUCCESSFULLY*\n\n`;
    txt += `🗑️ Cleared: ${beforeCount} group caches\n`;
    txt += `💾 Memory freed\n\n`;
    txt += `💡 Cache akan dibuat ulang otomatis saat dibutuhkan`;
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 5. Clear This Group Cache - Hapus cache grup saat ini saja
case 'clearthiscache':
case 'hapuscacheini': {
  if (!m.isGroup) return m.reply(mess.group);
  if (!isAdmins && !isCreator) return m.reply(mess.admin);
  
  try {
    const info = global.cacheHelpers.getCacheInfo(m.chat);
    
    if (!info.exists) {
      return m.reply('📭 This group is not cached yet!');
    }
    
    // Invalidate this group's cache
    global.cacheHelpers.invalidate(m.chat);
    
    let txt = `✅ *CACHE CLEARED*\n\n`;
    txt += `📌 Group: ${info.data.subject}\n`;
    txt += `🗑️ Cache untuk grup ini telah dihapus\n\n`;
    txt += `💡 Cache akan dibuat ulang saat metadata diakses lagi`;
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 6. List Cached Groups - List semua grup yang di-cache
case 'listcache':
case 'listcachedgroups':
case 'cachedgroups': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    const cachedGroups = global.cacheHelpers.getCachedGroups();
    
    if (cachedGroups.length === 0) {
      return m.reply('📭 *No groups cached yet*\n\nGroups akan di-cache otomatis saat metadata diakses.');
    }
    
    let txt = `📋 *CACHED GROUPS LIST*\n\n`;
    txt += `Total: ${cachedGroups.length} groups\n`;
    txt += `════════════════════\n\n`;
    
    const maxShow = 20;
    for (let i = 0; i < Math.min(maxShow, cachedGroups.length); i++) {
      const jid = cachedGroups[i];
      const info = global.cacheHelpers.getCacheInfo(jid);
      
      const expiresMin = Math.floor(info.expiresIn / 60);
      
      txt += `*${i + 1}. ${info.data?.subject || 'Unknown Group'}*\n`;
      txt += `   📱 ${jid.split('@')[0]}\n`;
      txt += `   👥 ${info.data?.participants?.length || 0} members\n`;
      txt += `   ⏳ ${expiresMin}m remaining\n`;
      txt += `   ────────────────\n`;
    }
    
    if (cachedGroups.length > maxShow) {
      txt += `\n_... and ${cachedGroups.length - maxShow} more groups_\n`;
      txt += `\nUse *.cachestatus* for full statistics`;
    }
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 7. Preload Cache - Preload semua grup
case 'preloadcache':
case 'loadcache':
case 'warmcache': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    m.reply('🔄 *Starting cache preload...*\n\nThis may take a while depending on number of groups.');
    
    const startTime = Date.now();
    const result = await global.cacheHelpers.preload(rebot);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    if (result.success) {
      let txt = `✅ *CACHE PRELOAD COMPLETE*\n\n`;
      txt += `╭─────────────────\n`;
      txt += `│ 📦 *Loaded:* ${result.count} groups\n`;
      txt += `│ ⏱️ *Duration:* ${duration}s\n`;
      txt += `│ 💾 *Status:* All cached\n`;
      txt += `╰─────────────────\n\n`;
      txt += `🚀 All group metadata is now cached and ready!\n`;
      txt += `⏱️ Cache will expire in 1 hour`;
      
      m.reply(txt);
    } else {
      m.reply(`❌ *Preload failed*\n\nError: ${result.error}\n\nSome groups may still be cached.`);
    }
    
  } catch (err) {
    throw err
  }
}
break;
/////////////////////////////////GROUP END\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

case 'menfess':
case 'menfes':
case 'confes':
case 'confess':
case 'conves':
case 'convess':
case 'pesanrahasia':{
  if (isBanspam) return m.reply(mess.spam)
   let Tutorfes = `
    *\`Hai mau Confes? Rebot punya dua mode confess nih, silahkan pilih mau versi confes yang mana ya..!\`*

    1. \`instanconfes\`
> _Instanconfes pada rebot berfungsi untuk mengirim pesan secara langsung dan hanya bisa mendapat balasan 1x dari target menggunakan kode unik, dan ada kemungkinan terjadi restarting bot yang membuat target tidak bisa meembalas karena kode unik yang sudah kadaluarsa_

    2. \`anonconfess\`
> _Anonconfes lebih mirip seperti anonymous chat, bedanya anonymous chat hanya mencari partner atau orang random, sedangkan anonconfess tidak random, kita bisa menargetkan seseorang cukup dengan no whatsapp nya, lalu melakukan chating secara anonim(rahasia dan privasi) seperti anonymous chat_

─────────────────────────────
    \`Jadi mau mode confes yang mana? gunakan perintah seperti di bawah ini dan pilih salah satu\`
> *.anonconfes*
> *.instanconfes*
  `
  m.reply(Tutorfes)
}
break

case 'instanmenfes':
case 'instanmenfess':
case 'instanmenfes':
case 'instanconfes':
case 'instanconfess':
case 'instanconves':
case 'instanconvess':{
  if (isBanspam) return m.reply(mess.spam);
  if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
  if (m.isGroup) return m.reply('Fitur hanya bisa digunakan di private chat');

  let pengirim = m.pushName || "No Name";
  let cnth = `
Hai ${pengirim}, ingin mengirim pesan rahasia tapi bingung cara menggunakan fitur ini?
Gampang banget kok! Kamu tinggal ketik pesan dengan format seperti ini:

_*.instanconfes dari siapa | kepada siapa | No wa dia | isi pesannya*_

Contoh penggunaan:
_*.menfes Someone | Amel | 628123xxx | Hai Amel, aku mau jujur aku suka sama kamu*_

Bot akan mengirimkan pesan rahasia kamu ke penerima sesuai dengan informasi yang kamu berikan.

Pastikan untuk memperhatikan tanda '|' (garis vertikal) saat mengirim pesan.
Perhatikan juga penggunaan nomor penerima dengan format 628123xx (tanpa angka 0 di depan).

Selamat mencoba!
  `;

  try {
   if (!text) return m.reply(cnth);
   let [dri, kpd, nowa, psn] = text.split('|').map(item => item.trim());
   if (!dri || !kpd || !nowa || !psn) return m.reply('Format pesan salah, pastikan kamu menggunakan "|" untuk memisahkan informasi.');
   let penerima = nowa.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

// Fungsi untuk membaca data dari file JSON
   function readConfesSessions() {
    if (fs.existsSync(_datamenfes)) {
     const data = fs.readFileSync(_datamenfes, 'utf8');
     return JSON.parse(data);
   }
   return {};
 }

// Fungsi untuk menulis data ke file JSON
 function writeConfesSessions(data) {
  fs.writeFileSync(_datamenfes, JSON.stringify(data, null, 2), 'utf8');
}

// Inisialisasi confesSessions dari file JSON
let confesSessions = readConfesSessions();

let sessionId = generateSessionId();
confesSessions[sessionId] = { siconfes: m.chat, receiverName: penerima };

// Simpan perubahan ke file JSON
writeConfesSessions(confesSessions);

let pesannya = `Hai ${kpd}, kamu menerima pesan💌 dari seseorang nih!
*────────────────────*
*Kode unik:* _${sessionId}_
*Dari:* ${dri}
*Kepada:* ${kpd}

*Isi Pesan* :
${psn}

*────────────────────*
_Jika ingin membalas ketik .balasconfes ${sessionId} pesan balasan_
_Jika ingin mengirim pesan rahasia atau confes ketik .menfes_

> _Untuk membalas confes kamu hanya bisa mengirim 1x pesan_
> _Gunakan kode unik untuk membalas confes_
`;
rebot.sendText(penerima, pesannya);
user.limit -= 1;
m.reply('Pesan confes berhasil dikirim!\n\n> _Silahkan tunggu balasan dari dia. Target hanya bisa mengirim 1x pesan balasan_');
} catch (err) {
  throw err;
} 
tambahHitFitur('instanconfes')
}
break;

case 'balasconfes': {
  if (isBanspam) return m.reply(mess.spam)
   if (!text) return m.reply('Balas dengan format: .balasconfes [kodeUnik] [pesanmu]');

 let [sessionId, ...replyMessageParts] = text.split(' ');
 let replyMessage = replyMessageParts.join(' ').trim();
 if (!sessionId || !replyMessage) return m.reply('Format pesan salah, pastikan kamu menggunakan format yang benar.\nContoh: .balasconfes kodeUnik haii');

// Fungsi untuk membaca data dari file JSON
 function readConfesSessions() {
  if (fs.existsSync(_datamenfes)) {
    const data = fs.readFileSync(_datamenfes, 'utf8');
    return JSON.parse(data);
  }
  return {};
}

// Fungsi untuk menulis data ke file JSON
function writeConfesSessions(data) {
 fs.writeFileSync(_datamenfes, JSON.stringify(data, null, 2), 'utf8');
}

// Inisialisasi confesSessions dari file JSON
let confesSessions = readConfesSessions();

if (!confesSessions[sessionId]) {
 return m.reply('Kode unik confes tidak ditemukan atau sudah kadaluarsa.');
}

let { siconfes } = confesSessions[sessionId];
rebot.sendText(siconfes, `Balasan dari confes kamu:\n\n- ${replyMessage}`);
m.reply('Balasan berhasil dikirim!\n\n> _Kamu hanya bisa mengirim 1x pesan balasan_');

// Hapus sesi setelah digunakan dan simpan perubahan ke file JSON
delete confesSessions[sessionId];
writeConfesSessions(confesSessions);
break;
}

case 'anonconfess':
case 'anonconfes': {
 if (isBanspam) return m.reply(mess.spam);
 if (m.isGroup) return m.reply('Fitur tidak dapat digunakan di grup!');

// Format perintah: !anonconfess <nomor_target> <pesan>
 if (!args[0])
  return m.reply(`Silakan masukkan nomor target.\nContoh: ${prefix}anonconfess 628123456789 Aku ingin menyampaikan...`);

let targetNum = args[0];
let pesanAwal = args.slice(1).join(' ');
if (!pesanAwal)
  return m.reply(`Silakan masukkan pesan confess.\nContoh: ${prefix}anonconfess 628123456789 Aku ingin menyampaikan...`);

// Validasi format nomor (misal harus diawali dengan 62)
if (!/^62\d+$/.test(targetNum)) {
  return m.reply(`Nomor target tidak valid. Pastikan menggunakan kode internasional, misal 628123456789.`);
}

// Format nomor ke WhatsApp ID
let targetID = `${targetNum}@s.whatsapp.net`;

// Pastikan pengirim belum sedang dalam sesi confess
if (findAnonConfessSessionByUser(m.sender)) {
  return m.reply(`Kamu sudah sedang dalam sesi anonymous confess. Ketik ${prefix}exit untuk mengakhiri sesi yang sedang berjalan.`);
}

// Buat sesi baru dengan state "WAITING"
let sessionId = +new Date();
db.data.anonconfess[sessionId] = {
  id: sessionId,
a: m.sender,      // Initiator (pengirim)
b: targetID,      // Target
state: 'WAITING'  // Sesi masih menunggu persetujuan target
};

// Kirim pesan ke target dengan instruksi untuk menyetujui atau menolak
let pesannya = `Hai kamu menerima pesan confess dari seseorang nih!
*────────────────────*

*Isi Pesan* :
${pesanAwal}

*────────────────────*
> _Jika ingin membalas ketik .setuju atau .no untuk menolak_
> _Kamu juga bisa menggunakan button di bawah ini_`;
await rebot.sendMessage(targetID, {
 text: pesannya,
 footer: "*Rebot™© | 2019-2025*",
 buttons: [
  {
   buttonId: `.setuju`, 
   buttonText: {
    displayText: 'SETUJU'
  },
  type: 1 
},
{
 buttonId: `.no`, 
 buttonText: {
  displayText: 'NO'
},
type: 1 
}
],
headerType: 1,
viewOnce: true
},{ quoted: null })

// Notifikasi ke pengirim bahwa pesan berhasil dikirim dan sedang menunggu persetujuan target
m.reply(`Pesan confess berhasil dikirim. Tunggu target untuk menyetujui chat.`);

tambahHitFitur('anonconfes')
}
break;

case 'setuju': {
// Perintah ini hanya bisa dijalankan oleh target yang menerima pesan confess
 if (isBanspam) return m.reply(mess.spam);
 if (m.isGroup) return m.reply('Fitur tidak dapat digunakan di grup!');

// Cari sesi di mana user (m.sender) adalah target dan status masih WAITING
 let session = findAnonConfessSessionForTarget(m.sender);
 if (!session) {
  return m.reply(`Tidak ada permintaan anonymous confess yang menunggu persetujuan.`);
}

// Ubah state menjadi CHATTING
session.state = 'CHATTING';

// Beri notifikasi kepada target
m.reply(`Kamu telah menyetujui anonymous confess. Silakan mulai mengirim pesan, dan bot akan meneruskannya secara anonim. Jika ingin mengakhiri silahkan ketik .exit`);

// Beri notifikasi ke initiator bahwa target telah setuju
await rebot.sendText(session.a, `Target telah setuju untuk melakukan chat. Silakan mulai mengirim pesan, dan bot akan meneruskannya secara anonim. Jika ingin mengakhiri silahkan ketik .exit`);
}
break;

case 'no': {
// Perintah ini hanya bisa dijalankan oleh target untuk menolak sesi confess
 if (isBanspam) return m.reply(mess.spam);
 if (m.isGroup) return m.reply('Fitur tidak dapat digunakan di grup!');

 let session = findAnonConfessSessionForTarget(m.sender);
 if (!session) {
  return m.reply(`Tidak ada permintaan anonymous confess yang menunggu persetujuan.`);
}

// Notifikasi ke target bahwa mereka telah menolak
m.reply(`Kamu telah menolak anonymous confess.`);

// Kirim pesan ke initiator bahwa target tidak setuju
await rebot.sendText(session.a, `Maaf, sepertinya target tidak setuju untuk melanjutkan chat. Nice Try.`);

// Hapus sesi karena telah ditolak
delete db.data.anonconfess[session.id];
}
break;

case 'exit':
case 'keluar': {
 if (isBanspam) return m.reply(mess.spam);
 if (m.isGroup) return m.reply('Fitur tidak dapat digunakan di grup!');

// Cari sesi di mana m.sender terlibat (baik sebagai initiator atau target)
 let session = findAnonConfessSessionByUser(m.sender);
 if (!session) return m.reply(`Kamu tidak sedang dalam sesi anonymous confess.`);

// Identifikasi lawan bicara
 let partner = (session.a === m.sender) ? session.b : session.a;
 await rebot.sendText(partner, `Sesi anonymous confess telah diakhiri oleh partner.`);
 m.reply(`Sesi anonymous confess telah diakhiri.`);
 delete db.data.anonconfess[session.id];
}
break;


case 'public': {
  if (!isCreator) return m.reply(mess.owner)
    rebot.public = true
  m.reply('Sukse Change To Public Usage')
}
break
case 'self': {
  if (!isCreator) return m.reply(mess.owner)
    rebot.public = false
  m.reply('Sukses Change To Self Usage')
}
break

case 'metadata' : {
  if (!isModerator) return m.reply(mess.mod)
    if (isBanspam) return m.reply(mess.spam)

      let target = text
    ? await normalizedMention(text)
    : m.quoted
    ? m.quoted.sender
    : m.sender;
  // console.log(target)
    let chatData = global.db.data.users[target] || {};

// Format data menjadi string JSON yang rapi
    let formattedData = JSON.stringify(chatData, null, 2);

// Kirimkan pesan dengan isi database
    m.reply(`Database: \n\`\`\`${formattedData}\`\`\``);
  }
  break

case 'moderator': {
  if (!isCreator) return m.reply("Hanya owner/creator yang dapat menggunakan perintah ini.");

  let [action, expired, num] = text.split(" ");
  if (!action || (action !== 'add' && action !== 'del')) {
    return m.reply("Format salah! Gunakan .premium [add|del] [expired] <noinput628../reply/mention");
  }

  let target = num
  ? await normalizedMention(num)
  : m.quoted
  ? m.quoted.sender
  : null;

  if (!target) return m.reply("Silahkan sebutkan target!\n.premium [add|del] [expired] <noinput628../reply/mention");


// Proses add atau del premium
  if (action === 'add') {
    if (!expired) return m.reply("Format waktu tidak valid! Gunakan seperti 1d, 7h, 30m.");
    global.db.data.users[target].moderator = { status: true, expired: Date.now() + toMs(expired) };
    global.db.data.users[target].limit = global.limitawal.moderator;
    rebot.sendTextWithMentions(m.chat,`✅ *@${target.split('@')[0]}* sekarang menjadi moderator bot selama *${expired}*!`, m);
    await rebot.sendMessage(target, { text: `🎉 Selamat! Kamu telah menjadi *moderator* selama *${expired}*!\n\n> _Gunakan fitur .cekmoderator untuk melihat sisa waktu atau expired_` });
  } else if (action === 'del') {
    global.db.data.users[target].moderator = { status: false, expired: 0 };
    global.db.data.users[target].limit = global.limitawal.free;
    m.reply(`Berhasil menghapus moderator dari ${target}`);
  }
}
break;

case 'moderatorheck':
case 'checkmoderator':
case 'moderatorcek':
case 'cekmoderator': {
  if (isBanspam) return m.reply(mess.spam)
    let dbprem = user
  if (!user.moderator.status) return m.reply(`> _Kamu tidak terdaftar sebagai moderator. Ketik ${prefix}toko untuk membeli hak moderator_`)
    let cekvip = ms(dbprem.moderator.expired - Date.now())
  let premiumnya = `*「  MODERATOR EXPIRED 」*\n\n➸ *ID*: ${m.sender}\n➸ *Expired :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
  m.reply(premiumnya)
}
break

case 'addlimit': {
  if (!isCreator) return m.reply(mess.owner);

  try {
    let [jmlh, num] = text.split(" ");
    let jumlah = parseInt(jmlh)
    if (isNaN(jumlah) || jumlah <= 0) return m.reply('> _ⓘ Masukkan angka limit yang valid!_\n_Example:.addlimit 5 62..._');

    let target = num
    ? await normalizedMention(num)
    : m.quoted
    ? m.quoted.sender
    : null;

    if (!target) return m.reply('> _ⓘ Harap reply pengguna atau masukkan nomor target dengan format 62...!_\n> _Example:.addlimit 5 62..._');
    if (!global.db.data.users[target]) return m.reply('> _ⓘ Pengguna tidak ditemukan dalam database!_');

    global.db.data.users[target].limit += jumlah;

    rebot.sendTextWithMentions(m.chat,`✅ Berhasil menambahkan *${jumlah}* limit ke *@${target.split('@')[0]}*!`, m);

// Kirim notifikasi ke target
    await rebot.sendMessage(target, { text: `📢 Kamu mendapatkan tambahan *${jumlah}* limit dari Owner!` });

  } catch (err) {
    console.error(err);
    m.reply('❌ Terjadi kesalahan! Transaksi dibatalkan.');
  }
}
break;

case 'dellimit': {
  if (!isCreator) return m.reply(mess.owner);

  try {
    let [jmlh, num] = text.split(" ");
    let jumlah = parseInt(jmlh)
    if (isNaN(jumlah) || jumlah <= 0) return m.reply('> _ⓘ Masukkan angka limit yang valid!_\n_Example:.dellimit 5 62..._');

    let target = num
    ? await normalizedMention(num)
    : m.quoted
    ? m.quoted.sender
    : null;

    if (!target) return m.reply('> _ⓘ Harap reply pengguna atau masukkan nomor target dengan format 62...!_\n> _Example:.dellimit 5 62..._');
    if (!global.db.data.users[target]) return m.reply('> _ⓘ Pengguna tidak ditemukan dalam database!_');

    global.db.data.users[target].limit -= jumlah;

    rebot.sendTextWithMentions(m.chat,`✅ Berhasil menghapus *${jumlah}* limit ke *@${target.split('@')[0]}*!`, m);


  } catch (err) {
    console.error(err);
    m.reply('❌ Terjadi kesalahan! Transaksi dibatalkan.');
  }
}
break;

case 'transferlimit': case 'tflimit': {
  if (isBanspam) return m.reply(mess.spam)
    try {
      let [jmlh, num] = text.split(" ");
      let jumlah = parseInt(jmlh)
      let target = num
      ? await normalizedMention(num)
      : m.quoted
      ? m.quoted.sender
      : null;

      if (!jumlah || isNaN(jumlah) || jumlah <= 0) return m.reply('> _ⓘ Masukkan nominal limit yang valid!_\n> _Example:.transferlimit 5 62..._');
      if (!target) return m.reply('> _ⓘ Masukkan nomor target dengan format 62...!_\n> _Example:.transferlimit 5 62..._');
      if (!global.db.data.users[target]) return m.reply('> _ⓘ Pengguna tidak ditemukan dalam database!_');
      if (!user) return m.reply('> _ⓘ Data kamu tidak ditemukan dalam database!_');

      let senderLimit = user.limit;
      if (senderLimit < jumlah) return m.reply('> _ⓘ Limit kamu tidak mencukupi untuk transfer ini!_');

// Kurangi limit pengirim dan tambahkan ke penerima
      user.limit -= jumlah;
      global.db.data.users[target].limit += jumlah;

      rebot.sendTextWithMentions(m.chat,`✅ Berhasil mentransfer *${jumlah}* limit ke *@${target.split('@')[0]}*!`,m);

// Kirim notifikasi ke target
      await rebot.sendMessage(target, { text: `📢 Kamu menerima *${jumlah}* limit dari *@${m.sender.split('@')[0]}*!`});

    } catch (err) {
      console.error(err);
      m.reply('❌ Terjadi kesalahan! Transaksi dibatalkan.');
    }
  }
  break;

case 'ban': {
  if (!isModerator) return m.reply(mess.mod);
  if (isBanspam) return m.reply(mess.spam)

    let num = args[1]

  let target = num
  ? await normalizedMention(num)
  : m.quoted
  ? m.quoted.sender
  : null;

  if (!target) return m.reply("Silahkan sebutkan target!\n.premium [add|del] <noinput628../reply/mention");


// Proses add atau del 
  if (args[0] === 'add') {
    global.db.data.users[target].banned = true
    rebot.sendTextWithMentions(m.chat,`✅ User dengan ID *@${target.split('@')[0]}* Sukse diban`, m);
  } else if (args[0] === 'del') {
    global.db.data.users[target].banned = false
    m.reply(`Berhasil membuka ban dari ${target}`);
  }
}
break;

case 'spamcheck':
case 'cekspam': {
  if (!isBanspam) return m.reply(`> _ⓘ Fitur Khusus bagi pengguna yang telah melakukan spam dan mendapatkan penalti_`)
    let cekspamm = ms(user.banspam.expired - Date.now())
  let sispamnya = `*「 SPAM EXPIRE 」*\n\n➸ *ID*: ${m.sender}\n➸ *Expired :* ${cekspamm.days} day(s) ${cekspamm.hours} hour(s) ${cekspamm.minutes} minute(s)`
  m.reply(sispamnya)
}
break

case 'spamlist':
case 'listspam': {
  if (!isModerator) return m.reply(mess.mod);

  let users = global.db.data.users;
  let spamUsers = Object.entries(users).filter(([jid, data]) => data.banspam && data.banspam.status);

  if (spamUsers.length === 0) return m.reply("> _ⓘ Tidak ada user yang sedang terkena banspam._");

  let txt = `📑 *List Spam*\nJumlah: ${spamUsers.length}\n\n`;

  for (let [jid, data] of spamUsers) {
    let sisa = data.banspam.expired - Date.now();
    if (sisa < 0) continue; // kalau sudah lewat, skip

    let seconds = Math.floor(sisa / 1000) % 60;
    let minutes = Math.floor(sisa / (1000 * 60)) % 60;
    let hours   = Math.floor(sisa / (1000 * 60 * 60)) % 24;
    let days    = Math.floor(sisa / (1000 * 60 * 60 * 24));

    txt += `*ID:* @${jid.split('@')[0]}\n`;
    txt += `*Expire:* ${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)\n\n`;
  }

  rebot.sendTextWithMentions(m.chat, txt, m);
}
break;

case 'banspam': {
  if (!isModerator) return m.reply(mess.mod);

  let [action, expired, num] = text.split(" ");
  if (!action || (action !== 'add' && action !== 'del')) {
    return m.reply("Format salah! Gunakan .banspam [add|del] [expired] <noinput628../reply/mention");
  }

  let target = num
  ? await normalizedMention(num)
  : m.quoted
  ? m.quoted.sender
  : null;

  if (!target) return m.reply("Silahkan sebutkan target!\n.banspam [add|del] [expired] <noinput628../reply/mention");


// Proses add atau del premium
  if (action === 'add') {
    if (!expired) return m.reply("Format waktu tidak valid! Gunakan seperti 1d, 7h, 30m.");
    global.db.data.users[target].banspam = { status: true, expired: Date.now() + toMs(expired) };
    rebot.sendTextWithMentions(m.chat,`✅ *@${target.split('@')[0]}* dibanned selama *${expired}*!`, m);
  } else if (action === 'del') {
    global.db.data.users[target].banspam = { status: false, expired: 0 };
    m.reply(`Berhasil menghapus baspam dari ${target}`);
  }
}
break;

// ===== IMPROVED BOT STATUS COMMAND =====

case 'ping':
case 'tes':
case 'botstatus':
case 'statusbot':
case 'status': {
  if (isBanspam) return m.reply(mess.spam);

  try {
    // Send loading message
    const loadingMsg = await m.reply('📊 _Collecting system information..._');

    // ===== 1. LATENCY & RESPONSE TIME =====
    const startTime = Date.now();
    const pingStart = performance.now();

    // Simulate actual ping
    await new Promise(resolve => setTimeout(resolve, 10));

    const pingEnd = performance.now();
    const responseTime = (pingEnd - pingStart).toFixed(2);

    // ===== 2. BAILEYS & BOT VERSION =====
    const packageJsonBailVersion = JSON.parse(await fs.readFileSync('./node_modules/@whiskeysocket/baileys/package.json', 'utf8'));
    const BotVersion = JSON.parse(await fs.readFileSync('./package.json', 'utf8'));

    // ===== 3. RUNTIME =====
    const uptime = process.uptime();
    const runtimeStr = runtime(uptime);

    // ===== 4. MEMORY USAGE =====
    const memUsage = process.memoryUsage();
    const formatMemory = (bytes) => {
      const mb = bytes / 1024 / 1024;
      return mb.toFixed(2) + ' MB';
    };

    // ===== 5. CPU USAGE (2 SAMPLES) =====
    const cpus = os.cpus();
    const cpuModel = cpus[0].model.trim();
    const cpuSpeed = cpus[0].speed;
    const cpuCores = cpus.length;

    // Get CPU usage (sample 1)
    const getCPUInfo = () => {
      const cpus = os.cpus();
      let totalIdle = 0, totalTick = 0;

      cpus.forEach(cpu => {
        for (let type in cpu.times) {
          totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
      });

      return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
    };

    const startCPU = getCPUInfo();

    // Wait 100ms for second sample
    await new Promise(resolve => setTimeout(resolve, 100));

    const endCPU = getCPUInfo();

    // Calculate CPU usage percentage
    const idleDiff = endCPU.idle - startCPU.idle;
    const totalDiff = endCPU.total - startCPU.total;
    const cpuUsage = (100 - ~~(100 * idleDiff / totalDiff));

    // ===== 6. OS INFORMATION =====
    const platform = os.platform();
    const osType = os.type();
    const osRelease = os.release();
    const osArch = os.arch();
    const hostname = os.hostname();

    // Format platform name
    const platformNames = {
      'linux': '🐧 Linux',
      'darwin': '🍎 macOS',
      'win32': '🪟 Windows',
      'android': '🤖 Android'
    };
    const platformName = platformNames[platform] || platform;

    // ===== 7. SYSTEM MEMORY =====
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memPercentage = ((usedMem / totalMem) * 100).toFixed(2);

    // ===== 8. LOAD AVERAGE (Linux/macOS only) =====
    let loadAvg = '';
    try {
      const loads = os.loadavg();
      loadAvg = `${loads[0].toFixed(2)}, ${loads[1].toFixed(2)}, ${loads[2].toFixed(2)}`;
    } catch (e) {
      loadAvg = 'N/A';
    }

    // ===== 9. BOT INFORMATION =====
    const nodeVersion = process.version;
    const botPID = process.pid;

    // ===== 10. DATABASE INFO =====
    const totalUsers = Object.keys(global.db?.data?.users || {}).length;
    const totalGroups = Object.keys(global.db?.data?.chats || {}).length;

    // ===== BUILD RESPONSE =====
    let statusText = `╭─❑ 「 *BOT STATUS* 」 ❑─\n`;
    statusText += `│\n`;

    // Response Time
    statusText += `│ ⚡ *Response Time*\n`;
    statusText += `│ ├ Latency: ${responseTime} ms\n`;
    statusText += `│ └ Speed: ${(1000 / parseFloat(responseTime)).toFixed(2)} msg/s\n`;
    statusText += `│\n`;

    // Runtime
    statusText += `│ ⏰ *Runtime*\n`;
    statusText += `│ └ ${runtimeStr}\n`;
    statusText += `│\n`;

    // Bot Info
    statusText += `│ 🤖 *Bot Information*\n`;
    statusText += `│ ├ Bot Name: v${global.botName}\n`;
    statusText += `│ ├ Bot Version: v${BotVersion.version}\n`;
    statusText += `│ ├ Mode : ${rebot.public ? 'Public' : 'Self'}\n`;
    statusText += `│ ├ Baileys: v${packageJsonBailVersion.version}\n`;
    statusText += `│ ├ Node.js: ${nodeVersion}\n`;
    statusText += `│ ├ PID: ${botPID}\n`;
    statusText += `│ ├ Users: ${totalUsers}\n`;
    statusText += `│ └ Groups: ${totalGroups}\n`;
    statusText += `│\n`;

    // Server Info
    statusText += `│ 💻 *Server Information*\n`;
    statusText += `│ ├ OS: ${platformName}\n`;
    statusText += `│ ├ Type: ${osType}\n`;
    statusText += `│ ├ Release: ${osRelease}\n`;
    statusText += `│ ├ Arch: ${osArch}\n`;
    statusText += `│ └ Hostname: ${hostname}\n`;
    statusText += `│\n`;

    // CPU Info
    statusText += `│ 🔥 *CPU Information*\n`;
    statusText += `│ ├ Model: ${cpuModel}\n`;
    statusText += `│ ├ Cores: ${cpuCores}\n`;
    statusText += `│ ├ Speed: ${cpuSpeed} MHz\n`;
    statusText += `│ ├ Usage: ${cpuUsage}%\n`;
    statusText += `│ └ Load Avg: ${loadAvg}\n`;
    statusText += `│\n`;

    // Memory Info
    statusText += `│ 💾 *Memory Information*\n`;
    statusText += `│\n`;
    statusText += `│ *System Memory*\n`;
    statusText += `│ ├ Total: ${formatp(totalMem)}\n`;
    statusText += `│ ├ Used: ${formatp(usedMem)} (${memPercentage}%)\n`;
    statusText += `│ └ Free: ${formatp(freeMem)}\n`;
    statusText += `│\n`;
    statusText += `│ *Process Memory*\n`;
    statusText += `│ ├ RSS: ${formatMemory(memUsage.rss)}\n`;
    statusText += `│ ├ Heap Used: ${formatMemory(memUsage.heapUsed)}\n`;
    statusText += `│ ├ Heap Total: ${formatMemory(memUsage.heapTotal)}\n`;
    statusText += `│ └ External: ${formatMemory(memUsage.external)}\n`;
    statusText += `│\n`;

    statusText += `╰──────❑\n\n`;
    statusText += `_Updated: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}_`;

    // Send status
    await rebot.sendMessage(m.chat, { 
      text: statusText 
    }, { quoted: m });

  } catch (err) {
    throw err
  }
  tambahHitFitur('ping')
}
break;

// ===== BONUS: COMPACT VERSION =====

case 'ping2':{
  if (isBanspam) return m.reply(mess.spam);
  
  const start = performance.now();
  const memUsage = process.memoryUsage();
  const uptime = process.uptime();
  
  // Quick CPU sample
  const getCPU = () => {
    const cpus = os.cpus();
    return cpus.reduce((acc, cpu) => {
      acc.idle += cpu.times.idle;
      acc.total += Object.values(cpu.times).reduce((a, b) => a + b, 0);
      return acc;
    }, { idle: 0, total: 0 });
  };
  
  const cpu1 = getCPU();
  await new Promise(r => setTimeout(r, 100));
  const cpu2 = getCPU();
  
  const cpuUsage = 100 - ~~(100 * (cpu2.idle - cpu1.idle) / (cpu2.total - cpu1.total));
  const end = performance.now();
  
  const compact = `🤖 *Bot Status*\n\n` +
`⚡ Speed: ${(end - start).toFixed(2)}ms\n` +
`⏰ Uptime: ${runtime(uptime)}\n` +
`💾 RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}\n` +
`🔥 CPU: ${cpuUsage}% (${os.cpus().length} cores)\n` +
`📊 Heap: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`;

m.reply(compact);
}
break;

// ===== BONUS: DETAILED SERVER INFO =====

case 'serverinfo':
case 'infoserver': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    const netInterfaces = os.networkInterfaces();
    const ipAddresses = [];
    
    for (const iface in netInterfaces) {
      netInterfaces[iface].forEach(addr => {
        if (addr.family === 'IPv4' && !addr.internal) {
          ipAddresses.push(addr.address);
        }
      });
    }
    
    const packageJsonBailVersion = JSON.parse(await fs.readFileSync('./node_modules/@whiskeysocket/baileys/package.json', 'utf8'));
    
    let info = `╭─❑ 「 *SERVER DETAILS* 」 ❑─\n\n`;
    
    info += `*🖥️ System*\n`;
    info += `├ Platform: ${os.platform()}\n`;
    info += `├ OS: ${os.type()} ${os.release()}\n`;
    info += `├ Arch: ${os.arch()}\n`;
    info += `├ Hostname: ${os.hostname()}\n`;
    info += `└ User: ${os.userInfo().username}\n\n`;
    
    info += `*🌐 Network*\n`;
    info += `└ IP: ${ipAddresses.join(', ') || 'N/A'}\n\n`;
    
    info += `*💻 Hardware*\n`;
    info += `├ CPU: ${os.cpus()[0].model}\n`;
    info += `├ Cores: ${os.cpus().length}\n`;
    info += `├ Speed: ${os.cpus()[0].speed} MHz\n`;
    info += `└ RAM: ${formatp(os.totalmem())}\n\n`;
    
    info += `*⚙️ Process*\n`;
    info += `├ PID: ${process.pid}\n`;
    info += `├ Node: ${process.version}\n`;
    info += `├ Baileys: v${packageJsonBailVersion.version}\n`;
    info += `├ Platform: ${process.platform}\n`;
    info += `└ Uptime: ${runtime(process.uptime())}\n\n`;
    
    info += `*📊 Statistics*\n`;
    info += `├ Users: ${Object.keys(global.db.data.users).length}\n`;
    info += `├ Groups: ${Object.keys(global.db.data.chats).length}\n`;
    info += `└ Commands: [count]\n\n`;
    
    info += `╰──────❑`;
    
    m.reply(info);
    
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
}
break;

case 'addfitur': {
  if (!isCreator) return m.reply(mess.owner);
  if (!text) return m.reply('❌ Format: .addfitur <id> | <name> | <description> | <category> | <use> | <new>\n\nContoh: .addfitur igdl | "Instagram Downloader" | "Download media Instagram" | downloader | ".ig [url]" | new');

  const args = text.split('|').map(arg => arg.trim());
  if (args.length < 6) return m.reply('❌ Format salah! Minimal 6 parameter.\n\nContoh: .addfitur igdl | "Instagram Downloader" | "Download media Instagram" | downloader | ".ig [url]" | new');

  const [id, name, description, category, use, isNewFlag] = args;
  const isNew = isNewFlag.toLowerCase() === 'new';

  const expired = isNew ? Date.now() + (7 * 24 * 60 * 60 * 1000) : 0;

  // Cek apakah fitur sudah ada
  const existingFitur = global.db.data.fitur[id];

  const fiturData = {
    name,
    description,
    category,
    use,
    isNew: {
      status: isNew,
      expired: expired
    },
    hit: existingFitur?.hit || 0 // Jika sudah ada, pertahankan hit, jika tidak, set 0
  };

  global.db.data.fitur[id] = fiturData;

  m.reply(`✅ Fitur "${name}" (${id}) berhasil ${existingFitur ? 'diperbarui' : 'ditambahkan'}!`);
}
break;

case 'deletefitur':
case 'delfitur':
case 'hapusfitur': {
  if (!isCreator) return m.reply(mess.owner);
  if (!text) return m.reply('❌ Format: .deletefitur <id_fitur>\n\nContoh: .deletefitur igdl\n\nDaftar fitur: ' + Object.keys(global.db.data.fitur).join(', '));

  const fiturId = text.trim().toLowerCase();
  
  // Cek apakah fitur exists
  if (!global.db.data.fitur[fiturId]) {
    return m.reply(`❌ Fitur dengan ID "${fiturId}" tidak ditemukan!\n\nDaftar ID fitur yang tersedia: ${Object.keys(global.db.data.fitur).join(', ') || 'Tidak ada fitur'}`);
  }

  const fiturName = global.db.data.fitur[fiturId].name;
  
  // Hapus fitur
  delete global.db.data.fitur[fiturId];
  
  m.reply(`✅ Fitur "${fiturName}" (${fiturId}) berhasil dihapus!`);
}
break;

case 'newfitur':
case 'newfeature': {
  if (isBanspam) m.reply(mess.spam)
    const now = Date.now();
  const newFeatures = Object.entries(global.db.data.fitur)
  .filter(([id, f]) => f.isNew && f.isNew.status && f.isNew.expired > now)
    .slice(0, 5) // Max 5 fitur
    .map(([id, f], index) => ({ id, ...f, index }));

    if (newFeatures.length === 0) {
      return m.reply('📭 Tidak ada fitur baru saat ini. Silakan coba lagi nanti!');
    }

    let message = '🎊 *FITUR BARU REBOT* 🎊\n\n';

    newFeatures.forEach((fitur, index) => {
      const remainingTime = fitur.isNew.expired - now;
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      message += `*${index + 1}. ${fitur.name}*\n`;
      message += `📝 ${fitur.description}\n`;
      message += `🔧 Kategori: ${fitur.category}\n`;
      message += `⚡ Penggunaan: ${fitur.use}\n`;
      message += `⏰ Berakhir dalam: ${days}h ${hours}j\n\n`;
    });

    message += `_Total: ${newFeatures.length} fitur baru_`;
    m.reply(message);
  }
  break;

case 'fiturpopuler':
case 'popularfitur': {
  if (isBanspam) m.reply(mess.spam)
    const popularFeatures = Object.entries(global.db.data.fitur)
  .filter(([id, fitur]) => fitur.hit > 0)
  .sort((a, b) => b[1].hit - a[1].hit)
    .slice(0, 5); // Ambil 5 teratas

    if (popularFeatures.length === 0) {
      return m.reply('📊 Belum ada data penggunaan fitur. Gunakan beberapa fitur terlebih dahulu!');
    }

    let message = '🔥 *FITUR POPULER REBOT* 🔥\n\n';

    popularFeatures.forEach(([id, fitur], index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🔸';

      message += `${medal} *${fitur.name}*\n`;
      message += `📝 ${fitur.description}\n`;
      message += `🔧 Kategori: ${fitur.category}\n`;
      message += `⚡ Penggunaan: ${fitur.use}\n`;
      message += `📊 Digunakan: ${fitur.hit} kali\n\n`;
    });

    message += `_Data diupdate: ${new Date().toLocaleDateString('id-ID')}_`;
    m.reply(message);
  }
  break;

case 'changelog':
case 'log': {
  if (isBanspam) m.reply(mess.spam)
    const changelog = global.db.data.settings[botNumber]?.changelog || [];

  if (changelog.length === 0) {
    return m.reply('📝 Belum ada changelog tersedia.');
  }

  let message = '📝 *CHANGELOG REBOT* 📝\n\n';
  
  changelog.forEach((log, index) => {
    message += `*${index + 1}.* ${log}\n\n`;
  });
  
  message += `\n_Last update: ${new Date().toLocaleDateString('id-ID')}_`;
  m.reply(message);
}
break;

case 'addchangelog': {
  if (!isCreator) return m.reply(mess.owner);
  if (!text) return m.reply('❌ Format: .addchangelog <teks>\n\nContoh: .addchangelog "Perbaikan bug download Instagram"');

  // Pastikan changelog adalah array
  if (!Array.isArray(global.db.data.settings[botNumber].changelog)) {
    global.db.data.settings[botNumber].changelog = [];
  }

  const changelog = global.db.data.settings[botNumber].changelog;

  // Tambahkan changelog baru di awal array
  changelog.unshift(text);

  // Potong hanya 5 item terbaru
  if (changelog.length > 5) {
    changelog.splice(5);
  }

  m.reply('✅ Changelog berhasil ditambahkan!');
}
break;


default:



  if (budy.startsWith(">")) {
    try {
      if (!isCreator) return m.reply('lu bukan owner')
        let evaled = await eval(budy.slice(1));
      if (typeof evaled !== "string") {
        evaled = util.inspect(evaled);
      }
      await m.reply(evaled);
    } catch (err) {
      await m.reply(String(err));
    }
  }

  if (budy.startsWith('$')) {
    if (!isCreator) return 
      exec(budy.slice(2), (err, stdout) => {
        if(err) return m.reply(err)
          if (stdout) return m.reply(stdout)
        })
  }

  if (budy.match(tiktokRegex) && !isCmd) {
    if (isBanspam) return m.reply(mess.spam);
    if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
    const urls = budy.match(tiktokRegex);
    const tiktokUrl = urls[0];
    await handleTiktokLink(tiktokUrl)
  } else if (budy.match(instagramRegex) && !isCmd) {
    if (isBanspam) return m.reply(mess.spam);
    if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
    await handleInstagramLink(budy)
  } else if (budy.match(twitterRegex) && !isCmd) {
    if (isBanspam) return m.reply(mess.spam);
    if (!isPremium && user.limit < 1) return m.reply(mess.endLimit);
    await handleTwitterxLink(budy)
  }

  if (m.chat.endsWith('@s.whatsapp.net') && !isCmd) {
// Pertama: Cek apakah ada sesi anonconfess (dengan state CHATTING)
    let confessSession = Object.values(db.data.anonconfess).find(session => 
     [session.a, session.b].includes(m.sender) && session.state === 'CHATTING'
     );
    if (confessSession) {
// Jangan meneruskan pesan jika merupakan perintah khusus untuk anonconfess
     if (/^(setuju|no|exit|keluar)$/i.test(m.text)) return;
     let partner = (confessSession.a === m.sender) ? confessSession.b : confessSession.a;
     m.copyNForward(partner, true, m.quoted && m.quoted.fromMe ? {
      contextInfo: {
       ...m.msg.contextInfo,
       forwardingScore: 0,
       isForwarded: true,
       participant: partner
     }
   } : {});
     return !0;
   }
 }

}
} catch (err) {
  delete enhance[m.sender];
  rebot.sendText(`6289692509996@s.whatsapp.net`, util.format(err), m);
  await rebot.sendMessErr(m.chat, mess.err, m.key, m);
}
}

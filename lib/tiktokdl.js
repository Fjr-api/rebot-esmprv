import axios from "axios";
import * as cheerio from "cheerio";

const getRequest = (url) =>
new Promise((resolve, reject) => {
  axios
  .get("https://musicaldown.com/en", {
    headers: {
      "User-Agent":
      "Mozilla/7.0 (iPhone; CPU iPhone OS 18_7; iPhone 15 Pro Max) AppleWebKit/533.2 (KHTML, like Gecko) CriOS/432.0.8702.51 Mobile/15E148 Safari/804.17",
    },
  })
  .then((data) => {
    const cookie =
    data.headers["set-cookie"][0].split(";")[0] + "; " + "lang=en";
    const $ = (0, cheerio.load)(data.data);
    const request = {
      [$(
        "body > div.welcome.section.center > div.container > div.row > div.col.s12 > form#submit-form > div.row > div.input-field.col.s12.l10.m9.inputbg > input:nth-child(1)"
        ).attr("name")]: url,
      [$(
        "body > div.welcome.section.center > div.container > div.row > div.col.s12 > form#submit-form > div.row > div.input-field.col.s12.l10.m9.inputbg  > input:nth-child(2)"
        ).attr("name")]: $(
        "body > div.welcome.section.center > div.container > div.row > div.col.s12 > form#submit-form > div.row > div.input-field.col.s12.l10.m9.inputbg  > input:nth-child(2)"
        ).attr("value"),
        [$(
          "body > div.welcome.section.center > div.container > div.row > div.col.s12 > form#submit-form > div.row > div.input-field.col.s12.l10.m9.inputbg  > input:nth-child(3)"
          ).attr("name")]: $(
          "body > div.welcome.section.center > div.container > div.row > div.col.s12 > form#submit-form > div.row > div.input-field.col.s12.l10.m9.inputbg  > input:nth-child(3)"
          ).attr("value"),
        };
        resolve({ status: "success", request, cookie });
      })
  .catch((e) => resolve({ status: "error", message: e }));
});

const getMusic = (cookie) =>
new Promise((resolve, reject) => {
  axios
  .get("https://musicaldown.com/mp3/download", {
    headers: {
      cookie: cookie,
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
      "Mozilla/7.0 (iPhone; CPU iPhone OS 18_7; iPhone 15 Pro Max) AppleWebKit/533.2 (KHTML, like Gecko) CriOS/432.0.8702.51 Mobile/15E148 Safari/804.17",
    },
  })
  .then(({ data }) => {
    const $ = (0, cheerio.load)(data);
    resolve($("audio > source").attr("src"));
  })
  .catch((e) => resolve({ status: "error", message: e.message }));
});

const MusicalDown = (url) =>
new Promise(async (resolve, reject) => {
  const request = await getRequest(url);
  if (request.status !== "success")
    return resolve({ status: "error", message: request.message });
  (0, axios.default)("https://musicaldown.com/download", {
    method: "POST",
    headers: {
      cookie: request.cookie,
      Referer: "https://musicaldown.com/en",
      "Upgrade-Insecure-Requests": "1",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
      "Mozilla/7.0 (iPhone; CPU iPhone OS 18_7; iPhone 15 Pro Max) AppleWebKit/533.2 (KHTML, like Gecko) CriOS/432.0.8702.51 Mobile/15E148 Safari/804.17",
    },
    data: request.request,
  })
  .then(async ({ data }) => {
    const $ = (0, cheerio.load)(data);
    const images = [];
    $("div.row > div.col.s12 > div.row > div[class='col s12 m3']")
    .get()
    .map((v) => {
      images.push($(v).find("img").attr("src"));
    });
    let i = 1;
    let videos = {};
    $("div[class='col s12 l4 center-align'] > a")
    .get()
    .map((v) => {
      if ($(v).attr("href") !== "#modal2") {
        let text = $(v)
        .text()
        .trim()
        .replace(/\s/, " ")
        .replace("arrow_downward", "")
        .toLowerCase();
        videos[
        text.includes("hd")
        ? "video_hd"
        : text.includes("watermark")
        ? "video_watermark"
        : `video${i}`
      ] = $(v).attr("href");
      i++;
    }
  });
    if (images.length !== 0) {
      resolve({
        status: "success",
        result: {
          type: "image",
          author: {
            nickname: $("h2.white-text")
            .text()
            .trim()
            .replace("Download Now: Check out ", "")
            .replace(
              "’s video! #TikTok >If MusicallyDown has helped you, you can help us too",
              ""
              )
            .replace("Download Now: ", "")
            .replace(
              "If MusicallyDown has helped you, you can help us too",
              ""
              ),
          },
          images,
          music: $("a.download").attr("href"),
        },
      });
    } else {
      const music = await getMusic(request.cookie);
      resolve({
        status: "success",
        result: {
          type: "video",
          author: {
            avatar: $("div.img-area > img").attr("src"),
            nickname: $(
              "div.row > div > div > div > h2.video-author.white-text > b"
              )
            .map((_, el) => $(el).text())
            .get(0),
          },
          desc: $("div.row > div > div > div > p.video-desc.white-text")
          .map((_, el) => $(el).text())
          .get(0),
          ...videos,
          music,
        },
      });
    }
  })
  .catch((e) => resolve({ status: "error", message: e.message }));
});
export { MusicalDown };
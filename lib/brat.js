// *~ ZErvvida*
// Brat emoji iPhone. (Nodejs - ESM)

// install font dulu:
// $ curl --progress-bar -L "https://github.com/samuelngs/apple-emoji-linux/releases/latest/download/AppleColorEmoji.ttf" -o AppleColorEmoji.ttf

import { createCanvas as _createCanvas, registerFont } from 'canvas';
import { Jimp } from 'jimp';


// registerFont("./lib/AppleColorEmoji.ttf", { family: "AppleFont" });

let createCanvas = (w, h) => {
  const cvs = document.createElement('canvas');
  cvs.width = w;
  cvs.height = h;
  document.body.appendChild(cvs);
  return cvs;
};

createCanvas = _createCanvas;

let cvs = typeof window !== 'undefined' ? createCanvas(512, 512) : null;
let ctx = cvs ? cvs.getContext('2d') : null;

export async function makeBrat(obj) {
  let width = 512;
  let height = 512;
  let margin = 20;
  let wordSpacing = 25;

  if (typeof window === 'undefined') {
    // jika nodejs maka setiap permintaan canvas dibuat ulang
    cvs = createCanvas(width, height);
    ctx = cvs.getContext('2d');
  }

  let data = obj.data || [{
    text: (typeof obj === 'string' ? obj : ''),
    color: 'black'
  }];

  let datas = [];
  let teks = '';

  data.forEach((e) => {
    teks += (e.text || '') + ' ';
    if (e.text) {
      e.text.split(' ').forEach(() => {
        datas.push(e.color || 'black');
      });
    }
  });

  teks = teks.trim();

  if (!Jimp) {
    ctx.filter = `blur(${obj.blur ?? 3}px)`; // jika nodejs maka blur pake jimp
  }

  ctx.fillStyle = colorize(ctx, width, obj.background) || 'white';
  ctx.fillRect(0, 0, width, height);

  let fontSize = 150;
  let lineHeightMultiplier = 1.3;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.textDrawingMode = "glyph";

  let words = teks.split(' ');
  let lines = [];

  const rebuildLines = () => {
    lines = [];
    let currentLine = '';
    for (let word of words) {
      if (ctx.measureText(word).width > width - 2 * margin) {
        fontSize -= 2;
        ctx.font = `${fontSize}px AppleFont`;
        return rebuildLines();
      }
      let testLine = currentLine ? `${currentLine} ${word}` : word;
      let lineWidth =
      ctx.measureText(testLine).width + (currentLine.split(' ').length - 1) * wordSpacing;
      if (lineWidth < width - 2 * margin) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  };

  ctx.font = `${fontSize}px AppleFont`;
  rebuildLines();

  while (lines.length * fontSize * lineHeightMultiplier > height - 2 * margin) {
    fontSize -= 2;
    ctx.font = `${fontSize}px AppleFont`;
    rebuildLines();
  }

  let lineHeight = fontSize * lineHeightMultiplier;
  let y = margin;
  let i = 0;

  for (let line of lines) {
    let wordsInLine = line.split(' ');
    let x = margin;
    let space = (width - 2 * x - ctx.measureText(wordsInLine.join('')).width) / (wordsInLine.length - 1);

    for (let word of wordsInLine) {
      ctx.fillStyle = colorize(ctx, ctx.measureText(word).width, datas[i]);
      ctx.fillText(word, x, y);
      x += ctx.measureText(word).width + space;
      i++;
    }
    y += lineHeight;
  }

  if (Jimp) {
    // jimp akan memiliki nilai jika di nodejs
    let buffer = cvs.toBuffer('image/png');
    let image = await Jimp.read(buffer);
    image.blur(obj.blur ?? 3);
    let blurredBuffer = await image.getBuffer("image/png");
    return blurredBuffer;
  }

  if (cvs) {
    cvs.onclick = () => {
      new FileReader().readAsArrayBuffer('hai');
    };
  }
}

export function colorize(ctx, width, colors) {
  if (Array.isArray(colors)) {
    let gradient = ctx.createLinearGradient(0, 0, width, 0);
    let step = 1 / (colors.length - 1);
    colors.forEach((color, index) => {
      gradient.addColorStop(index * step, color);
    });
    return gradient;
  } else {
    return colors;
  }
}

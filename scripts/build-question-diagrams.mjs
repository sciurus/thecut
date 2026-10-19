import { readFile, writeFile } from "node:fs/promises";
const diagrams = {
  currentLength: [
    ["buzz-cut", "Buzzed"],
    ["crew-cut", "Short"],
    ["curtains", "Medium"],
    ["bro-flow", "Long"],
  ],
  preferredLength: [
    ["buzz-cut", "Very short"],
    ["crew-cut", "Short"],
    ["curtains", "Medium"],
    ["bro-flow", "Long"],
  ],
  texture: [
    ["classic-side-part", "Straight"],
    ["surfer-hair", "Wavy"],
    ["curly-top-with-taper", "Curly"],
    ["short-afro", "Coily"],
  ],
  willingToGrow: [
    ["buzz-cut", "A cut for now"],
    ["bro-flow", "A look to grow toward"],
  ],
  stylingEffort: [
    ["crew-cut", "Wash and go"],
    ["textured-crop", "A little styling"],
    ["pompadour", "More styling"],
  ],
  overallLook: [
    ["classic-side-part", "Neat"],
    ["shag", "Relaxed"],
    ["mohawk", "Bold"],
  ],
  sidesPreference: [
    ["layered-scissor-cut", "Fuller"],
    ["ivy-league", "Tapered"],
    ["high-and-tight", "Faded"],
  ],
  frontPreference: [
    ["textured-fringe", "Forward"],
    ["slick-back-reviewed", "Up or back"],
    ["curtains", "Parted"],
  ],
};
for (const [question, items] of Object.entries(diagrams)) {
  const four = items.length === 4;
  const columns = four ? 2 : items.length;
  const cell = 640 / columns;
  const rowHeight = four ? 320 : cell + 60;
  const height = four ? 640 : rowHeight;
  let body = "";
  for (let i = 0; i < items.length; i++) {
    const [id, label] = items[i];
    const data = await readFile(`public/illustrations/${id}.webp`);
    const x = (i % columns) * cell;
    const y = Math.floor(i / columns) * rowHeight;
    const size = four ? 270 : cell - 12;
    const left = x + (cell - size) / 2;
    body += `<image x="${left}" y="${y + 5}" width="${size}" height="${size}" href="data:image/webp;base64,${data.toString("base64")}"/><text x="${x + cell / 2}" y="${y + size + 35}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="${four ? 24 : 20}" font-weight="700" fill="#305e50">${label}</text>`;
  }
  await writeFile(
    `public/illustrations/question-${question}-diagram.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="${height}" viewBox="0 0 640 ${height}">${body}</svg>`,
  );
}
console.log("Built eight labelled diagrams using local generated portraits.");

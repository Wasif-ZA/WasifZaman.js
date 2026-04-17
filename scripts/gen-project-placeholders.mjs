import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const W = 1200;
const H = 800;
const COLORS = {
  primary: "#CEFF1A",
  secondary: "#FF00FF",
  accent: "#0000FF",
  bg: "#FAF9F6",
  black: "#000000",
};

const projects = [
  { slug: "korvo", title: "KORVO", kicker: "AI OUTREACH", accent: "primary", shape: "circle-triangle" },
  { slug: "autodocs", title: "AUTODOCS", kicker: "AST → LLM", accent: "accent", shape: "square-grid" },
  { slug: "bridge-opening", title: "BRIDGE", kicker: "IOT CONTROL", accent: "secondary", shape: "triangle-bar" },
  { slug: "blade-runner", title: "BLADE\\nRUNNER", kicker: "CARRIAGE CTRL", accent: "primary", shape: "diagonals" },
  { slug: "decision-log", title: "DECISION\\nLOG", kicker: "ADR TOOL", accent: "accent", shape: "stacked-squares" },
  { slug: "utsbdsoc-election", title: "ELECTION\\nSYSTEM", kicker: "PRIVATE BUILD", accent: "secondary", shape: "padlock" },
  { slug: "utsbdsoc-events", title: "EVENT\\nDASH", kicker: "PRIVATE BUILD", accent: "primary", shape: "calendar" },
  { slug: "scms", title: "SCMS", kicker: "CAMPUS SOC", accent: "secondary", shape: "circle-bar" },
  { slug: "refillable", title: "REFILLABLE", kicker: "RFID CUPS", accent: "accent", shape: "cup" },
];

function shapeMarkup(shape, fill) {
  switch (shape) {
    case "circle-triangle":
      return `
        <circle cx="900" cy="260" r="170" fill="${fill}" stroke="#000" stroke-width="6"/>
        <polygon points="130,650 320,650 225,490" fill="#000"/>
      `;
    case "square-grid":
      return `
        <rect x="830" y="130" width="260" height="260" fill="${fill}" stroke="#000" stroke-width="6"/>
        <rect x="870" y="170" width="180" height="180" fill="none" stroke="#000" stroke-width="4" stroke-dasharray="12 8"/>
        <rect x="100" y="560" width="200" height="120" fill="#000"/>
      `;
    case "triangle-bar":
      return `
        <polygon points="820,120 1090,120 955,340" fill="${fill}" stroke="#000" stroke-width="6"/>
        <rect x="140" y="580" width="420" height="60" fill="#000"/>
        <rect x="140" y="650" width="260" height="20" fill="${fill}" stroke="#000" stroke-width="3"/>
      `;
    case "diagonals":
      return `
        <polygon points="820,120 1090,120 1090,380 820,380" fill="${fill}" stroke="#000" stroke-width="6"/>
        <line x1="820" y1="120" x2="1090" y2="380" stroke="#000" stroke-width="8"/>
        <line x1="820" y1="380" x2="1090" y2="120" stroke="#000" stroke-width="8"/>
        <rect x="120" y="580" width="260" height="80" fill="#000"/>
      `;
    case "stacked-squares":
      return `
        <rect x="820" y="120" width="180" height="180" fill="${fill}" stroke="#000" stroke-width="6"/>
        <rect x="880" y="200" width="180" height="180" fill="#000"/>
        <rect x="940" y="280" width="180" height="180" fill="${fill}" stroke="#000" stroke-width="6"/>
      `;
    case "padlock":
      return `
        <rect x="830" y="230" width="260" height="220" fill="${fill}" stroke="#000" stroke-width="6"/>
        <path d="M 890 230 V 170 a 70 70 0 0 1 140 0 V 230" fill="none" stroke="#000" stroke-width="12"/>
        <circle cx="960" cy="340" r="22" fill="#000"/>
      `;
    case "calendar":
      return `
        <rect x="820" y="140" width="280" height="260" fill="${fill}" stroke="#000" stroke-width="6"/>
        <rect x="820" y="140" width="280" height="50" fill="#000"/>
        <line x1="880" y1="130" x2="880" y2="180" stroke="#000" stroke-width="8"/>
        <line x1="1040" y1="130" x2="1040" y2="180" stroke="#000" stroke-width="8"/>
        <line x1="820" y1="250" x2="1100" y2="250" stroke="#000" stroke-width="3"/>
        <line x1="820" y1="310" x2="1100" y2="310" stroke="#000" stroke-width="3"/>
        <line x1="890" y1="190" x2="890" y2="400" stroke="#000" stroke-width="3"/>
        <line x1="960" y1="190" x2="960" y2="400" stroke="#000" stroke-width="3"/>
        <line x1="1030" y1="190" x2="1030" y2="400" stroke="#000" stroke-width="3"/>
      `;
    case "circle-bar":
      return `
        <circle cx="960" cy="250" r="140" fill="${fill}" stroke="#000" stroke-width="6"/>
        <rect x="120" y="580" width="380" height="90" fill="#000"/>
      `;
    case "cup":
      return `
        <rect x="850" y="180" width="220" height="240" fill="${fill}" stroke="#000" stroke-width="6"/>
        <path d="M 1070 240 h 50 a 40 40 0 0 1 0 80 h -50" fill="none" stroke="#000" stroke-width="6"/>
        <rect x="870" y="200" width="180" height="30" fill="#000"/>
      `;
    default:
      return `<circle cx="900" cy="280" r="160" fill="${fill}" stroke="#000" stroke-width="6"/>`;
  }
}

function svgFor({ title, kicker, accent, shape }) {
  const fill = COLORS[accent] ?? COLORS.primary;
  const lines = title.split("\\n");
  const isTwoLine = lines.length > 1;
  const titleMarkup = isTwoLine
    ? lines
        .map(
          (line, i) =>
            `<text x="80" y="${300 + i * 160}" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="900" font-size="170" fill="#000" letter-spacing="-6">${line}</text>`
        )
        .join("")
    : `<text x="80" y="380" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="900" font-size="180" fill="#000" letter-spacing="-6">${lines[0]}</text>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${COLORS.bg}"/>
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" fill="none" stroke="#000" stroke-width="8"/>
  <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1.5" fill="#000" opacity="0.35"/>
  </pattern>
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" fill="url(#dots)" opacity="0.5"/>
  ${shapeMarkup(shape, fill)}
  <rect x="60" y="90" width="380" height="60" fill="#000"/>
  <text x="80" y="133" font-family="Courier New, monospace" font-weight="700" font-size="28" fill="${fill}" letter-spacing="2">${kicker}</text>
  ${titleMarkup}
  <rect x="80" y="700" width="140" height="40" fill="${fill}" stroke="#000" stroke-width="4"/>
  <text x="96" y="728" font-family="Courier New, monospace" font-weight="700" font-size="20" fill="#000">WZ.</text>
</svg>
`;
}

const outDir = resolve(process.cwd(), "website/project/public/projects");

for (const p of projects) {
  const svg = svgFor(p);
  const path = resolve(outDir, `${p.slug}.svg`);
  await writeFile(path, svg, "utf8");
  console.log("wrote", path);
}

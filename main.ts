import { writeFileSync, mkdirSync } from "node:fs";

// The one line an AI agent prints the moment it breaks production:
// a brutally honest postmortem excuse, 85 characters.
const LINE =
  "Production is down because I 'fixed' a typo in the config. The typo was load-bearing.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// a single unpadded line with no line breaks at all, not only white space.
// Fail loudly otherwise — an invalid entry is never judged and takes no prize.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.includes("\n") ||
  LINE.includes("\r") ||
  LINE.trim() !== LINE
) {
  throw new Error("entry line fails the 1-200 char single-line gate");
}

writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const dataPath = path.join(
  projectRoot,
  'components/experiments/kinetic-title/kinetic-title-paths.json',
);
const outputDirectory = path.join(projectRoot, 'tests/visual/kinetic-title');
const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));

const escapeAttribute = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

const numberPattern = /-?\d+(?:\.\d+)?/g;

const interpolatePath = (start, end, progress) => {
  const startNumbers = [...start.matchAll(numberPattern)].map((match) => Number(match[0]));
  let numberIndex = 0;
  return end.replace(numberPattern, (value) => {
    const interpolated = startNumbers[numberIndex] + (Number(value) - startNumbers[numberIndex]) * progress;
    numberIndex += 1;
    return interpolated.toFixed(2);
  });
};

const renderWord = (word, state, baseline, alignment, outlined) => {
  const scale = Math.min(0.36, 1240 / word.width);
  const paddedWidth = word.width * 1.16;
  const renderedWidth = paddedWidth * scale;
  const x = alignment === 'end' ? 1320 - renderedWidth : (1320 - renderedWidth) / 2;
  const paths = word.glyphs
    .map((glyph) => {
      const pathData = Array.isArray(state)
        ? interpolatePath(glyph.states[state[0]], glyph.states[state[1]], state[2])
        : glyph.states[state];
      return `<path d="${escapeAttribute(pathData)}"/>`;
    })
    .join('');

  return `
    <g transform="translate(${x + word.width * 0.08 * scale} ${baseline}) scale(${scale})"
      fill="${outlined ? 'none' : '#f4eee3'}"
      stroke="${outlined ? '#f4eee3' : 'none'}"
      stroke-width="${outlined ? 5.5 : 0}"
      stroke-linejoin="round"
      fill-rule="nonzero">
      ${paths}
    </g>`;
};

await fs.mkdir(outputDirectory, { recursive: true });

for (let state = 0; state < 4; state += 1) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
      <rect width="1400" height="900" fill="#0d0c0a"/>
      ${renderWord(data.words.SOFTWARE, state, 330, 'start', false)}
      ${renderWord(data.words.ENGINEER, state, 730, 'end', true)}
    </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(outputDirectory, `state-${state}.png`));
}

for (const [from, to] of [[0, 1], [1, 2], [2, 3], [3, 0]]) {
  const state = [from, to, 0.5];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
      <rect width="1400" height="900" fill="#0d0c0a"/>
      ${renderWord(data.words.SOFTWARE, state, 330, 'start', false)}
      ${renderWord(data.words.ENGINEER, state, 730, 'end', true)}
    </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(outputDirectory, `transition-${from}-${to}-50.png`));
}

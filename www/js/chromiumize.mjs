const CHROMIUM_COLOR_START = [0x42, 0x85, 0xF4];
const CHROMIUM_COLOR_END = [0xFF, 0xFF, 0xFF];

export default imageData => {
  toGrayscale(imageData);
  grayscaleToChromium(imageData);
};

function toGrayscale(imageData) {
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const [r, g, b] = [d[i], d[i + 1], d[i + 2]];

    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    d[i] = d[i + 1] = d[i + 2] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // Alternate: 0.299/0.587/0.114 from http://netpbm.sourceforge.net/doc/ppmtopgm.html
  }
}

function grayscaleToChromium(imageData) {
  const [startR, startB, startG] = CHROMIUM_COLOR_START;
  const [endR, endB, endG] = CHROMIUM_COLOR_END;

  const d = imageData.data;
  // TODO clean this up into a single loop? Or would that be too "clever" / hard to read?
  for (let i = 0; i < d.length; i += 4) {
    const [r, g, b] = [d[i], d[i + 1], d[i + 2]];

    d[i] = chromiumInterpolate(r, 0);
    d[i + 1] = chromiumInterpolate(g, 1);
    d[i + 2] = chromiumInterpolate(b, 2);
  }
}

function chromiumInterpolate(grayscaleColorComponent, index) { // index = 0, 1, 2 => R, G, B
  return CHROMIUM_COLOR_START[index] + grayscaleColorComponent / 0xFF * (CHROMIUM_COLOR_END[index] - CHROMIUM_COLOR_START[index]);
}

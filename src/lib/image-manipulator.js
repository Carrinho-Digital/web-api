const jimp = require('jimp');

const WIDTH_PX = 250;

async function manipule(buffer) {
  const jimpFile = await jimp.read(Buffer.from(buffer, 'base64'));

  jimpFile.resize(WIDTH_PX, jimp.AUTO);

  return jimpFile.getBufferAsync(jimp.AUTO);
}

module.exports = {
  manipule,
};


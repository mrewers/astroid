import fs from 'fs';

import { ImagePool } from '@squoosh/lib';

const RAW_IMAGES_FOLDER = './public/static/raw/';
const CONVERTED_IMAGES_FOLDER = './public/static/';

const outputPath = (filename,type) => `${CONVERTED_IMAGES_FOLDER}${type}/${filename}.${type}`;

const writeImageFile = (binary, filename, type) => fs.writeFileSync(
  outputPath(filename, type),
  binary
);

const convertImage = async (inputFilename, outputFilename) => {
  const inputPath = `${RAW_IMAGES_FOLDER}${inputFilename}`;

  console.time('convertImage');
  const imagePool = new ImagePool();
  const image = imagePool.ingestImage(inputPath);

  await image.decoded; // Wait until the image is decoded before running preprocessor
  console.info('\nImage Decoding Complete');

  // Pre-process
  const preprocessOptions = {
    resize: {
      enabled: true,
      width: 500,
    }
  };

  await image.preprocess(preprocessOptions);
  console.info('Image Pre-Processing Complete');

  // Encode
  const encodeOptions = {
    mozjpeg: {
      quality: 85,
    },
    webp: {}
  };

  await image.encode(encodeOptions);
  console.info('Image Encoding Complete');

  const rawEncodedJPG = (await image.encodedWith.mozjpeg).binary;
  const rawEncodedWebP = (await image.encodedWith.webp).binary;

  await writeImageFile(rawEncodedJPG, outputFilename, 'jpg');
  await writeImageFile(rawEncodedWebP, outputFilename, 'webp');
  console.info('Image Conversion Complete');

  await imagePool.close();
  console.info('Image Pool Closed');
  console.timeEnd('convertImage');
}

(async () => {
  await convertImage('morse.jpg', 'morse');
})();
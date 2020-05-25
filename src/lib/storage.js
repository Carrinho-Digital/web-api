const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const { Storage } = require('@google-cloud/storage');

const BUCKET_NAME = process.env.BUCKET_NAME;

function createStorage() {
  return new Storage({
    projectId: 'carrinhodigital',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
}

function normalizePath(path = '') {
  const trimPath = path.trim();
  const pathLength = trimPath.length;
  const pathLastChar = trimPath[pathLength - 1];

  if (pathLastChar === '/') {
    return trimPath.slice(0, pathLength);
  }

  return trimPath;
}

function upload(fullname, file, path) {
  const buildFileURL = name => `https://storage.googleapis.com/${BUCKET_NAME}/${name}`;

  const storage = createStorage();
  const type = mime.lookup(fullname);

  const pathNormalized = normalizePath(path);

  const bucket = storage.bucket(BUCKET_NAME);
  const blob = bucket
    .file(`${pathNormalized}/${uuid()}.${mime.extensions[type][0]}`);

  const stream = blob.createWriteStream({
    resumable: true,
    contentType: type,
    predefinedAcl: 'publicRead',
  });

  return new Promise((resolve, reject) => {
    stream.on('error', err => reject(err));
    stream.on('finish', () => resolve(buildFileURL(blob.name)));
    stream.end(file);
  });
}

function normalizeImageName(imageURL) {
  const urlPaths = imageURL.split('/');
  const imageName = urlPaths[urlPaths.length - 1];

  return imageName;
}

async function remove(path) {
  const storage = createStorage();
  const bucket = storage.bucket(BUCKET_NAME);

  try {
    const [objectExists] = await bucket.file(path).exists();

    if (objectExists) {
      return bucket.file(path).delete();
    }

    return null;
  } catch (exception) {
    return null;
  }
}

module.exports = {
  upload,
  remove,
  normalizeImageName,
};

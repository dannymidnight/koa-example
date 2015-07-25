import fs from 'fs';
import path from 'path';

let manifest = {};

try {
  manifest = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../dist/manifest.json'), 'utf8')
  );
} catch (e) {
  throw new Error('Missing manifest file');
}

function resolvePath (file) {
  let manifestPath = manifest[file];

  if (manifestPath) {
    let hash = manifestPath.match(/(\w+)\./, '')[1];

    if (process.NODE_ENV !== 'production') {
      return `${file}?${hash}`;
    } else {
      return manifestPath;
    }
  } else {
    throw new Error(`Missing file ${file}`);
  }
}

export default function *(next) {
  this.state = Object.assign({}, this.state, {
    asset: resolvePath
  });

  this.asset = resolvePath;

  yield next;
}

import { readFileSync, writeFileSync } from 'node:fs';
import { sign } from 'node:crypto';

const statusData = {
  status: "active",
  timestamp: Date.now(),
}

const payload = JSON.stringify(statusData, null, 0);

const [signature, uniSignature] = [process.env.APP_PRIVATE_KEY_PATH, process.env.UNI_PRIVATE_KEY_PATH].map(path =>
  sign(null, Buffer.from(payload), readFileSync(path, 'utf8'))
  .toString('base64')
);

const signedStatus = {
  ...statusData,
  signature,
  uniSignature,
}

writeFileSync('status.json', JSON.stringify(signedStatus, null, 2));

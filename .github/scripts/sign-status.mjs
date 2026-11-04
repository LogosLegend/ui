import { readFileSync, writeFileSync } from 'node:fs';
import { sign } from 'node:crypto';

const baseData = {
  status: "active",
  timestamp: Date.now(),
}

const extendedData = {
  ...baseData,
  discord: false,
  seven: false
}

const basePayload = JSON.stringify(baseData, null, 0);
const extendedPayload = JSON.stringify(extendedData, null, 0);

const signature = sign(null, Buffer.from(basePayload), readFileSync(process.env.APP_PRIVATE_KEY_PATH, 'utf8')).toString('base64');
const uniSignature = sign(null, Buffer.from(extendedPayload), readFileSync(process.env.UNI_PRIVATE_KEY_PATH, 'utf8')).toString('base64');

const signedStatus = {
  ...extendedData,
  signature,
  uniSignature,
}

writeFileSync('status.json', JSON.stringify(signedStatus, null, 2));

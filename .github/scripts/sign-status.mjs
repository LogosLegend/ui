import { readFileSync, writeFileSync } from 'node:fs';
import { sign } from 'node:crypto';

const PRIVATE_KEY = readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');

const statusData = {
  status: "active",
  timestamp: Date.now(),
}

const payload = JSON.stringify(statusData, null, 0);
const signature = sign(null, Buffer.from(payload), PRIVATE_KEY).toString('base64');

const signedStatus = {
  ...statusData,
  signature
}

writeFileSync('status.json', JSON.stringify(signedStatus, null, 2));

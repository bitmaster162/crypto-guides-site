import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicDir = join(root, 'public');
await mkdir(publicDir, { recursive: true });

function gitHead() {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const sha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || gitHead();
if (!/^[0-9a-f]{40}$/i.test(sha)) throw new Error(`Unable to resolve exact 40-char source SHA: ${sha || '<empty>'}`);

const provider = process.env.VERCEL ? 'vercel' : process.env.GITHUB_ACTIONS ? 'github-actions' : 'local';
const ref = process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_REF_NAME || 'local';
const receipt = {
  schema: 'crypto-guides.public-build.v1',
  sha,
  shortSha: sha.slice(0, 9),
  provider,
  ref,
  sourceRepo: 'bitmaster162/crypto-guides-site'
};

await writeFile(join(publicDir, 'version.json'), `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(`BUILD_META_GENERATION=PASS sha=${sha} provider=${provider} ref=${ref}`);

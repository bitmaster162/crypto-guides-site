import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const pins = Object.freeze({
 'src/pages/guides/counter-trading-and-signing-chain-safety.md':'da36f63e1ab0226a2ff762ce9e41e62613bb4bd11f7548fd9c79df38c337ea49',
 'src/pages/en/guides/counter-trading-and-signing-chain-safety.md':'bda6f81686d8448075d3ae5763c18c262c4f72433e4a01f25e496e1917b84674'
});
const sha=x=>createHash('sha256').update(x.replace(/\r\n/g,'\n')).digest('hex');
export function isExactGuide5Successor(inputs={}) {
 try {
  for(const [path,pin] of Object.entries(pins)){
   const source=inputs[path]??readFileSync(new URL('../'+path,import.meta.url),'utf8');
   if(sha(source)!==pin || !source.includes('reviewed: "2026-10-27"') ||
      !source.includes('next_review: "2027-01-27"')) return false;
  }
  return true;
 }catch{return false;}
}

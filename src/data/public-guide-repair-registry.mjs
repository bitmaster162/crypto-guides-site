import { publicGuideRepairs } from './public-guide-repairs.mjs';
import { btcFuturesRepairs } from './public-guide-repairs-btc-futures.mjs';

export const allPublicGuideRepairs = [
  ...publicGuideRepairs,
  ...btcFuturesRepairs
];

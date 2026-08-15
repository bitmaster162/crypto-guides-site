import { publicGuideRepairs } from './public-guide-repairs.mjs';
import { btcFuturesRepairs } from './public-guide-repairs-btc-futures.mjs';
import { riskFrameworkRepairs } from './public-guide-repairs-risk-framework.mjs';

export const allPublicGuideRepairs = [
  ...publicGuideRepairs,
  ...btcFuturesRepairs,
  ...riskFrameworkRepairs
];

import { publicGuideRepairs } from './public-guide-repairs.mjs';
import { btcFuturesRepairs } from './public-guide-repairs-btc-futures.mjs';
import { riskFrameworkRepairs } from './public-guide-repairs-risk-framework.mjs';
import { anthropicVendorRepairs } from './public-guide-repairs-anthropic.mjs';
import { frontierVendorRepairs } from './public-guide-repairs-frontier-routing.mjs';
import { infrastructureRepairs } from './public-guide-repairs-infrastructure.mjs';

export const allPublicGuideRepairs = [
  ...publicGuideRepairs,
  ...btcFuturesRepairs,
  ...riskFrameworkRepairs,
  ...anthropicVendorRepairs,
  ...frontierVendorRepairs,
  ...infrastructureRepairs
];

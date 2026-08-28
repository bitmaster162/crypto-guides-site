import { publicGuideRepairs } from './public-guide-repairs.mjs';
import { btcFuturesRepairs } from './public-guide-repairs-btc-futures.mjs';
import { riskFrameworkRepairs } from './public-guide-repairs-risk-framework.mjs';
import { anthropicVendorRepairs } from './public-guide-repairs-anthropic.mjs';
import { frontierVendorRepairs } from './public-guide-repairs-frontier-routing.mjs';
import { infrastructureRepairs } from './public-guide-repairs-infrastructure.mjs';
import { strategyFailureRepairs } from './public-guide-repairs-strategy-failure.mjs';
import { securityRepairs } from './public-guide-repairs-security.mjs';
import { hyperliquidInfrastructureRepairs } from './public-guide-repairs-hyperliquid.mjs';
import { pythonRtInfrastructureRepairs } from './public-guide-repairs-python-rt.mjs';
import { regimeTimingTradingRepairs } from './public-guide-repairs-regime-timing.mjs';
import { marketNeutralRepairs } from './public-guide-repairs-market-neutral.mjs';

export const allPublicGuideRepairs = [
  ...publicGuideRepairs,
  ...btcFuturesRepairs,
  ...riskFrameworkRepairs,
  ...anthropicVendorRepairs,
  ...frontierVendorRepairs,
  ...infrastructureRepairs,
  ...strategyFailureRepairs,
  ...securityRepairs,
  ...hyperliquidInfrastructureRepairs,
  ...pythonRtInfrastructureRepairs,
  ...regimeTimingTradingRepairs,
  ...marketNeutralRepairs
];

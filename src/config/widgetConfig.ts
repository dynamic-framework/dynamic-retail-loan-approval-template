import liquidParser from '../utils/liquidParser';

export const SITE_URL = liquidParser.parse('{{site.url}}');
export const SITE_LANG = liquidParser.parse('{{site.language}}');
export const USER_NAME = liquidParser.parse('{{user.first_name}}');

export const SITE_PATH = {
  DASHBOARD: liquidParser.parse('{{vars.path-dashboard}}'),
  EMPTY_ID: liquidParser.parse('{{vars.none-id-path}}'),
};

export const VARS_CURRENCY = {
  symbol: liquidParser.parse('{{vars.currency-symbol}}'),
  precision: Number(liquidParser.parse('{{vars.currency-precision}}')),
  separator: liquidParser.parse('{{vars.currency-separator}}'),
  decimal: liquidParser.parse('{{vars.currency-decimal}}'),
};

export type SitePath = keyof typeof SITE_PATH;

import { liquidParser } from '@dynamic-framework/ui-react';

export const SITE_URL = liquidParser.parse('{{site.url}}');

export const SITE_PATH = {
  DASHBOARD: liquidParser.parse('{{vars.path-dashboard}}'),
  EMPTY_ID: liquidParser.parse('{{vars.none-id-path}}'),
};

export type SitePath = keyof typeof SITE_PATH;

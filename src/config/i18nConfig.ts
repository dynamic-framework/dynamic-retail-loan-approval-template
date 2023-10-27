/* eslint-disable @typescript-eslint/no-floating-promises */
import { configureI18n } from '@dynamic-framework/ui-react';

import es from '../locales/es.json';
import en from '../locales/en.json';
import { SITE_LANG } from './widgetConfig';

const resources = {
  es: { translation: es },
  en: { translation: en },
};

configureI18n(resources, { lng: SITE_LANG });

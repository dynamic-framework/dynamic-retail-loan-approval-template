import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {
  DContextProvider,
  DModalContextProvider,
  DToastContainer,
} from '@dynamic-framework/ui-react';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ModalAccountSelector from './components/ModalAccountSelector';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import { VARS_CURRENCY, SITE_LANG } from './config/widgetConfig';

const root = ReactDOM.createRoot(document.getElementById('loanApprovalTemplate') as Element);
root.render(
  <React.StrictMode>
    <DContextProvider
      currency={VARS_CURRENCY}
      language={SITE_LANG}
    >
      <Provider store={store}>
        <DModalContextProvider
          portalName="portal"
          availableModals={{
            accountSelector: ModalAccountSelector,
          }}
        >
          <App />
          <DToastContainer />
        </DModalContextProvider>
      </Provider>
    </DContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

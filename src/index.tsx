import {
  DContextProvider,
  DToastContainer,
} from '@dynamic-framework/ui-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import ModalAccountSelector from './components/ModalAccountSelector';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('@dynamic-framework/ui-react/dist/css/dynamic-ui.css');
}

const root = ReactDOM.createRoot(document.getElementById('loanApprovalTemplate') as Element);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DContextProvider
        portalName="portal"
        availablePortals={{
          modalAccountSelector: ModalAccountSelector,
        }}
      >
        <App />
        <DToastContainer />
      </DContextProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

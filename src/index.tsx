import {
  DContextProvider,
  DToastContainer,
} from '@dynamic-framework/ui-react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import Confirm from './components/Confirm';
import store from './store/store';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';

const root = ReactDOM.createRoot(document.getElementById('loanApprovalTemplate') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <DContextProvider
        portalName="portal"
        availablePortals={{
          confirm: Confirm,
        }}
      >
        <App />
        <DToastContainer />
      </DContextProvider>
    </Provider>
  </StrictMode>,
);

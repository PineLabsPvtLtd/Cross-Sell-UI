import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';

import CssBaseline from '@material-ui/core/CssBaseline';

import Router from 'router';

ReactDOM.render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <CssBaseline />
      <Router />
    </I18nextProvider>
  </StrictMode>,
  document.getElementById('root')
);

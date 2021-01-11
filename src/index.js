import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Router from 'router';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
    MuiDialogContent: {
      root: {
        overflow: 'hidden',
      }
    },
    MuiDialog: {
      paper: {
        width: '500px',
        overflow: 'hidden',
      }
    }
  },
});

ReactDOM.render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>,
  document.getElementById('root')
);

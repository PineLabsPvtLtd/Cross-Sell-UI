import { StrictMode, createRef } from 'react';
import ReactDOM from 'react-dom';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { SnackbarProvider } from 'notistack';

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

// add action to all snackbars
const notistackRef = createRef();
const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key);
}

ReactDOM.render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        ref={notistackRef}
        action={(key) => (
            <Button color="secondary" size="small" onClick={onClickDismiss(key)}>
                'Dismiss'
            </Button>
        )}>
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>,
  document.getElementById('root')
);

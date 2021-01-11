import { Fragment } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';

import { ReactComponent as ConfirmImage } from './assets/confirm.svg';
import { ReactComponent as OTPImage } from './assets/otp.svg';

import { useTranslation } from 'react-i18next';

import useToggle from 'hooks/useToggle';

import OTPField from 'common/otpField';

export default function FormDialog({ dialogOpen, toggleDialog, amount, tenure, emi, interest }) {
    const { t } = useTranslation();

    const [isOTPPage, toggleOTPPage] = useToggle();
    const [slideInOTPImage, toggleSlideInOTPImage] = useToggle();

    function FormRow({type}) {
        let value;
        switch(type){
            case 'amount': value = amount; break;
            case 'tenure': value = tenure; break;
            case 'emi': value = emi; break;
            case 'interest': value = interest; break;
            default: value = amount; break;
        }
        return (
          <Fragment>
            <Grid item xs={4}>
              {t(`confirmation.${type}`)}
            </Grid>
            <Grid item xs={4}>
              <Typography align="center">:</Typography>
            </Grid>
            <Grid item xs={4}>
              {value}
            </Grid>
          </Fragment>
        );
      }

    return (
        <Dialog open={dialogOpen} onClose={toggleDialog} aria-labelledby="form-dialog-title">
            <DialogTitle align="center" id="form-dialog-title">{t('confirmation.title')}</DialogTitle>
            <DialogContent>
                <Slide direction="right" in={!isOTPPage && !slideInOTPImage} mountOnEnter unmountOnExit onExited={toggleSlideInOTPImage}>
                    <ConfirmImage/>
                </Slide>
                <Slide direction="left" in={slideInOTPImage && isOTPPage} mountOnEnter unmountOnExit onExited={toggleSlideInOTPImage}>
                    <OTPImage/>
                </Slide>
                {!isOTPPage ? 
                    <Grid container alignItems="center" justify="center" spacing={2}>
                        <Grid container item xs={12}>
                            <FormRow type="amount"/>
                        </Grid>
                        <Grid container item xs={12}>
                            <FormRow type="interest"/>
                        </Grid>
                        <Grid container item xs={12}>
                            <FormRow type="emi"/>
                        </Grid>
                    </Grid> : 
                    <Grid container>
                        <Typography align="center">
                            {`${t('otp.pre')} ${t('otp.in')} ${t('otp.post')}`}
                        </Typography>
                        {/* <OtpInput
                            value={otp}
                            onChange={setOTP}
                            numInputs={4}
                        /> */}
                        <OTPField/>
                    </Grid>
                }
            </DialogContent>
            <DialogActions>
            <Button onClick={toggleDialog} color="primary">
                {t('confirmation.reviewButtonText')}
            </Button>
            <Button onClick={() => {
                toggleOTPPage();
                // toggleSlideInOTPImage();
            }} color="primary" variant="contained">
                {t('confirmation.proceedButtonText')}
            </Button>
            </DialogActions>
        </Dialog>
    );
}

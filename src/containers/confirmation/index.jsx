import { Fragment, useContext } from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';

import { ReactComponent as ConfirmImage } from './assets/confirm.svg';
import { ReactComponent as OTPImage } from './assets/otp.svg';

import { useTranslation } from 'react-i18next';

import useToggle from 'hooks/useToggle';
import useCountdownTimer from 'hooks/useTimer';

import GlobalContext from 'contexts/globalContext';

import OTPField from 'common/otpField';

export default function ConfirmDialogContents({ toggleConfirm }) {
    const { t } = useTranslation();

    const { toggleDialog, setApproved, formattedAmount, tenure, emi, interest } = useContext(GlobalContext);

    const [isOTPPage, toggleOTPPage] = useToggle();
    const [slideInOTPImage, toggleSlideInOTPImage] = useToggle();
    const [resendOTPenabled, toggleResendOTP] = useToggle();

    const [timeLeft, startTimer] = useCountdownTimer({onStart: toggleResendOTP, onEnd: toggleResendOTP, autoIncrementInterval: 5})

    function FormRow({type}) {
        let value;
        switch(type){
            case 'amount': value = formattedAmount; break;
            case 'tenure': value = tenure; break;
            case 'emi': value = emi; break;
            case 'interest': value = interest; break;
            default: value = formattedAmount; break;
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

    const onOTPFilled = (val) => {
        if (val==='1234') {
            setApproved(true);
        } else {
            setApproved(false);
        }
        toggleDialog();
    }

    return <Fragment><DialogContent>
                <Slide direction="right" in={!isOTPPage && !slideInOTPImage} mountOnEnter unmountOnExit onExited={toggleSlideInOTPImage}>
                    <ConfirmImage/>
                </Slide>
                <Slide direction="left" in={slideInOTPImage && isOTPPage} mountOnEnter unmountOnExit onExited={toggleSlideInOTPImage}>
                    <OTPImage/>
                </Slide>
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
                    </Grid>
                {isOTPPage &&
                    <Grid container>
                        <Typography align="center">
                            {`${t('otp.pre')} ${t('otp.in')} ${t('otp.post')}`}
                        </Typography>
                        <OTPField onFilled={onOTPFilled}/>
                    </Grid>
                }
            </DialogContent>
            {!isOTPPage ? <DialogActions>
                <Button onClick={toggleConfirm} color="primary">
                    {t('confirmation.reviewButtonText')}
                </Button>
                <Button onClick={toggleOTPPage} color="primary" variant="contained">
                    {t('confirmation.proceedButtonText')}
                </Button>
            </DialogActions> : <DialogActions><Button color="primary" disabled={!resendOTPenabled} onClick={startTimer}>
                    {`${t('otp.resend')}(${timeLeft})`}
                </Button></DialogActions>}</Fragment>
}

import { Fragment, useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

import { useTranslation } from 'react-i18next';

import GlobalContext from 'contexts/globalContext';

import { backendServer } from 'helpers/httpHelper';
import { backendSubmitEndpoint, backendPrimaryKey } from 'configVariables';

import OTPField from 'common/otpField';
import TNC from 'common/tnc';

export default function ConfirmDialogContents() {
    const { t } = useTranslation();

    const { setApproved, product, amount, MaxAmount, tenure, ROI, emi, values, isOTPPage, mobile, isLoan, tncLink, toggleTNCAccepted, tncAccepted, refID, toggleLoading, setError } = useContext(GlobalContext);

    function FormRow({header, value}) {
        return (
          <Fragment>
            <Grid item xs={5}>
              {header}
            </Grid>
            <Grid item xs={2}>
              <Typography align="center">:</Typography>
            </Grid>
            <Grid item xs={5}>
              {value}
            </Grid>
          </Fragment>
        );
      }

    const onOTPFilled = async (val) => {
      toggleLoading();
      try {
        const body = isLoan ? {
            [backendPrimaryKey]: refID,
            'AmountInPaisa': amount,
            'Months': tenure,
            'ROI': ROI,
            'MonthlyEMIAmountInPaisa': emi,
            'OTP': val,
          } : {
            [backendPrimaryKey]: refID,
            'AmountInPaisa': MaxAmount,
            'OTP': val,
          }
        await backendServer.post(backendSubmitEndpoint, body);
        setApproved(true);
      } catch (err) {
        if (err.status) {
          setError(err.response?.body?.status?.message || `submitting failed`);
        } else {
          setError(`submitting failed`);
        }
        setApproved(false);
      }
      toggleLoading();
    }

    return <Fragment>
                {/* <Slide direction="right" in={!isOTPPage && !slideInOTPImage} mountOnEnter unmountOnExit onExited={toggleSlideInOTPImage}>
                    <ConfirmImage/>
                </Slide>
                <Slide direction="left" in={slideInOTPImage && isOTPPage} mountOnEnter unmountOnExit onExited={toggleSlideInOTPImage}>
                    <OTPImage/>
                </Slide> */}
                <Grid container alignItems="center" justify="center" spacing={2}>
                    {t(`confirmation.headers.${isLoan ? 'loan' : 'card'}`, { returnObjects: true }).map((h, i) => 
                        <Grid container item xs={12} key={i}>
                            <FormRow header={h} value={values[i]}/>
                        </Grid>)
                    }
                    {(!isLoan && !isOTPPage) && <TNC tncLink={tncLink} toggleTNCAccepted={toggleTNCAccepted} tncAccepted={tncAccepted}/>}
                    <Grow in={isOTPPage} mountOnEnter unmountOnExit timeout={1000} style={{ transformOrigin: 'center' }}>
                        <Grid container item xs={12}>
                                <Typography align="center">
                                    {t('otp.citation', { mobile: mobile, type: t(`${product}.title`) })}
                                </Typography>
                                <OTPField onFilled={onOTPFilled}/>
                        </Grid>
                    </Grow>
                </Grid>
            </Fragment>
}

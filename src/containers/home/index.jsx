/* eslint-disable react-hooks/exhaustive-deps */
import { useState, Fragment, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ReactComponent as CongratsImage } from './assets/congrats.svg';
import { ReactComponent as FailedImage } from './assets/failed.svg';
import { ReactComponent as ConfirmImage } from './assets/confirm.svg';
import { ReactComponent as OTPImage } from './assets/otp.svg';

import Customise from 'containers/customise';
import Confirmation from 'containers/confirmation';
import Feedback from 'containers/feedback';
import ErrorPage from 'common/error';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';

import useToggle from 'hooks/useToggle';
import useCounter from 'hooks/useCounter';
import useFetch from 'hooks/useFetch';
import useCountdownTimer from 'hooks/useCountdownTimer';

import { GlobalContextProvider } from 'contexts/globalContext';

import config from 'configVariables';
import emiCalculator from 'helpers/emiHelper.js';
import { backendServer } from 'helpers/httpHelper';

const HOME_PAGE = 0;
const CUSTOMISE_PAGE = 1;
const CONFIRMATION_PAGE = 2;
const OTP_PAGE = 3;
const ACKNOWLEDGMENT_PAGE = 4;

const PRODUCTS = { 
    [config.jumboProdCode]: {name: 'jumbo', tncLink: config.jumboTNCLink},
    [config.instaProdCode]: {name: 'insta', tncLink: config.instaTNCLink},
    [config.enhancementProdCode]: {name: 'enhancement', tncLink: config.jumboTNCLink}
};

export default function Home() {
    const { enqueueSnackbar } = useSnackbar();
    const [step, incStep, decStep, overwriteStep] = useCounter();
    const isOTPPage = step === 3;
    const classes = useStyles({ activeStep: step });
    const { t } = useTranslation();
    const { refID } = useParams();

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        if(step===2 && isLoan) decStep();
    }

    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);  
        };
    }, [step]);

    const [
        fetchDetails, detailsLoading, 
        {ProductCode, MinimumEligibleLoanAmount: MinAmount, MaximumEligibleLoanAmount: MaxAmount, IntervalAmountAllowedToChange: IntervalAmount, tenureAmountList, CardNumber: cardNo, MobileNumber: mobile, DisbursalMode, SBAccountNumber, EntityID} 
        = {ProductCode: 1, EntityID: 'HDFC', MinimumEligibleLoanAmount: 0, MaximumEligibleLoanAmount: 1000000, IntervalAmountAllowedToChange: 100000, tenureAmountList: [], CardNumber: 1234, MobileNumber: 9999999999, DisbursalMode: "DD", SBAccountNumber: "1234"},
        detailsStatus, detailsError,
    ] = useFetch(true);
    const [fetchOTP, otpLoading, otp, otpStatus, otpError] = useFetch(true);
    const product = PRODUCTS[ProductCode]?.name;
    const isLoan = ['jumbo', 'insta'].includes(product);

    const [feedbackSubmitted, toggleFeedbackSubmitted] = useToggle();
    const [resendOTPenabled, toggleResendOTP] = useToggle(true);
    const [tncAccepted, toggleTNCAccepted] = useToggle();
    const [loading, toggleLoading] = useToggle();
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(false);
    const [referenceNo, setRefNo] = useState('');

    const [timeLeft, startTimer] = useCountdownTimer({onStart: toggleResendOTP, onEnd: toggleResendOTP, autoIncrementInterval: 5})

    const [isApproved, setApproved] = useState(null);

    const [amount, setAmount] = useState(60000000);
    const [tenure, setTenure] = useState(null);
    const [reason, setReason] = useState(null);
    const [referral, setReferral] = useState(null);
    const [rating, setRating] = useState(2.5);

    useEffect(()=>{
        if(error) {
            enqueueSnackbar(error, { 
                variant: 'error',
                preventDuplicate: true,
            });
        }
    }, [error]);

    useEffect(()=>{if(isApproved!==null) incStep()}, [isApproved]);

    useEffect(()=>{console.log(MinAmount, MaxAmount, IntervalAmount); if(tenureAmountList) setTenure(tenureAmountList[0].Months)}, [tenureAmountList]);

    useEffect(()=>{
        fetchDetails(config.backendDetailsEndpoint + refID);
    }, []);

    useEffect(()=> {
        if(otpStatus===200 && otp) startTimer();
        else setError(otpError);
    }, [otpLoading])

    useEffect(()=>{if(isOTPPage) fetchOTP(config.backendOTPEndpoint + refID)}, [isOTPPage]);

    const submitFeedback = async() => {
        toggleLoading();
          try {
            await backendServer.post(config.backendFeedbackEndpoint, {
                [config.backendPrimaryKey]: refID,
                'ReasonForLoan': reason,
                'EmployeeReferralCode': referral,
                'Feedback': rating,
            });
            toggleFeedbackSubmitted();
          } catch (err) {
            if (err.status) {
              setError(err.response?.body?.status?.message || `feedback submitting failed`);
            } else {
              setError(`feedback submitting failed`);
            }
          }
          toggleLoading();
    }

    const formattedAmount = isLoan ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount/100) : new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(MaxAmount/100);

    const selectedTenureDetails = tenureAmountList?.find((t) => t.Months === tenure);
    const interest = `${+selectedTenureDetails?.ROI/100 || 1}%`;
    const emi = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
        }).format(emiCalculator(amount/100, (+selectedTenureDetails?.ROI)/120000 || 1, tenure))

    const images = [<CongratsImage/>, null, <ConfirmImage className={classes.image}/>, <OTPImage className={classes.image}/>, isApproved === false ? <FailedImage/> : <CongratsImage/>];
    const titles = [t('common.congratulation'), t('customise.title'), t(`confirmation.title.${isLoan ? 'loan' : 'card'}`), t('otp.title'), isApproved === false ? t('common.failed') : t('common.congratulation')];
    const citations = [t(`${product}.citation`), null, null, null, isApproved === false ? t(`${product}.failed`) : <Fragment>{t(`${product}.approvedPre`)} <b>{t(`${product}.approvedIn`, { amount: formattedAmount, tenure: tenure})}</b> {t(`${product}.approvedPost`)} {isLoan && t(`disbursal.${DisbursalMode}.acknowledgement`)}<br/>{isLoan && t(`${product}.ref`, {ref: referenceNo})}<br/>{t(`${product}.login`, {entity: EntityID})}</Fragment>];
    const buttons = [t(`${product}.buttonText`), t('customise.buttonText'), t(`confirmation.proceedButtonText.${isLoan ? 'loan' : 'card'}`), t('otp.resend') + (timeLeft > 0 ? `(${timeLeft})` : ''), t('common.submit')]
    const buttonActions = [product === 'enhancement' ? overwriteStep.bind(null, CONFIRMATION_PAGE) : incStep, incStep, incStep, fetchOTP.bind(null, config.backendOTPEndpoint + refID), submitFeedback]

    const getBodies = () => {
        switch (step) {
            case HOME_PAGE: return <Grid item>
                                        {detailsLoading ? (<Skeleton animation="wave" />) : <Typography variant="h4" align="center">
                                            {new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR'
                                            }).format(MaxAmount/100)}
                                        </Typography>}
                                    </Grid>;
            case CUSTOMISE_PAGE: return <Customise/>;
            case CONFIRMATION_PAGE: case OTP_PAGE: return <Confirmation/>;
            case ACKNOWLEDGMENT_PAGE: return <Feedback/>;
            default: return null;
        }
    }

    const tenureList = tenureAmountList?.map((t) => {return { value: t.Months, label: `${t.Months}` }}) || [];
    const values = isLoan ? [formattedAmount, tenure, interest, emi] : [`XXXX XXXX XXXX ${cardNo}`, mobile, new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(MaxAmount/100)];

    return (
        detailsStatus === 200 ? <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {(step === 2 && isLoan) && <IconButton color="primary" className={classes.backButton} classes={{root: classes.backButtonRoot}} onClick={decStep}><ArrowBackIcon/></IconButton>}
                {images[step]}
                <Grid container
                    direction="column"
                    justify="center"
                    spacing={3}
                    className={classes.grid}
                >
                    <Grid item><Typography component="h1" variant="h5" align="center">
                        {detailsLoading ? (<Skeleton animation="wave" />) : titles[step]}
                    </Typography></Grid>
                    {detailsLoading ? (<Skeleton animation="wave" />) : (citations[step] && <Grid item><Typography align="center">{citations[step]}</Typography></Grid>)}
                    {detailsLoading ? (<Skeleton animation="wave" />) : <GlobalContextProvider value={{ 
                        product, amount, setAmount, formattedAmount, toggleTNCAccepted, tncAccepted,
                        MinAmount, MaxAmount, IntervalAmount, tenure, setTenure, emi, interest,
                        setApproved, isOTPPage, mobile,
                        tenureList, isLoan, values, tncLink: PRODUCTS[ProductCode]?.tncLink,
                        feedbackSubmitted, refID, ROI: selectedTenureDetails?.ROI,
                        toggleLoading, setError, reason, setReason,
                        referral, setReferral, rating, setRating,
                        DisbursalMode, SBAccountNumber, setRefNo
                    }}
                    >
                        {getBodies()}
                    </GlobalContextProvider>}
                    {!feedbackSubmitted && <Grid item align="center" xs={12}>
                        {detailsLoading ? (<Skeleton animation="wave" />) : 
                        <div className={classes.wrapper}>
                            <Button
                                // className={classes.button}
                                variant={isOTPPage ? 'text' : 'contained'} 
                                color="primary" 
                                disabled={loading || (!resendOTPenabled && isOTPPage) || ([1,2].includes(step) && !tncAccepted)} onClick={buttonActions[step]}
                            >
                                {buttons[step]}
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>}
                    </Grid>}
                </Grid>
            </div>
        </Container> : <ErrorPage message={detailsError} showButton redirectLink={`/${refID}`} buttonText="Refresh"/>
    );
}

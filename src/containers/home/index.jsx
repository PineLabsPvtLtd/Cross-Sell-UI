/* eslint-disable react-hooks/exhaustive-deps */
import { useState, Fragment, useEffect } from 'react';

import { useParams } from 'react-router-dom';

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

const PRODUCTS = { 1: {name: 'jumbo', tncLink: config.jumboTNCLink}, 2: {name: 'insta', tncLink: config.instaTNCLink}, 3: {name: 'enhancement', tncLink: config.jumboTNCLink}};

export default function Home() {
    const [step, incStep, decStep, overwriteStep] = useCounter();
    const isOTPPage = step === 3;
    const classes = useStyles({ activeStep: step });
    const { t } = useTranslation();
    const { refID } = useParams();

    const [fetchDetails, detailsLoading, {productCode, MinAmount, MaxAmount, IntervalAmount, TenureList, cardNo, mobile} = {productCode: 1, EntityID: 'HDFC', MinAmount: 0, MaxAmount: 1000000, IntervalAmount: 100000, TenureList: [], cardNo: 1234, mobile: 9999999999}] = useFetch(true);
    const [fetchOTP, otpLoading, {otp} = {otp: '1234'}, otpStatus] = useFetch(true);
    const product = PRODUCTS[productCode]?.name;
    const isLoan = ['jumbo', 'insta'].includes(product);

    const [feedbackSubmitted, toggleFeedbackSubmitted] = useToggle();
    const [resendOTPenabled, toggleResendOTP] = useToggle(true);
    const [tncAccepted, toggleTNCAccepted] = useToggle();
    const [loading, toggleLoading] = useToggle();
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(false);

    const [timeLeft, startTimer] = useCountdownTimer({onStart: toggleResendOTP, onEnd: toggleResendOTP, autoIncrementInterval: 5})

    const [isApproved, setApproved] = useState(null);

    const [amount, setAmount] = useState(600000);
    const [tenure, setTenure] = useState(null);
    const [reason, setReason] = useState(null);
    const [referral, setReferral] = useState(null);
    const [rating, setRating] = useState(2.5);

    useEffect(()=>{if(isApproved!==null) incStep()}, [isApproved]);

    useEffect(()=>{if(TenureList) setTenure(TenureList[0].Months)}, [TenureList]);

    useEffect(()=>{
        fetchDetails(config.backendDetailsEndpoint + refID);
    }, []);

    useEffect(()=> {
        console.log(otpStatus, otp);
        if(otpStatus===200 && otp) startTimer();
    }, [otpLoading])

    useEffect(()=>{console.log(isOTPPage); if(isOTPPage) fetchOTP(config.backendOTPEndpoint + refID)}, [isOTPPage]);

    const submitFeedback = async() => {
        toggleLoading();
          try {
            await backendServer.post(config.backendFeedbackEndpoint, {
                'id': refID,
                'ReasonForLoan': reason,
                'Months': tenure,
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

    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);

    const selectedTenureDetails = TenureList?.find((t) => t.Months === tenure);
    const interest = `${selectedTenureDetails?.ROI || 1}%`;
    const emi = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
        }).format(emiCalculator(amount, (selectedTenureDetails?.ROI)/1200 || 1, tenure))

    const images = [<CongratsImage/>, null, <ConfirmImage className={classes.image}/>, <OTPImage className={classes.image}/>, isApproved === false ? <FailedImage/> : <CongratsImage/>];
    const titles = [t('common.congratulation'), t('customise.title'), t(`confirmation.title.${isLoan ? 'loan' : 'card'}`), t('otp.title'), isApproved === false ? t('common.failed') : t('common.congratulation')];
    const citations = [t(`${product}.citation`), null, null, null, isApproved === false ? t(`${product}.failed`) : <Fragment>{t(`${product}.approvedPre`)} <b>{t(`${product}.approvedIn`, { amount: formattedAmount, tenure: tenure})}</b> {t(`${product}.approvedPost`)}</Fragment>];
    const buttons = [t(`${product}.buttonText`), t('customise.buttonText'), t('confirmation.proceedButtonText'), t('otp.resend') + (timeLeft > 0 ? `(${timeLeft})` : ''), t('common.submit')]
    const buttonActions = [product === 'enhancement' ? overwriteStep.bind(null, CONFIRMATION_PAGE) : incStep, incStep, incStep, fetchOTP.bind(null, config.backendOTPEndpoint + refID), submitFeedback]

    const getBodies = () => {
        switch (step) {
            case HOME_PAGE: return <Grid item>
                                        {detailsLoading ? (<Skeleton animation="wave" />) : <Typography variant="h4" align="center">
                                            {new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR'
                                            }).format(MaxAmount)}
                                        </Typography>}
                                    </Grid>;
            case CUSTOMISE_PAGE: return <Customise/>;
            case CONFIRMATION_PAGE: case OTP_PAGE: return <Confirmation/>;
            case ACKNOWLEDGMENT_PAGE: return <Feedback/>;
            default: return null;
        }
    }

    const tenureList = TenureList?.map((t) => {return { value: t.Months, label: `${t.Months}` }}) || [];
    const values = isLoan ? [formattedAmount, tenure, interest, emi] : [`XXXX XXXX XXXX ${cardNo}`, mobile, new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(MaxAmount)];

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {step === 2 && <IconButton color="primary" className={classes.backButton} classes={{root: classes.backButtonRoot}} onClick={decStep}><ArrowBackIcon/></IconButton>}
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
                        amount, setAmount, formattedAmount, toggleTNCAccepted, tncAccepted,
                        MinAmount: MinAmount, MaxAmount: MaxAmount, IntervalAmount: IntervalAmount, tenure, setTenure, emi, interest,
                        setApproved, isOTPPage: isOTPPage,
                        tenureList, isLoan, values, otp, tncLink: PRODUCTS[productCode]?.tncLink,
                        feedbackSubmitted, refID, ROI: selectedTenureDetails?.ROI,
                        toggleLoading, setError, reason, setReason,
                        referral, setReferral, rating, setRating
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
        </Container>
    );
}

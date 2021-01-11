import { useState, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { ReactComponent as CongratsImage } from './assets/congrats.svg';
import { ReactComponent as FailedImage } from './assets/failed.svg';
import CustomiseDialog from 'containers/customise';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';

import useToggle from 'hooks/useToggle';

import { GlobalContextProvider } from 'contexts/globalContext';

export default function Home() {
    const classes = useStyles();
    const { t } = useTranslation();

    const [dialogOpen, toggleDialog] = useToggle();
    const [isApproved, setApproved] = useState(null);

    const [amount, setAmount] = useState(500000);
    const [tenure, setTenure] = useState(36);

    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);

    const emi = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(amount/tenure);

    const interest = '10%';

    const getCitation = () => {
        switch (isApproved) {
            case true: return (
                <Typography variant="body2" align="center">
                    {t('home.approvedPre')} <b>{t('home.approvedIn', { amount: formattedAmount, tenure: tenure})}</b> {t('home.approvedPost')}
                </Typography>
            )
            case false : return <Typography variant="body2" align="center">{t('home.failed')}</Typography>
            default : return <Typography variant="body2" align="center">{t('home.citation')}</Typography>
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {isApproved === false ? <FailedImage/> : <CongratsImage/>}
                <Grid container
                    direction="column"
                    justify="center"
                    spacing={3}
                    className={classes.grid}
                >
                    <Grid item><Typography component="h1" variant="h5" align="center">
                        {isApproved === false ? t('common.failed') : t('common.congratulation')}
                    </Typography></Grid>
                    <Grid item>{getCitation()}</Grid>
                    {isApproved === null && <Fragment><Grid item>
                        <Typography variant="h4" align="center">
                            {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                            }).format(100000)}
                        </Typography>
                    </Grid>
                    <Grid item align="center" xs={12}>
                        <Button variant="contained" color="primary" onClick={toggleDialog}>
                            {t('home.buttonText')}
                        </Button>
                    </Grid></Fragment>}
                </Grid>
            </div>
            <GlobalContextProvider value={{ 
                dialogOpen, toggleDialog, amount, setAmount, formattedAmount,
                tenure, setTenure, emi, interest,
                setApproved }}><CustomiseDialog/></GlobalContextProvider>
        </Container>
    );
}

import { Fragment, useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Grow from '@material-ui/core/Grow';

import { useTranslation } from 'react-i18next';

import GlobalContext from 'contexts/globalContext';

export default function Feedback() {
    const { t } = useTranslation();

    const { isLoan, feedbackSubmitted, reason, setReason, referral, setReferral, rating, setRating } = useContext(GlobalContext);

    return <Fragment>
                {!feedbackSubmitted && <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid container item xs={12}>
                        <TextField
                            id="reason-field"
                            label={t(`feedback.reason.${isLoan ? 'loan' : 'card'}`)}
                            multiline
                            rows={3}
                            fullWidth
                            variant="filled"
                            value={reason}
                            onChange={(e,v)=>setReason(v)}
                            />
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            id="referral-field"
                            label={t('feedback.referral')}
                            fullWidth
                            variant="filled"
                            value={referral}
                            onChange={(e,v)=>setReferral(v)}
                            />
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={5}>
                            <Typography>Rating</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography align="center">:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Rating name="half-rating" precision={0.5} value={rating}
                            onChange={(e,v)=>setRating(v)} />
                        </Grid>
                    </Grid>
                </Grid>}
                <Grow in={feedbackSubmitted} mountOnEnter unmountOnExit timeout={1000} style={{ transformOrigin: 'center' }}>
                    <Typography align='center'>{t('feedback.thanks')}</Typography>
                </Grow>
            </Fragment>
}

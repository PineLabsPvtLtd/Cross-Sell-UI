import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { ReactComponent as CongratsImage } from './assets/congrats.svg';
import CustomiseDialog from 'containers/customise';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';

import useToggle from 'hooks/useToggle';

export default function Home() {
    const classes = useStyles();
    const { t } = useTranslation();

    const [dialogOpen, toggleDialog] = useToggle();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <CongratsImage/>
                <Grid container
                    direction="column"
                    justify="center"
                    spacing={3}
                    className={classes.grid}
                >
                    <Grid item><Typography component="h1" variant="h5" align="center">
                        {t('common.congratulation')}
                    </Typography></Grid>
                    <Grid item><Typography variant="body2" align="center">
                        {t('home.citation')}
                    </Typography></Grid>
                    <Grid item>
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
                    </Grid>
                </Grid>
            </div>
            <CustomiseDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog}/>
        </Container>
    );
}

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { ReactComponent as PageNotFoundImage } from 'assets/404.svg';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';

export default function PageNotFound() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <PageNotFoundImage/>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    className={classes.grid}
                >
                    <Grid item><Typography component="h1" variant="h5" align="center">
                        {t('errors.404')}
                    </Typography></Grid>
                </Grid>
            </div>
        </Container>
    );
}

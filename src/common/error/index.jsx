import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { ReactComponent as PageNotFoundImage } from 'assets/404.svg';
import { ReactComponent as ErrorImage } from 'assets/error.svg';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';

export default function ErrorPage({ type = '404', message, showButton = true, redirectLink = '/', buttonText = 'Back to home' }) {
    const classes = useStyles();
    const { t } = useTranslation();

    const renderImage = () => {
        switch (type) {
            case '404': return <PageNotFoundImage/>;
            default:
                return <ErrorImage/>;
        }
    };

    function getMessage() {
        if (message) return message;
        switch (type) {
            case '404': return t('errors.404');
            default: return 'Error';
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {renderImage()}
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    className={classes.grid}
                >
                    <Grid item><Typography component="h1" variant="h5" align="center">
                        {getMessage()}
                    </Typography></Grid>
                    {showButton && <Grid item><Button variant="outlined" href={redirectLink}>
                        {buttonText}
                    </Button></Grid>}
                </Grid>
            </div>
        </Container>
    );
}

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        margin: props => theme.spacing([0, 4].includes(props.activeStep) ? 10 : 5, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    grid: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    image: {
        marginTop: props => theme.spacing(props.activeStep === 3 ? 0 : 4),
    },
    backButton: {
        position: "absolute",
        left: theme.spacing(0)
    },
    backButtonRoot: {
        padding: 0
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    button: {
        // margin: theme.spacing(1),
        height: 42,
        minWidth: 110,
        color: 'white',
    },
}));

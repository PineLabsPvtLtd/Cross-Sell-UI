import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    grid: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

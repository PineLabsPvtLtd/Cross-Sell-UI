import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        width: 250,
    },
    input: {
        width: '100%',
    },
    nameInput: {
        'fontSize': '1em',
        'textAlign': 'center',
        'color': theme.placeholder,
        '&::placeholder': {
            textAlign: 'center',
            color: theme.placeholder,
        },
    },
    inputMarginDense: {
        paddingTop: '6px',
    },
    helperText: {
        'textAlign': 'center',
    },
}));
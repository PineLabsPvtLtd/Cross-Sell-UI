import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    tnc: {
        'alignSelf': 'center',
    }
}));

export default function TNC({tncAccepted, toggleTNCAccepted, tncLink}) {
    const classes = useStyles();

    return (
        <FormControlLabel
            className={classes.tnc}
            control={
                <Checkbox
                    checked={tncAccepted}
                    required
                    onClick={toggleTNCAccepted}
                    color="primary"
                />
            }
            label={<div>
                <span>I accept the </span>
                <Link target="_blank" href={tncLink} underline="always">terms & conditions</Link>
            </div>}
        />
    );
}
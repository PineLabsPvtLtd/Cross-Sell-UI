import { Fragment, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import { useTranslation } from 'react-i18next';

import GlobalContext from 'contexts/globalContext';

import TNC from 'common/tnc';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 250,
    },
    input: {
        width: '100%',
    },
    nameInput: {
        'fontSize': '2em',
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

const theme = createMuiTheme();
theme.overrides = {
    MuiFilledInput: {
        input: {
            padding: '12px 10px',
        },
    },
};
theme.props = {
    MuiFilledInput: {
        disableUnderline: true,
    },
};

function numFormatter(num) {
    if (num > 999 && num < 100000) {
        return (num / 1000).toFixed(0) + "k"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 100000) {
        return (num / 100000).toFixed(0) + "L"; // convert to M for number from > 1 million
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}

export default function FormDialog() {
    const { t } = useTranslation();
    const classes = useStyles();

    const { MinAmount, MaxAmount, IntervalAmount, amount, setAmount, tenure, setTenure, emi, tenureList, tncLink, toggleTNCAccepted, tncAccepted, DisbursalMode, SBAccountNumber, isLoan } = useContext(GlobalContext);

    const handleAmountChange = (event, newValue) => {
        setAmount(newValue);
    };
    const handleTenureChange = (event, newValue) => {
        setTenure(newValue);
    };

    const amountMarks = Array.from({length: ((+MaxAmount)-(+MinAmount))/(+IntervalAmount) + 1}, (_, index) => {
        const val = (+MinAmount) + (index*(+IntervalAmount));
        return {
            value: val,
            label: numFormatter(val/100)
        }
    })

    return (
        <Fragment>
            <Grid 
                container 
                spacing={1} 
                direction="column"
                justify="center">
                <Grid item>
                    <Typography id="input-slider" align="center" gutterBottom>
                        {t('customise.amount')}
                    </Typography>
                </Grid>
                <Grid item>
                    <MuiThemeProvider theme={theme}>
                    <CurrencyTextField
                            className={classes.input}
                            value={`${amount/100}`}
                            variant="filled"
                            currencySymbol={t('currency')}
                            digitalGroupSpacing={2}
                            InputProps={{
                                classes: { input: classes.nameInput, inputMarginDense: classes.inputMarginDense },
                                disableUnderline: true,
                            }}
                            margin="dense"
                            disabled
                        />
                    </MuiThemeProvider>
                </Grid>
                <Grid item xs>
                    <Slider
                        name='amount'
                        value={amount}
                        min={+MinAmount}
                        max={amountMarks[amountMarks.length - 1].value}
                        marks={amountMarks}
                        step={null}
                        onChange={handleAmountChange}
                        aria-labelledby="amount-slider"
                    />
                </Grid>
                <Grid item>
                    <Typography id="input-slider" align="center" gutterBottom>
                        {t('customise.tenure')}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Slider
                        name='tenure'
                        value={typeof tenure === 'number' ? tenure : 0}
                        max={tenureList[tenureList.length - 1].value}
                        marks={tenureList}
                        step={null}
                        onChange={handleTenureChange}
                        aria-labelledby="tenure-slider"
                    />
                </Grid>
            </Grid>
            <Typography id="input-slider" align="center" gutterBottom>{t('customise.emi')}</Typography>
            <Typography variant="h4" align="center" gutterBottom>
                {emi}
            </Typography>
            {isLoan && <Typography align="center">
                {t(`disbursal.${DisbursalMode}.citation`, {ac: SBAccountNumber})}
            </Typography>}
            <TNC tncLink={tncLink} toggleTNCAccepted={toggleTNCAccepted} tncAccepted={tncAccepted}/>
        </Fragment>
    );
}

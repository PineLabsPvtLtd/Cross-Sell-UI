import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import { useTranslation } from 'react-i18next';

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

export default function InputSlider({ isCurrency=false, title, maxValue, stepValue, value, setValue }) {
    const { t } = useTranslation();

    const classes = useStyles();

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleBlur = () => {
        if (value < 0) {
        setValue(0);
        } else if (value > maxValue) {
        setValue(maxValue);
        }
    };

    return (
        <Grid 
            container 
            spacing={1} 
            direction="column"
            justify="center">
            <Grid item>
                <Typography id="input-slider" align="center" gutterBottom>
                    {title}
                </Typography>
            </Grid>
            <Grid item>
            <MuiThemeProvider theme={theme}>
                        {isCurrency ? <CurrencyTextField
                            className={classes.input}
                            value={value}
                            variant="filled"
                            currencySymbol={t('currency')}
                            maximumValue={maxValue}
                            minimumValue={'0'}
                            digitalGroupSpacing={2}
                            InputProps={{
                                classes: { input: classes.nameInput, inputMarginDense: classes.inputMarginDense },
                                disableUnderline: true,
                            }}
                            // FormHelperTextProps={{ classes: { root: classes.helperText } }}
                            multiline={false}
                            // placeholder={`${titleSingular} Name`}
                            margin="dense"
                            // error={dataTemplateError!==false}
                            // helperText={getNameError()}
                            onChange={(event, value) => setValue(value)}
                            onBlur={handleBlur}
                        /> : <TextField
                            className={classes.input}
                            value={value}
                            variant="filled"
                            InputProps={{
                                classes: { input: classes.nameInput, inputMarginDense: classes.inputMarginDense },
                                disableUnderline: true,
                            }}
                            inputProps={{
                                step: stepValue,
                                min: 0,
                                max: maxValue,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                            FormHelperTextProps={{ classes: { root: classes.helperText } }}
                            multiline={false}
                            // placeholder={`${titleSingular} Name`}
                            margin="dense"
                            // error={dataTemplateError!==false}
                            // helperText={getNameError()}
                            onChange={(e)=>setValue(e.target.value === '' ? '' : Number(e.target.value))}
                            onBlur={handleBlur}
                        />}
                    </MuiThemeProvider>
            </Grid>
            <Grid item xs>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    max={+maxValue}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                />
            </Grid>
        </Grid>
    );
}

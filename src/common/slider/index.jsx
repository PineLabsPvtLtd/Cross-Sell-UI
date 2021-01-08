import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

export default function InputSlider({ title, defaultValue, maxValue }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(defaultValue);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
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
                        <TextField
                            className={classes.input}
                            value={value}
                            variant="filled"
                            InputProps={{
                                classes: { input: classes.nameInput, inputMarginDense: classes.inputMarginDense },
                                disableUnderline: true,
                            }}
                            inputProps={{
                                step: 1000,
                                min: 0,
                                max: maxValue,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                            FormHelperTextProps={{ classes: { root: classes.helperText } }}
                            multiline={false}
                            autoFocus
                            // placeholder={`${titleSingular} Name`}
                            margin="dense"
                            // error={dataTemplateError!==false}
                            // helperText={getNameError()}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                    </MuiThemeProvider>
            </Grid>
            <Grid item xs>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    max={maxValue}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                />
            </Grid>
        </Grid>
    );
}

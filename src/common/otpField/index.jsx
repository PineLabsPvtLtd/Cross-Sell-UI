/* eslint-disable react-hooks/exhaustive-deps */

/**
 * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
 * @since 1.0.0
 * Inspired from https://www.npmjs.com/package/react-otp-input
 */
import { useState, useEffect } from 'react';

import produce from "immer";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import useStyles from './styles.jsx';

import useCounter from 'hooks/useCounter';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

export default function OTPField({ isNumeric=true, isSecure=false, otpLength=4, disabled=false, onFilled=()=>{}, onChange=()=>{} }) {
    const classes = useStyles();

    const [otp, setOTP] = useState((new Array(otpLength)).fill(''));
    const [currIndex, incIndex, decIndex, overwriteIndex] = useCounter();

    useEffect(() => {
        if(otp.some(e => e)) onChange(otp.join(''));
    }, [otp]);

    useEffect(()=>{
        if(document.querySelector(`#digit-${currIndex}`))
            document.querySelector(`#digit-${currIndex}`).focus();
    }, [currIndex]);

    // Change OTP value at focused input
    const changeCodeAtFocus = value => {
        setOTP(produce(otp, draft => {draft[currIndex] = value}));
        if (currIndex === otpLength-1) onFilled(otp.join(''));
        else onChange(otp.join(''));
    };

    // Handle cases of backspace, delete, left arrow, right arrow, space
    const handleOnKeyDown = (e) => {
        if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
            e.preventDefault();
            changeCodeAtFocus('');
            if(currIndex > 0) decIndex();
        } else if (e.keyCode === DELETE || e.key === 'Delete') {
            e.preventDefault();
            changeCodeAtFocus('');
        } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
            e.preventDefault();
            if(currIndex > 0) decIndex();
        } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
            e.preventDefault();
            if(currIndex < otpLength-1) incIndex();
        } else if (
            e.keyCode === SPACEBAR ||
            e.key === ' ' ||
            e.key === 'Spacebar' ||
            e.key === 'Space'
            ) {
            e.preventDefault();
        }
    };

    const isInputValueValid = value => {
        const isTypeValid = isNumeric
            ? !isNaN(parseInt(value, 10))
            : typeof value === 'string';
    
        return isTypeValid && value.trim().length === 1;
    };

    // The content may not have changed, but some input took place hence change the focus
    const handleOnChange = (e) => {
        if (isInputValueValid(e.target.value)) {
            changeCodeAtFocus(e.target.value);
            if(currIndex < otpLength-1) {
                incIndex();
            }
        } 
        else {
            // This is a workaround for dealing with keyCode "229 Unidentified" on Android.

            if (!isNumeric) {
                const { nativeEvent } = e;

                if (
                    nativeEvent.data === null &&
                    nativeEvent.inputType === 'deleteContentBackward'
                ) {
                    e.preventDefault();
                    changeCodeAtFocus('');
                    decIndex();
                }
            }
        }
    };

    // Handle pasted OTP
    const handleOnPaste = (e) => {
        e.preventDefault();

        if (disabled) {
            return;
        }

        let nextActiveInput = currIndex;

        // Get pastedData in an array of max size (num of inputs - current position)
        const pastedData = e.clipboardData
        .getData('text/plain')
        .slice(0, otpLength - currIndex)
        .split('');

        // Paste data from focused input onwards
        setOTP(produce(otp, draft => {
            for (let pos = 0; pos < otpLength; ++pos) {
                if (pos >= currIndex && pastedData.length > 0) {
                    draft[pos] = pastedData.shift();
                    nextActiveInput++;
                }
            }
        }));

        overwriteIndex(nextActiveInput-1);
        if (nextActiveInput === otpLength) onFilled(otp.join(''));
        else onChange(otp.join(''));
    };

    const getType = () => {
        if (isSecure) {
            return 'password';
        }
    
        if (isNumeric) {
            return 'tel';
        }
    
        return 'text';
    };

    return (
        <Grid container item spacing={2}>
            {[...Array(otpLength)].map((o, i) => 
                {
                    return <Grid container item xs={12/otpLength} key={i} justify="center">
                    <TextField
                        id={`digit-${i}`}
                        variant="outlined"
                        InputProps={{
                            classes: { input: classes.nameInput },
                        }}
                        inputProps={{type: getType()}}
                        value={otp[i]}
                        disabled={disabled}
                        onChange={handleOnChange}
                        onKeyDown={handleOnKeyDown}
                        onPaste={handleOnPaste}
                        onFocus={e => {
                            overwriteIndex(i);
                            e.target.select();
                        }}
                    />
                </Grid>}
            )}
        </Grid>
    );
}
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

/**
 * React hook to trigger actions based on timer
 * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
 * @since 1.0.0
 * @param {Function} [callback] 
 * @param {Number} [interval=10000] in seconds 
 */
export default function useCountdownTimer({onStart=()=>{}, onEnd=()=>{}, interval = 10, autoIncrementInterval = 0} = {onStart: ()=>{}, onEnd: ()=>{}, interval: 10, autoIncrementInterval: 0}) {
    const [prevCounter, setPrevCounter] = useState(interval - autoIncrementInterval);
    const [counter, setCounter] = useState(-1);

    useEffect(() => {
        console.log(counter);
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        counter === 0 && onEnd();
      }, [counter]);

    const startCountdown = () => {
        console.log(counter, autoIncrementInterval)
        onStart();
        setCounter(prevCounter + autoIncrementInterval);
        setPrevCounter(prevCounter + autoIncrementInterval);
    }

    return [counter, startCountdown];
}

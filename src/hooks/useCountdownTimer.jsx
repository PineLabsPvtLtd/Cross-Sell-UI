/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

/**
 * React hook to trigger actions based on timer
 * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
 * @since 1.0.0
 * @param {Function} [callback] 
 * @param {Number} [interval=10000] in seconds 
 */
export default function useCountdownTimer({onStart=()=>{}, onEnd=()=>{}, interval = 10, autoIncrementInterval = 0, maxClickCount=10} = {onStart: ()=>{}, onEnd: ()=>{}, interval: 10, autoIncrementInterval: 0, maxClickCount: 10}) {
    const [prevCounter, setPrevCounter] = useState(interval - autoIncrementInterval);
    const [counter, setCounter] = useState(-1);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        counter === 0 && clickCount<maxClickCount && onEnd();
      }, [counter]);

    const startCountdown = () => {
        if(clickCount<maxClickCount) {
            setClickCount(clickCount+1);
            onStart();
            setCounter(prevCounter + autoIncrementInterval);
            setPrevCounter(prevCounter + autoIncrementInterval);
        }
    }

    return [counter, startCountdown, clickCount];
}

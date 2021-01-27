import { useState, useCallback } from 'react';

/**
 * React hook to increment/decrement a counter
 * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
 * @since 1.0.0
 * @param {Boolean} [initialValue=0] 
 * @return {Array} `value`, `increment`, `decrement`, `overwrite` & `reset` function
 */
export default function useToggle(initialValue = 0) {
    const [value, setValue] = useState(initialValue);

    const increment = useCallback(() => {
        setValue(v => v + 1);
    }, []);

    const decrement = useCallback(() => {
        setValue(v => v - 1);
    }, []);

    const overwrite = v => setValue(v);
    const reset = () => setValue(initialValue);

    return [value, increment, decrement, overwrite, reset];
}

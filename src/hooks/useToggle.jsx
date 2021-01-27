import { useState, useCallback } from 'react';

/**
 * React hook to toggle a boolean
 * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
 * @since 1.0.0
 * @param {Boolean} [initialValue=false] 
 * @return {Array} `value` and `toggle` function
 */
export default function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(() => {
        setValue((v) => !v);
    }, []);
    return [value, toggle];
}

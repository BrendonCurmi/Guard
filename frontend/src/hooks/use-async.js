import React, { useEffect } from "react";

/**
 * Hook for wrapping useEffect hook to prevent async function outcome
 * being executed if component has been unmounted.
 * Adapted from https://stackoverflow.com/a/60907638
 * @param asyncFn the async function reference.
 * @param onSuccess the success function reference.
 * @param deps the dependency list. Empty by default.
 */
const useAsync = (asyncFn, onSuccess, deps = []) => {
    useEffect(() => {
        let isMounted = true;
        asyncFn().then(data => {
            if (isMounted) onSuccess(data);
        });
        return () => {
            isMounted = false
        };
    }, deps);
    // }, [asyncFn, onSuccess]);
};

export default useAsync;

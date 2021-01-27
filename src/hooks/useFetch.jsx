/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import request from 'superagent';

import useToggle from './useToggle';
import { backendURL } from 'configVariables';

export default function useFetch(initLoadingState = false, baseURL = backendURL, timeout = 10000) {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState();
    const [status, setStatus] = useState(200);
    const [loading, toggleLoading] = useToggle(initLoadingState);

    const fetch = async (endpoint, isRefresh) => {
        if(!initLoadingState) toggleLoading();
        setStatus(200);
        setResponse([]);
        setError();
        try {
            const res = await request('GET', baseURL + endpoint)
                .withCredentials()
                .timeout(timeout);
            if(res.body.ResponseCode != '1') throw res.body;
            setResponse(res.body?.response || res.body);
        } catch (err) {
            setResponse(err.response?.body || err);
            setError(err.response?.body?.ResponseMessage || err.ResponseMessage || 'Token is Invalid');
            setStatus(err.status || err.ResponseCode);
        }
        toggleLoading();
    };

    return [fetch, loading, response, status, error];
}

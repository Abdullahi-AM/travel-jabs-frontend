import { useState, useEffect } from 'react';
import API from './API.js';

const useLoad = (loadEndpoint) => {
  const [records, setRecords] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading records ...');

  const loadRecords = async (endpoint) => {
    const response = await API.get(endpoint);
    if (response.isSuccess) {
      setRecords(response.result);
      setLoadingMessage('');
    } else {
      setLoadingMessage(response.message);
    }
  };

  useEffect(() => {
    if (loadEndpoint) {
      loadRecords(loadEndpoint);
    }
  }, [loadEndpoint]);

  return [records, loadingMessage, loadRecords];
};

export default useLoad;
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";

const dataFetchReducer = (state, action) => {};

const useMoonDataApi = (initMoonData) => {
  const [moonImageUrl, setMoonImageUrl] = useState(null);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoadingMoon: false,
    isErrorMoon: false,
    data: initMoonData,
  });

  useEffect(() => {
    const fetchMoonData = async () => {
      dispatch({type: 'FETCH-INIT'});
      try{
        const result = await axios(moonImageUrl);
        
      }
    }
  
    return () => {
      second
    }
  }, [third])
  
};

export default useMoonDataApi;

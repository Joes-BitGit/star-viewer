import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../app/config.json";

export const useStarChartApi = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [starParameters, setStarParameters] = useState({
    style: "default",
    constellation: "and",
  });
  console.log("START OF SCRIPT: ", starParameters);

  useEffect(() => {
    async function getStarChart() {
      setIsError(false);
      setLoading(true);

      let isMounted = true;
      try {
        const response = await axios.post(
          `${Config.apiEndpoint}/api/v2/studio/star-chart`,
          // should be able to make this entire header editable to the user
          {
            style: starParameters.style,
            observer: {
              latitude: 33.775867,
              longitude: -84.39733,
              date: "2019-12-20",
            },
            view: {
              type: "constellation",
              parameters: {
                constellation: starParameters.constellation, // 3 letter constellation id
              },
            },
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              Authorization: `Basic ${btoa(
                `${Config.appId}:${Config.appSecret}`
              )}`,
            },
          }
        );
        if (isMounted) setImageUrl(response.data.data.imageUrl);

        setLoading(false);
      } catch (error) {
        setIsError(true);
        console.log("post error in starform");
      }
      return () => {
        isMounted = false;
      };
    }
    getStarChart();
  }, [starParameters]);

  return [{ imageUrl, loading, isError }, setStarParameters];
};

import axios from "axios";
import { useEffect, useState } from "react";
import Config from "../app/config.json";

// initData is an object passed in from the app component
export const useStarChartApi = (initData) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [starParameters, setStarParameters] = useState({
    style: initData.style,
    constellation: initData.constellation,
  });
  // console.log("START OF SCRIPT: ", starParameters);

  useEffect(() => {
    async function getStarChart() {
      setIsError(false);
      setLoading(true);

      let isCancelled = false;

      try {
        const response = await axios.post(
          `${Config.apiEndpoint}/api/v2/studio/star-chart`,
          // should be able to make this entire header editable to the user
          {
            style: starParameters.style,
            observer: {
              latitude: 33.775867,
              longitude: -114.39733,
              date: "2021-12-20",
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
        if (!isCancelled) setImageUrl(response.data.data.imageUrl);

        setLoading(false);
      } catch (error) {
        setIsError(true);
        console.log("post error in starform");
      }
      return () => {
        isCancelled = true;
      };
    }
    getStarChart();
  }, [starParameters]);

  return [{ imageUrl, loading, isError }, setStarParameters];
};

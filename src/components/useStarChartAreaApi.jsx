import axios from "axios";
import { useEffect, useState } from "react";
import Config from "../app/config.json";

// initData is an object passed in from the app component
export const useStarChartAreaApi = (initData) => {
  const [imageAreaUrl, setImageAreaUrl] = useState(null);
  const [loadingArea, setLoading] = useState(false);
  const [isErrorArea, setIsError] = useState(false);
  const [starParameters, setStarParameters] = useState({
    rightAscension: initData.rightAscension,
    declination: initData.declination,
    view: initData.view,
  });

  useEffect(() => {
    async function getStarChart() {
      setIsError(false);
      setLoading(true);

      let isCancelled = false;
      //  does not accept a date change returns 422 status code
      try {
        const response = await axios.post(
          `${Config.apiEndpoint}/api/v2/studio/star-chart`,
          // should be able to make this entire header editable to the user
          {
            observer: {
              latitude: 34.775867,
              longitude: -118.39733,
              date: "2021-12-25",
            },
            view: {
              type: starParameters.view,
              parameters: {
                position: {
                  equatorial: {
                    rightAscension: starParameters.rightAscension,
                    declination: starParameters.declination,
                  },
                },
                zoom: 4, //optional
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
        console.log("current star Parameters:", starParameters);
        if (!isCancelled) setImageAreaUrl(response.data.data.imageUrl);

        setLoading(false);
      } catch (error) {
        setIsError(true);
        console.log("post error in areaform");
      }
      return () => {
        isCancelled = true;
      };
    }
    getStarChart();
  }, [starParameters]);

  return [{ imageAreaUrl, loadingArea, isErrorArea }, setStarParameters];
};

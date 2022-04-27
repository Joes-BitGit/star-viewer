import axios from "axios";
import React, { useEffect, useState } from "react";
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

      let isMounted = true;

      try {
        const response = await axios.post(
          `${Config.apiEndpoint}/api/v2/studio/star-chart`,
          // should be able to make this entire header editable to the user
          {
            style: "inverted",
            observer: {
              latitude: 33.775867,
              longitude: -84.39733,
              date: "2019-12-20",
            },
            view: {
              type: "area",
              parameters: {
                position: {
                  equatorial: {
                    rightAscension: 14.83,
                    declination: -15.23,
                  },
                },
                zoom: 3, //optional
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
        if (isMounted) setImageAreaUrl(response.data.data.imageUrl);

        setLoading(false);
      } catch (error) {
        setIsError(true);
        console.log("post error in areaform");
      }
      return () => {
        isMounted = false;
      };
    }
    getStarChart();
  }, [starParameters]);

  return [{ imageAreaUrl, loadingArea, isErrorArea }, setStarParameters];
};

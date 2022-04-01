import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../app/config.json";

export const useStarChartApi = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState("and");
  const [starStyle, setStarStyle] = useState("default");

  useEffect(() => {
    async function getStarChart() {
      setLoading(true);
      let isMounted = true;
      try {
        const response = await axios.post(
          `${Config.apiEndpoint}/api/v2/studio/star-chart`,
          // should be able to make this entire header editable to the user
          {
            style: starStyle,
            observer: {
              latitude: 33.775867,
              longitude: -84.39733,
              date: "2019-12-20",
            },
            view: {
              type: "constellation",
              parameters: {
                constellation: submitted, // 3 letter constellation id
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
        console.log("post error in starform");
      }
      return () => {
        isMounted = false;
      };
    }
    getStarChart();
  }, [submitted]);

  return [{ imageUrl, loading }, setSubmitted, setStarStyle];
};

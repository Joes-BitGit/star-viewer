import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Config from "./app/config.json";
import { StarForm } from "./components/StarForm";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // axios serves in a similar way to the fetch api that is native to the browser
    async function getBodies() {
      try {
        const response = await axios.get(
          `${Config.apiEndpoint}/api/v2/bodies`,
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              Authorization: `Basic ${btoa(
                `${Config.appId}:${Config.appSecret}`
              )}`,
            },
          }
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {}
    }

    getBodies();
    // axios
    //   .get(`${Config.apiEndpoint}/api/v2/bodies`, {
    //     headers: {
    //       "X-Requested-With": "XMLHttpRequest",
    //       Authorization: `Basic ${btoa(`${Config.appId}:${Config.appSecret}`)}`,
    //     },
    //   })
    //   .then((response) => {
    //     setData(response.data.data);
    //     setLoading(false);
    //   });

    // axios
    //   .post(
    //     `${Config.apiEndpoint}/api/v2/studio/star-chart`,
    //     {
    //       style: "default",
    //       observer: {
    //         latitude: 33.775867,
    //         longitude: -84.39733,
    //         date: "2019-12-20",
    //       },
    //       view: {
    //         type: "constellation",
    //         parameters: {
    //           constellation: "vul", // 3 letter constellation id
    //         },
    //       },
    //     },
    //     {
    //       headers: {
    //         "X-Requested-With": "XMLHttpRequest",
    //         Authorization: `Basic ${btoa(
    //           `${Config.appId}:${Config.appSecret}`
    //         )}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     setImageUrl(response.data.data.imageUrl);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : data ? (
        <ul>
          {data.bodies.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <div>no data</div>
      )}
      {loading ? <div>Loading...</div> : <StarForm />}
    </>
  );
}

export default App;

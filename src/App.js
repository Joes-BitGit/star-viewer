import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Config from "./app/config.json";

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(`${Config.apiEndpoint}/api/v2/bodies`);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Config.apiEndpoint}/api/v2/bodies`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Basic ${btoa(`${Config.appId}:${Config.appSecret}`)}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      });

    axios
      .post(
        `${Config.apiEndpoint}/api/v2/studio/star-chart`,
        {
          style: "inverted",
          observer: {
            latitude: 33.775867,
            longitude: -84.39733,
            date: "2019-12-20",
          },
          view: {
            type: "constellation",
            parameters: {
              constellation: "aqr", // 3 letter constellation id
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
      )
      .then((response) => {
        setImageUrl(response.data.data.imageUrl);
        setLoading(false);
      });
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
      {loading ? (
        <div>Loading...</div>
      ) : imageUrl ? (
        <img alt="constellation" src={imageUrl} />
      ) : (
        <div>no data</div>
      )}
      {console.log(imageUrl)}
    </>
  );
}

export default App;

import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Config from "./app/config.json";

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(`${Config.apiEndpoint}/api/v2/bodies`);
  const [loading, setLoading] = useState(false);

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
    </>
  );
}

export default App;

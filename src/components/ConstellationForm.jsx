import React from "react";
import { constellations, StarStyles } from "../data/Constellations";

export const ConstellationForm = ({
  query,
  setQuery,
  setStarStyle,
  starStyle,
}) => {
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleStyleChange = (event) => {
    setStarStyle(event.target.value);

    console.log("style: ", event.target.value);
  };

  return (
    <>
      <label>
        Pick your Constellation:
        <select value={query} onChange={(e) => handleChange(e)}>
          {/* You don't need to check hasOwnProperty when iterating on keys if you're using a simple object or one you made yourself with {}. */}
          {Object.keys(constellations).map((item) => (
            <option value={item} key={item}>
              {constellations[item]}
            </option>
          ))}
        </select>
      </label>
      <label>
        Pick Your Style:
        <select value={starStyle} onChange={(e) => handleStyleChange(e)}>
          {StarStyles.map((styletype) => (
            <option key={styletype}>{styletype}</option>
          ))}
        </select>
      </label>
    </>
  );
};

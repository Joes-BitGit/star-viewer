import React, { useState } from "react";
import { useStarChartApi } from "./useStarChartApi.jsx";

import { AreaForm } from "./AreaForm.jsx";
import { useStarChartAreaApi } from "./useStarChartAreaApi.jsx";
import { constellations, StarStyles } from "../data/Constellations";

export const StarForm = () => {
  const [query, setQuery] = useState("and");
  const [viewType, setViewType] = useState("area");

  const [starStyle, setStarStyle] = useState("default");
  const [{ imageUrl, loading, isError }, doParameters] = useStarChartApi({
    style: "default",
    constellation: "and",
    view: "constellation",
  });
  const [{ imageAreaUrl, loadingArea, isErrorArea }, doAreaParameters] =
    useStarChartAreaApi({
      rightAscension: 18.23,
      declination: -45.21,
      view: "area",
    });

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log("constellation id: ", event.target.value);
  };

  const handleSubmit = (event) => {
    if (viewType === "constellation") {
      doParameters({ style: starStyle, constellation: query });
    } else {
      doAreaParameters({
        rightAscension: 18.83,
        declination: -45.21,
        view: viewType,
      });
    }

    event.preventDefault();
    // alert("You have chosen: " + constellations[query]);
  };

  const handleStyleChange = (event) => {
    setStarStyle(event.target.value);

    console.log("style: ", event.target.value);
  };

  const handleViewForm = (event) => {
    setViewType(event.target.value);
  };
  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      {loading ? (
        <div>Loading for you lad...</div>
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              Pick View Type:
              <select value={viewType} onChange={(e) => handleViewForm(e)}>
                <option value="constellation">constellation</option>
                <option value="area">area</option>
              </select>
            </label>
            <br />
            {/* if view type is constellation do this: */}

            {viewType === "constellation" ? (
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
                  <select
                    value={starStyle}
                    onChange={(e) => handleStyleChange(e)}
                  >
                    {StarStyles.map((styletype) => (
                      <option key={styletype}>{styletype}</option>
                    ))}
                  </select>
                </label>
              </>
            ) : (
              // Else if view type is area then find out the users ra, dec, and zoom
              <AreaForm />
            )}

            <input type="submit" value="Submit" />
          </form>
          {/* Should i not render anything initally? */}
          <img
            src={viewType === "constellation" ? imageUrl : imageAreaUrl}
            alt={`constellation ${constellations[query]}`}
          />
        </>
      )}
    </>
  );
};

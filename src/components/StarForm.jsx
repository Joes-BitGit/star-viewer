import React, { useState } from "react";
import { useStarChartApi } from "./useStarChartApi.jsx";
import { ConstellationForm } from "./ConstellationForm.jsx";
import { constellations } from "../data/Constellations.js";
import { AreaForm } from "./AreaForm.jsx";
import { useStarChartAreaApi } from "./useStarChartAreaApi.jsx";

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
      rightAscension: 14.23,
      declination: -15.21,
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
        rightAscension: 14.83,
        declination: -15.21,
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
              <ConstellationForm
                handleChange={handleChange}
                query={query}
                handleStyleChange={handleStyleChange}
                starStyle={starStyle}
              />
            ) : (
              // Else if view type is area then find out the users ra, dec, and zoom
              <AreaForm />
            )}

            <input type="submit" value="Submit" />
          </form>
          {/* Should i not render anything initally? */}
          <img
            src={imageAreaUrl}
            alt={`constellation ${constellations[query]}`}
          />
        </>
      )}
    </>
  );
};

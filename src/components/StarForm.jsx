import React, { useState } from "react";
import { useStarChartApi } from "./useStarChartApi.jsx";
import { ConstellationForm } from "./ConstellationForm.jsx";
import { constellations } from "../data/Constellations.js";

export const StarForm = () => {
  const [query, setQuery] = useState("and");
  const [viewType, setViewType] = useState("constellation");

  const [starStyle, setStarStyle] = useState("default");
  const [{ imageUrl, loading, isError }, doParameters] = useStarChartApi({
    style: "default",
    constellation: "and",
  });

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log("constellation id: ", event.target.value);
  };

  const handleSubmit = (event) => {
    // doSubmit(query);
    doParameters({ style: starStyle, constellation: query });

    event.preventDefault();
    alert("You have chosen: " + constellations[query]);
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
                <option value={viewType}>area</option>
                <option value={viewType}>constellation</option>
              </select>
            </label>
            <br />
            {/* if view type is constellation do this: */}
            <ConstellationForm
              handleChange={handleChange}
              query={query}
              handleStyleChange={handleStyleChange}
              starStyle={starStyle}
            />

            {/* Else if view type is area then find out the users ra, dec, and zoom */}
            <input type="submit" value="Submit" />
          </form>
          {/* Should i not render anything initally? */}
          <img src={imageUrl} alt={`constellation ${constellations[query]}`} />
        </>
      )}
    </>
  );
};

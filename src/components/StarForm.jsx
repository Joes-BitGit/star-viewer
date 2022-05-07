import React, { useState } from "react";
import { useStarChartApi } from "./useStarChartApi.jsx";

import { AreaForm } from "./AreaForm.jsx";
import { useStarChartAreaApi } from "./useStarChartAreaApi.jsx";
import { constellations } from "../data/Constellations";
import { ConstellationForm } from "./ConstellationForm.jsx";

import useIsMount from "./useIsMount.jsx";

export const StarForm = () => {
  const [query, setQuery] = useState("and");
  const [viewType, setViewType] = useState("constellation");
  const [starStyle, setStarStyle] = useState("default");

  const [rightAscension, setRightAscension] = useState(18.23);
  const [declination, setDeclination] = useState(-45.23);

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

  const handleSubmit = (event) => {
    if (viewType === "constellation") {
      doParameters({ style: starStyle, constellation: query });
    } else {
      doAreaParameters({
        rightAscension: rightAscension,
        declination: declination,
        view: viewType,
      });
    }

    event.preventDefault();
  };

  const handleStyleChange = (event) => {
    setStarStyle(event.target.value);

    console.log("style: ", event.target.value);
  };

  const handleViewForm = (event) => {
    setViewType(event.target.value);
  };

  const isFirstRender = useIsMount();
  return (
    <>
      {(isError || isErrorArea) && <div>Something went wrong ...</div>}
      {loading || loadingArea ? (
        viewType === "area" ? (
          <div>Loading the Area for you lad...</div>
        ) : (
          <div>
            Loading the Constellation {constellations[query]} you lad...
          </div>
        )
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
                query={query}
                setQuery={setQuery}
                handleStyleChange={handleStyleChange}
                starStyle={starStyle}
              />
            ) : (
              // Else if view type is area then find out the users ra, dec, and zoom
              <AreaForm
                rightAscension={rightAscension}
                setRightAscension={setRightAscension}
                declination={declination}
                setDeclination={setDeclination}
              />
            )}

            <input type="submit" value="Submit" />
          </form>

          {!isFirstRender && (
            <img
              src={viewType === "constellation" ? imageUrl : imageAreaUrl}
              alt={
                viewType === "constellation"
                  ? `constellation ${constellations[query]}`
                  : `part of the night sky given ra and dec coordinates`
              }
            />
          )}
        </>
      )}
    </>
  );
};

import React, { useState } from "react";
import { useStarChartApi } from "./useStarChartApi.jsx";

import { AreaForm } from "./AreaForm.jsx";
import { useStarChartAreaApi } from "./useStarChartAreaApi.jsx";
import { constellations } from "../data/Constellations";
import { ConstellationForm } from "./ConstellationForm.jsx";

import useIsMount from "./useIsMount.jsx";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { MoonForm } from "./MoonForm.jsx";

export const StarForm = () => {
  const [query, setQuery] = useState("and");
  const [viewType, setViewType] = useState("constellation");
  const [starStyle, setStarStyle] = useState("default");

  // not all values will work given the date and location
  const [rightAscension, setRightAscension] = useState(20.23);
  const [declination, setDeclination] = useState(-45.23);

  //moon states
  const [format, setFormat] = useState("png");
  const [style, setStyle] = useState("default");
  const [background, setBackground] = useState("stars");
  const [orientation, setOrientation] = useState("portrait-simple");
  const [type, setType] = useState("north-up");

  const [{ imageUrl, loading, isError }, doParameters] = useStarChartApi({
    style: "default",
    constellation: "and",
    view: "constellation",
  });
  // const [{ imageAreaUrl, loadingArea, isErrorArea }, doAreaParameters] =
  //   useStarChartAreaApi({
  //     rightAscension: 20.23,
  //     declination: -45.23,
  //     view: "area",
  //   });

  const handleSubmit = (event) => {
    console.log("at time of submission");
    console.log("constellaiton: ", starStyle, query);
    console.log("area: ", rightAscension, declination, viewType);

    if (viewType === "constellation") {
      doParameters({ style: starStyle, constellation: query });
    } else {
      alert("doMoonParameters!");
      // doAreaParameters({
      //   rightAscension: rightAscension,
      //   declination: declination,
      //   view: viewType,
      // });
    }

    event.preventDefault();
  };

  const handleViewForm = (event) => {
    setViewType(event.target.value);
  };

  const isFirstRender = useIsMount();
  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      {loading ? (
        viewType === "constellation" ? (
          <div>
            Loading the Constellation {constellations[query]} for you lad...
          </div>
        ) : (
          <div>Loading the Moon for you lad...</div>
        )
      ) : (
        <>
          <Container>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <FloatingLabel
                label="Pick View Type:"
                className="mb-3 border border-primary"
              >
                <Form.Select
                  aria-label="form select"
                  value={viewType}
                  onChange={(e) => handleViewForm(e)}
                >
                  <option value="constellation">Constellation</option>
                  <option value="moon">Moon</option>
                </Form.Select>
              </FloatingLabel>
              {/* if view type is constellation do this: */}
              <Container className="mb-3 pt-3 bg-light rounded border border-dark">
                {viewType === "constellation" ? (
                  <ConstellationForm
                    query={query}
                    setQuery={setQuery}
                    setStarStyle={setStarStyle}
                    starStyle={starStyle}
                  />
                ) : (
                  // Else if view type is area then find out the users ra, dec, and zoom

                  <MoonForm
                    format={format}
                    setFormat={setFormat}
                    style={style}
                    setStyle={setStyle}
                    background={background}
                    setBackground={setBackground}
                    orientation={orientation}
                    setOrientation={setOrientation}
                    type={type}
                    setType={setType}
                  />
                )}

                <Button variant="primary" type="submit" className="mb-3">
                  Submit
                </Button>
              </Container>
            </Form>

            {!isFirstRender ? (
              <Container className="text-center mb-3">
                <Image
                  fluid
                  rounded
                  className="border border-info"
                  src={imageUrl}
                  // src={viewType === "constellation" ? imageUrl : imageAreaUrl}
                  alt={
                    viewType === "constellation"
                      ? `constellation ${constellations[query]}`
                      : `part of the night sky given ra and dec coordinates`
                  }
                />
              </Container>
            ) : (
              console.log("first render")
            )}
          </Container>
        </>
      )}
    </>
  );
};

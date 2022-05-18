import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
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
      <Container>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="formConstellation">
            <Form.Label>Pick Your Constellation:</Form.Label>
            <Form.Select value={query} onChange={(e) => handleChange(e)}>
              {/* You don't need to check hasOwnProperty when iterating on keys if you're using a simple object or one you made yourself with {}. */}
              {Object.keys(constellations).map((item) => (
                <option value={item} key={item}>
                  {constellations[item]}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-muted">
              Pick One You've Never Seen!
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formStyle">
            <Form.Label>Pick Your Style:</Form.Label>
            <Form.Select
              value={starStyle}
              onChange={(e) => handleStyleChange(e)}
            >
              {StarStyles.map((styletype) => (
                <option key={styletype}>{styletype}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
      </Container>
    </>
  );
};

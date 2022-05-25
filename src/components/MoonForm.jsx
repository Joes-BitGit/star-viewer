import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { backgroundStyle, moonFormat, moonStyle } from "../data/Constellations";

export const MoonForm = ({
  format,
  setFormat,
  style,
  setStyle,
  background,
  setBackground,
  type,
  setType,
  orientation,
  setOrientation,
}) => {
  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleMoonChange = (event) => {
    setStyle(event.target.value);

    console.log("style: ", event.target.value);
  };

  const handleBackgroundChange = (event) => {
    setBackground(event.target.value);
  };

  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formMoon">
          <Form.Label>Pick Your Moon:</Form.Label>
          {/* state needs to be updated */}
          <Form.Select value={format} onChange={(e) => handleFormatChange(e)}>
            {moonFormat.map((moonFormat) => (
              <option key={moonFormat}>format</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formMoonStyle">
          <Form.Label>Pick Your Moon Style:</Form.Label>
          {/* state must be updated */}
          <Form.Select value={style} onChange={(e) => handleMoonChange(e)}>
            {moonStyle.map((moonStyle) => (
              <option key={moonStyle}>{moonStyle}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formBackgroundStyle">
          <Form.Label>Pick Your Background Style:</Form.Label>
          {/* state must be updated */}
          <Form.Select
            value={background}
            onChange={(e) => handleBackgroundChange(e)}
          >
            {backgroundStyle.map((backgroundStyle) => (
              <option key={backgroundStyle}>{backgroundStyle}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </>
  );
};

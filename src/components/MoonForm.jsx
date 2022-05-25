import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  backgroundStyle,
  moonFormat,
  moonOrientation,
  moonStyle,
  moonType,
} from "../data/Constellations";

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

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleMoonOrientation = (event) => {
    setOrientation(event.target.value);
  };

  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formMoon">
          <Form.Label>Pick Your Moon:</Form.Label>
          <Form.Select value={format} onChange={(e) => handleFormatChange(e)}>
            {moonFormat.map((moonFormat) => (
              <option key={moonFormat}>{moonFormat}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formMoonStyle">
          <Form.Label>Pick Your Moon Style:</Form.Label>
          <Form.Select value={style} onChange={(e) => handleMoonChange(e)}>
            {moonStyle.map((moonStyle) => (
              <option key={moonStyle}>{moonStyle}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formBackgroundStyle">
          <Form.Label>Pick Your Background Style:</Form.Label>
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
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formMoonType">
          <Form.Label>Pick Your Moon Type:</Form.Label>
          <Form.Select value={type} onChange={(e) => handleTypeChange(e)}>
            {moonType.map((moonType) => (
              <option key={moonType}>{moonType}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formMoonStyle">
          <Form.Label>Pick Your Moon Style:</Form.Label>
          {/* state must be updated */}
          <Form.Select
            value={orientation}
            onChange={(e) => handleMoonOrientation(e)}
          >
            {moonOrientation.map((moonOrientation) => (
              <option key={moonOrientation}>{moonOrientation}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </>
  );
};

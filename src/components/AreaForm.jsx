import React, { useState } from "react";

export const AreaForm = ({
  rightAscension,
  setRightAscension,
  declination,
  setDeclination,
}) => {
  const handleRAChange = (event) => {
    setRightAscension(event.target.value);
  };
  const handleDecChange = (event) => {
    setDeclination(event.target.value);
  };
  return (
    <>
      <label>
        Right Ascension:
        <input
          name="rightAscension"
          type="number"
          value={rightAscension}
          onChange={(e) => handleRAChange(e)}
        />
      </label>
      <label>
        Declination:
        <input
          name="declination"
          type="number"
          value={declination}
          onChange={(e) => handleDecChange(e)}
        />
      </label>
    </>
  );
};

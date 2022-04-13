import React from "react";

export const AreaForm = () => {
  function getLocation() {
    navigator.geolocation.getCurrentPosition(showLoc);
  }
  function showLoc(pos) {
    let latitude = `${pos.coords.latitude}`;
    let longitude = `${pos.coords.longitude}`;
    let coordinates = { latitude, longitude };
    return coordinates;
  }
  return (
    <>
      <label>
        Equatorial Position:
        <button onClick={() => getLocation}>Show Location</button>
        <div className="">latitude: 33.775867,</div>
        <div className="">longitude: -84.39733,</div>
      </label>
    </>
  );
};

import React, { useState } from "react";
import { useStarChartApi } from "./useStarChartApi.jsx";

export const StarForm = () => {
  const [query, setQuery] = useState("and");
  const [viewType, setViewType] = useState("constellation");

  const [starStyle, setStarStyle] = useState("default");
  const [{ imageUrl, loading }, doParameters] = useStarChartApi();

  // best way to store a static object?
  const constellations = {
    and: "Andromeda",
    ant: "Antlia",
    aps: "Apus",
    aqr: "Aquarius",
    aql: "Aquila",
    ara: "Ara",
    ari: "Aries",
    aur: "Auriga",
    boo: "Boötes",
    cae: "Caelum",
    cam: "Camelopardalis",
    cnc: "Cancer",
    cvn: "Canes Venatici",
    cma: "Canis Major",
    cmi: "Canis Minor",
    cap: "Capricornus",
    car: "Carina",
    cas: "Cassiopeia",
    cen: "Centaurus",
    cep: "Cepheus",
    cet: "Cetus",
    cha: "Chamaeleon",
    cir: "Circinus",
    col: "Columba",
    com: "Coma Berenices",
    cra: "Corona Austrina",
    crb: "Corona Borealis",
    crv: "Corvus",
    crt: "Crater",
    cru: "Crux",
    cyg: "Cygnus",
    del: "Delphinus",
    dor: "Dorado",
    dra: "Draco",
    equ: "Equuleus",
    eri: "Eridanus",
    for: "Fornax",
    gem: "Gemini",
    gru: "Grus",
    her: "Hercules",
    hor: "Horologium",
    hya: "Hydra",
    hyi: "Hydrus",
    ind: "Indus",
    lac: "Lacerta",
    leo: "Leo",
    lmi: "Leo Minor",
    lep: "Lepus",
    lib: "Libra",
    lup: "Lupus",
    lyn: "Lynx",
    lyr: "Lyra",
    men: "Mensa",
    mic: "Microscopium",
    mon: "Monoceros",
    mus: "Musca",
    nor: "Norma",
    oct: "Octans",
    oph: "Ophiuchus",
    ori: "Orion",
    pav: "Pavo",
    peg: "Pegasus",
    per: "Perseus",
    phe: "Phoenix",
    pic: "Pictor",
    psc: "Pisces",
    psa: "Piscis Austrinus",
    pup: "Puppis",
    pyx: "Pyxis",
    ret: "Reticulum",
    sge: "Sagitta",
    sgr: "Sagittarius",
    sco: "Scorpius",
    scl: "Sculptor",
    sct: "Scutum",
    ser: "Serpens Caput",
    ser: "Serpens Cauda",
    sex: "Sextans",
    tau: "Taurus",
    tel: "Telescopium",
    tri: "Triangulum",
    tra: "Triangulum Australe",
    tuc: "Tucana",
    uma: "Ursa Major",
    umi: "Ursa Minor",
    vel: "Vela",
    vir: "Virgo",
    vol: "Volans",
    Vul: "Vulpecula",
  };
  const StarStyles = ["default", "inverted", "navy", "red"];

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
  return loading ? (
    <div>Lading...</div>
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
          <select value={starStyle} onChange={(e) => handleStyleChange(e)}>
            {StarStyles.map((styletype) => (
              <option key={styletype}>{styletype}</option>
            ))}
          </select>
        </label>
        {/* Else if view type is area then find out the users ra, dec, and zoom */}
        <input type="submit" value="Submit" />
      </form>
      <img src={imageUrl} alt={`constellation ${constellations[query]}`} />
    </>
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../app/config.json";

export const StarForm = () => {
  const [query, setQuery] = useState("and");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(query);

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

  useEffect(() => {
    async function getStarChart() {
      setLoading(true);
      let isMounted = true;
      try {
        const response = await axios.post(
          `${Config.apiEndpoint}/api/v2/studio/star-chart`,
          // should be able to make this entire header editable to the user
          {
            style: "default",
            observer: {
              latitude: 33.775867,
              longitude: -84.39733,
              date: "2019-12-20",
            },
            view: {
              type: "constellation",
              parameters: {
                constellation: submitted, // 3 letter constellation id
              },
            },
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              Authorization: `Basic ${btoa(
                `${Config.appId}:${Config.appSecret}`
              )}`,
            },
          }
        );
        if (isMounted) setImageUrl(response.data.data.imageUrl);

        setLoading(false);
      } catch (error) {
        console.log("post error in starform");
      }
      return () => {
        isMounted = false;
      };
    }
    getStarChart();
  }, [submitted]);

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    setSubmitted(query);
    event.preventDefault();

    alert("You have chosen: " + constellations[query]);
  };

  return loading ? (
    <div>Lading...</div>
  ) : (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Pick your Constellation:
          <select value={query} onChange={(e) => handleChange(e)}>
            {/* <option value={query} aria-disabled disabled>
              {constellations[query]}
            </option> */}
            {/* You don't need to check hasOwnProperty when iterating on keys if you're using a simple object or one you made yourself with {}. */}
            {Object.keys(constellations).map((item) => (
              <option value={item} key={item}>
                {constellations[item]}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <img src={imageUrl} alt={`constellation ${constellations[query]}`} />
    </>
  );
};

import React, { useState } from "react";
import BirthForm from "./components/BirthForm";
import ChartDisplay from "./components/ChartDisplay";
import { getHoroscope } from "./api";
import PlanetInterpretations from "./components/PlanetInterpretations";

export default function App() {
  const [horoscope, setHoroscope] = useState(null);

  const handleFormSubmit = async (formData) => {
    const data = await getHoroscope(formData);
    setHoroscope(data);
  };

  return (
    <div className="App">
      <h1>🪐 Vedic Horoscope Generator</h1>
      <BirthForm onSubmit={handleFormSubmit} />
      <ChartDisplay horoscope={horoscope} />
      <PlanetInterpretations horoscope={horoscope} />
    </div>
  );
}

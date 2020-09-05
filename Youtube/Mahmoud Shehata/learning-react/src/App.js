import React from "react";
import WeatherEngine from "./Components/WeatherEngine.js";
import "./App.css";

function App() {
  return (
    <div>
      <WeatherEngine defaultLocation="Cairo,eg" />
      <WeatherEngine defaultLocation="sydney,au" />
      <WeatherEngine defaultLocation="washington,us" />
    </div>
  );
}

export default App;

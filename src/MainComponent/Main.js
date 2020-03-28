import React, { useState } from "react";
import "./Main.css";
import MainCovid19Data from "./MainCovid19DataComponent/MainCovid19Data";

export default function Main() {
  const [countryToBeSearched, setCountryToBeSearched] = useState("");

  async function checkValueAndEnterKey(ev) {
    if (ev.key === "Enter")
      setCountryToBeSearched(await ev.target.value.replace(/\W/g, ""));
  }

  return (
    <>
      <div className="main-div">
        <div className="div-label-and-input">
          <h1>COVID-19 | REPORTS</h1>
          <br />
          <label>
            Insert a country name and press enter (you can do that on your phone
            too)!
          </label>
          <small>
            <span className="underline">Things to keep in mind:</span>
            <ul>
              <li>
                If data for the specified country is not found, the sum of all
                the world's cases will be returned.
              </li>
              <li>This app is in english, so the name of the country must be as well.</li>
              <li>And if this country has five or less provinces/states listed, I'll list them here for you!</li>
            </ul>
          </small>
          <input
            id="input-search"
            placeholder="Insert a country name here!"
            autoComplete="off"
            onKeyPress={ev => {
              checkValueAndEnterKey(ev);
            }}
          />
        </div>
      </div>
      <br />
      <MainCovid19Data country={countryToBeSearched}></MainCovid19Data>
    </>
  );
}

import React, { useState } from "react";
import "./Main.css";
import MainCovid19Data from "./MainCovid19DataComponent/MainCovid19Data";

export default function Main() {
  const [inputValue, setInputValue] = useState("");
  const [countryToBeSearched, setCountryToBeSearchedThenAlertChildComponent] = useState("");

  function setCountry(ev) {
      setInputValue(ev.target.value.replace(/\W/g, ""));
  }

  async function lookupCountry() {
      setCountryToBeSearchedThenAlertChildComponent(inputValue);
  }

  return (
    <>
      <div className="main-div">
        <div className="div-label-and-input">
          <h1>COVID-19: Cases</h1>
          <br />
          <form>
            <fieldset>
              <label>
                Insert a country name and press enter (you can do that on your phone
                too).
              </label>
              <small>
                <ul>
                  <li>
                    Keep in mind that if data for the specified country is not found, the sum of all
                    the world's cases will be returned.
                  </li>
                </ul>
              </small>
              <input
                id="input-search"
                placeholder="Insert a country name here!"
                autoComplete="off"
                onKeyPress={ev => {
                  setCountry(ev);
                }}
              />
            </fieldset>
            <button type="button" onClick={() => { lookupCountry() }}>Search</button>
          </form>
        </div>
      </div>
      <br />
      <MainCovid19Data country={countryToBeSearched}></MainCovid19Data>
    </>
  );
}

import React, { useState, useEffect } from "react";
import config from "../../Config/ConfigurationVariables";
import turnFirstLetterIntoUpperCase from "../../Utils/turnFirstLetterIntoUpperCase";

import "./MainCovid19Data.css";

import axios from "axios";

export default function MainCovid19Data({ country }) {
  let totalConfirmed = 0;
  let totalDeaths = 0;
  let totalRecovered = 0;

  const [confirmed, setConfirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [isLoading, setIsLoading] = useState("");
  const [covid19Data, setCovid19Data] = useState("");

  useEffect(() => {
    let countryValueIsNotEmpty = country ? true : false;

    async function checkCountryValueToMakeRequest() {
      if (countryValueIsNotEmpty)
        if (country.toLowerCase() === "usa")
          // The API only accepts countries with the first letter in upper case, unless it's USA.
          await getCovid19DataFromSpecifiedCountry("USA");
        else {
          let countryWithOnlyFirstLetterInUpperCase = await turnFirstLetterIntoUpperCase(
            country
          );
          await getCovid19DataFromSpecifiedCountry(
            countryWithOnlyFirstLetterInUpperCase
          );
        }
    }

    checkCountryValueToMakeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  async function getCovid19DataFromSpecifiedCountry(country) {
    setIsLoading(true);

    let getCovid19StatsResponse = await getCovid19Stats(country);

    if (!getCovid19StatsResponse) return;

    setAllExistingVariablesStates(getCovid19StatsResponse.data);
  }

  async function getCovid19Stats(country) {
    let apiResponse;

    apiResponse = await callRapidApiUrl(country);

    apiResponse.data.covid19Stats.forEach(async currentProvinceOrState => {
      await sumTotalOfCases(
        currentProvinceOrState.confirmed,
        currentProvinceOrState.deaths,
        currentProvinceOrState.recovered
      );
    });
    return apiResponse;
  }

  async function callRapidApiUrl(country) {
    let apiCallResponse = await axios.get(
      "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-rapidapi-host": config.xRapidAPIHost,
          "x-rapidapi-key": config.xRapidAPIKey
        },
        params: {
          country
        }
      }
    );
    return apiCallResponse.data;
  }

  async function sumTotalOfCases(confirmed, deaths, recovered) {
    totalConfirmed += confirmed;
    totalDeaths += deaths;
    totalRecovered += recovered;
  }

  async function setAllExistingVariablesStates(covid19CasesAndStats) {
    setCovid19Data(covid19CasesAndStats);

    setConfirmed(totalConfirmed);
    setDeaths(totalDeaths);
    setRecovered(totalRecovered);

    setIsLoading(false);
  }

  return (
    <div className="div-mainCovid19Data">
      {isLoading ? (
        <>
          <p>Loading...</p>
          <br />
        </>
      ) : (
        ""
      )}
      <ul>
        {covid19Data && covid19Data.covid19Stats.length <= 5 ? (
          covid19Data.covid19Stats.map(currentProvinceOrState => (
            <>
              <li>
                Province/State:{" "}
                {currentProvinceOrState.province
                  ? currentProvinceOrState.province
                  : currentProvinceOrState.keyId}
              </li>
              <li>
                Last Update:{" "}
                {new Date(currentProvinceOrState.lastUpdate).toLocaleDateString(
                  "pt-BR"
                )}
              </li>
              <li>Confirmed Cases: {currentProvinceOrState.confirmed}</li>
              <li>Confirmed Deaths: {currentProvinceOrState.deaths}</li>
              <li>Recovered: {currentProvinceOrState.recovered}</li>
              <br />
            </>
          ))
        ) : (
          <span></span>
        )}
        <br />
        <li>
          Last checked:{" "}
          {covid19Data && covid19Data.lastChecked
            ? new Date(covid19Data.lastChecked).toLocaleDateString("pt-BR")
            : "N/A"}
        </li>
        <li>Total of Confirmed Cases: {confirmed}</li>
        <li>Total of Confirmed Deaths: {deaths}</li>
        <li>Total Recovered: {recovered}</li>
      </ul>
    </div>
  );
}

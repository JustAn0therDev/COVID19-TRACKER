import React, { useState, useEffect } from "react";
import "./MainCovid19Data.css";
import axios from "axios";
import config from "../../Config/ConfigurationVariables";
import wordTransformer from "../../Utils/TransformFirstLetterInUpperCase";

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

    async function CallCovid19StatsApiService() {
      if (countryValueIsNotEmpty)
        if (country.toLowerCase() !== "usa") {
          let countryWithOnlyFirstLetterInUpperCase = await wordTransformer(
            country
          );
          await getCovid19DataFromSpecifiedCountry(
            countryWithOnlyFirstLetterInUpperCase
          );
        } else {
          await getCovid19DataFromSpecifiedCountry(country);
        }
    }
    CallCovid19StatsApiService();
  }, [country]);

  const getCovid19DataFromSpecifiedCountry = async country => {
    setIsLoading(true);

    let response = await axios.get(
      "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-rapidapi-host": config.xRapidAPIHost,
          "x-rapidapi-key": config.xRapidAPIKey
        },
        params: {
          country: country
        }
      }
    );

    response.data.data.covid19Stats.forEach(async element => {
     await SumTotalOfCases(
        element.confirmed,
        element.deaths,
        element.recovered
      );

      setConfirmed(totalConfirmed);
      setDeaths(totalDeaths);
      setRecovered(totalRecovered);
    });

    setIsLoading(false);
    setCovid19Data(response.data);
  };

  async function SumTotalOfCases(confirmed, deaths, recovered) {
    totalConfirmed += confirmed;
    totalDeaths += deaths;
    totalRecovered += recovered;
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
        {covid19Data.data && covid19Data.data.covid19Stats.length <= 10 ? (
          covid19Data.data.covid19Stats.map(data => (
            <>
              <li>Province/State: {data.province ? data.province : "N/A"}</li>
              <li>
                Last Update:{" "}
                {new Date(data.lastUpdate).toLocaleDateString("pt-BR")}
              </li>
              <li>Confirmed Cases: {data.confirmed}</li>
              <li>Confirmed Deaths: {data.deaths}</li>
              <li>Recovered: {data.recovered}</li>
              <br />
            </>
          ))
        ) : (
          <span></span>
        )}
        <br />
        <li>
          Last checked:{" "}
          {covid19Data.lastChecked
            ? new Date(covid19Data.data.lastChecked).toLocaleDateString("pt-BR")
            : "N/A"}
        </li>
        <li>Total of Confirmed Cases: {confirmed}</li>
        <li>Total of Confirmed Deaths: {deaths}</li>
        <li>Total Recovered: {recovered}</li>
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import './MainCovid19Data.css';
import axios from "axios";

export default function MainCovid19Data({ country }) {

    var totalConfirmed = 0;
    var totalDeaths = 0;
    var totalRecovered = 0;
    
    const [confirmed, setConfirmed] = useState(0);
    const [recovered, setRecovered] = useState(0);
    const [deaths, setDeaths] = useState(0);

    function SumTotalOfCases(confirmed, deaths, recovered) {
        totalConfirmed += confirmed;
        totalDeaths += deaths;
        totalRecovered += recovered;
        setConfirmed(totalConfirmed);
        setDeaths(totalDeaths);
        setRecovered(totalRecovered);
    }

    const [componentResponseState, setComponentResponseState] = useState('');

    async function getCovid19DataFromSpecifiedCountry(country) {
        let response = await axios.get('https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	            "x-rapidapi-key": "4d05572d05msh8850743a12d5d73p17280fjsn86033a0fdb9a"
            },
            params: {
                "country": country
            }
        });

        setComponentResponseState(response.data.data);

        response.data.data.covid19Stats.forEach(element => {
            SumTotalOfCases(element.confirmed, element.deaths, element.recovered);
        });
    }

    useEffect(() => {
        if (country)
            getCovid19DataFromSpecifiedCountry(country);
    }, [country])

    return (
        <div className="div-mainCovid19Data">
            <ul>
            { componentResponseState.covid19Stats ? componentResponseState.covid19Stats.map(data => (
                <>
                    <li>Province/State: {data.province ? data.province : 'N/A'}</li>
                    <li>Last Update: {new Date(data.lastUpdate).toLocaleDateString('pt-BR')}</li>
                    <li>Confirmed Cases: {data.confirmed}</li>
                    <li>Confirmed Deaths: {data.deaths}</li>
                    <li>Recovered: {data.recovered}</li>
                    <br />
                </>
                )
            ) : <p>Search for a country name!</p> }
            <br />
                <li>Last checked: {componentResponseState.lastChecked ? new Date(componentResponseState.lastChecked).toLocaleDateString('pt-BR') : 'N/A'}</li>
                <li>Total of Confirmed Cases: {confirmed}</li>
                <li>Total of Confirmed Deaths: {deaths}</li>
                <li>Total of Recovered: {recovered}</li>
            </ul>
        </div>
    )
}
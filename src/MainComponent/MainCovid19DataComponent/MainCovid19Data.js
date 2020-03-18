import React, { useState, useEffect } from "react";
import './MainCovid19Data.css';
import axios from "axios";

export default function MainCovid19Data({ country }) {

    let totalConfirmed = 0;
    let totalDeaths = 0;
    let totalRecovered = 0;
    
    const [confirmed, setConfirmed] = useState(0);
    const [recovered, setRecovered] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [isLoading, setIsLoading] = useState('');

    async function SumTotalOfCases(confirmed, deaths, recovered) {
        totalConfirmed += confirmed;
        totalDeaths += deaths;
        totalRecovered += recovered;
    }

    const [covid19Data, setCovid19Data] = useState('');

    async function getCovid19DataFromSpecifiedCountry(country) {
        setIsLoading(true);

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

        setCovid19Data(response.data);

        response.data.data.covid19Stats.forEach(async element => {
            SumTotalOfCases(element.confirmed, element.deaths, element.recovered);
            setConfirmed(totalConfirmed);
            setDeaths(totalDeaths);
            setRecovered(totalRecovered);
        });

        setIsLoading(false);
    }

    useEffect(() => {
        if (country)
            getCovid19DataFromSpecifiedCountry(country);
        else if (country === "World")
            getCovid19DataFromSpecifiedCountry("");
    }, [country])

    return (
        <div className="div-mainCovid19Data">
            { ( isLoading ? <><p>Loading...</p><br /></> : "") }
            <ul>
            { covid19Data.data ? covid19Data.data.covid19Stats.map(data => (
                <>
                    <li>Province/State: {data.province ? data.province : 'N/A'}</li>
                    <li>Last Update: {new Date(data.lastUpdate).toLocaleDateString('pt-BR')}</li>
                    <li>Confirmed Cases: {data.confirmed}</li>
                    <li>Confirmed Deaths: {data.deaths}</li>
                    <li>Recovered: {data.recovered}</li>
                    <br />
                </>
                )
            ) : <p>You haven't searched for anything yet.</p> }
            <br />
                <li>Last checked: {covid19Data.lastChecked ? new Date(covid19Data.data.lastChecked).toLocaleDateString('pt-BR') : 'N/A'}</li>
                <li>Total of Confirmed Cases: {confirmed}</li>
                <li>Total of Confirmed Deaths: {deaths}</li>
                <li>Total Recovered: {recovered}</li>
            </ul>
        </div>
    )
}
import React, { useState, useEffect } from "react";
import './MainCovid19Data.css';
import axios from "axios";

export default function MainCovid19Data(props) {

    const [componentResponseState, setComponentResponseState] = useState('');

    useEffect(() => async function getCovid19DataFromSpecifiedCountry(country) {
        var response = await axios.get('https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats', {
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
        setComponentResponseState(response.data);
    }, [props.country, componentResponseState]);

    return (
        <div className="div-mainCovid19Data">
            <ul>
            { componentResponseState.covid19Stats ? componentResponseState.covid19Stats.map(data =>(
                <>
                    <li>Provincia: {data.province}</li>
                    <li>Ultima atualizacao: {data.lastUpdate.toLocaleDateString('pt-BR')}</li>
                    <li>Casos Confirmados: {data.confirmed}</li>
                    <li>Mortes: {data.deaths}</li>
                    <li>Recuperados: {data.recovered}</li>
                    <br />
                </>
                )
            ) : <p>Search a country!</p> }
                <li>Ultima verificacao: n tem</li>
                <li>Total de Casos confirmados: 10</li>
                <li>Total de Mortes: 1</li>
                <li>Total de Recuperados: 9</li>
            </ul>
        </div>
    )
}
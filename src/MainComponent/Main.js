import React, { useState } from "react";
import './Main.css';
import MainCovid19Data from "./MainCovid19DataComponent/MainCovid19Data";

export default function Main() {
    const [countryInputValue, setCountryInputValue] = useState('');
    const [country, setCountry] = useState('');

    function checkValueAndEnterKey(ev) {
        let countryName = ev.target.value.replace(/\W/g, '');
        if (ev.key === 'Enter')
            setCountry(countryName);
        else 
            setCountryInputValue(countryName);
    }

    return (
        <>
        <div className="main-div">
            <div className="div-label-and-input">
                <h1>COVID-19 CASES</h1>
                <br />
                <label>
                    Insert a country name and press enter (you can do that on your phone too)!
                </label>
                <small>
                    If data for the specified country is not found, a list of all the world's cases will be returned.
                </small>
                <input 
                id="input-search"
                placeholder="Search for 'World' to retrieve all COVID-19 cases"
                onKeyPress={(ev) => { checkValueAndEnterKey(ev); }}
                />
            </div>
        </div>
        <br />
        <MainCovid19Data country={country}></MainCovid19Data>
        </>
    )
}
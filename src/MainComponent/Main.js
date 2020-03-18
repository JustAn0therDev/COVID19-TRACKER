import React, { useState } from "react";
import './Main.css';
import MainCovid19Data from "./MainCovid19DataComponent/MainCovid19Data";

export default function Main() {
    const [countryInputValue, setCountryInputValue] = useState('');
    const [country, setCountry] = useState('');

    function checkEventForValueEnterKey(ev) {
        if (ev.key === 'Enter')
            setCountry(ev.target.value);
        else 
            setCountryInputValue(ev.target.value);
    }

    return (
        <>
        <div className="main-div">
            <form action="#">
                <div className="div-label-and-input">
                    <h1>COVID-19 TRACKER</h1>
                    <br />
                    <label>
                        Insert a country name (first letter in upper case)
                    </label>
                    <input 
                    id="input-search"
                    placeholder="Leave it blank to search for the total of Coronavirus cases"
                    onKeyPress={(ev) => { checkEventForValueEnterKey(ev) }}
                    />
                </div>
                <button id="btn-search" type="button" onClick={() => { setCountry(countryInputValue) }}>
                    Search!
                </button>
             </form>
        </div>
        <br />
        <MainCovid19Data key={''} country={country}></MainCovid19Data>
        </>
    )
}
import React, { useState } from "react";
import './Main.css';
import MainCovid19Data from "./MainCovid19DataComponent/MainCovid19Data";

export default function Main() {
    const [countryInputValue, setCountryInputValue] = useState('');
    const [country, setCountry] = useState('');

    return (
        <>
        <div className="main-div">
            <form>
                <div className="div-label-and-input">
                    <label>
                        Insert a country name
                    </label>
                    <input 
                    id="input-search"
                    placeholder="Leave it blank to search for the total of Coronavirus cases"
                    onChange={(ev) => { ev.preventDefault(); setCountryInputValue(ev.target.value); }}
                    />
                </div>
                <button id="btn-search" type="button" onClick={() => { setCountry(countryInputValue) }}>
                    Search!
                </button>
             </form>
        </div>
        <br />
        <MainCovid19Data props={country}></MainCovid19Data>
        </>
    )
}
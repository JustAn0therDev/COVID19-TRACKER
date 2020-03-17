import React from "react";
import './Main.css';
import MainCovid19Data from "./MainCovid19DataComponent/MainCovid19Data";

export default function Main() {
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
                    />
                </div>
                <button id="btn-search" type="button">
                    Search!
                </button>
             </form>
        </div>
        <br />
        <MainCovid19Data></MainCovid19Data>
        </>
    )
}
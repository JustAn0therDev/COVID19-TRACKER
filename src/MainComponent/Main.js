import React from "react";

export default function Main() {
    return (
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
    )
}
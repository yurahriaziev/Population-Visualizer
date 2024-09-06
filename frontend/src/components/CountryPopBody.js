import React, { useState } from "react";
import "../css/CountryPop.css"
import CountryPopMap from "./CountryPopMap";

export default function CountryPopBody( props ) {
    const {handleSubmit, message, countryName, setCountryName, countryList, countryData} = props
    const [filterCountries, setFilterCountries] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)

    const handleInput = (e) => {
        const input = e.target.value
        setCountryName(input)

        if (countryList) {
            if (input.length > 0 ) {
                const searched = countryList.filter(country => 
                    country.toLowerCase().includes(input.toLowerCase())
                )
                setFilterCountries(searched)
                setShowDropdown(true)
            } else {
                setShowDropdown(false)
            }
        }
    }

    const handleCountrySelect = (country) => {
        setCountryName(country)
        setShowDropdown(false)
    }
    console.log(countryData)
    return (
        <div className="population-body">
            <div className="parameters-container">
                {message ? (
                    <h1>{message}</h1>
                ) : (
                    <h1>Enter country name</h1>
                )}
                <div className="input-container">
                    <form onSubmit={handleSubmit}>
                        <input className="country-name-input" type="text" id="countryName" value={countryName} placeholder="Enter Country" onChange={handleInput} autoComplete="off"/>
                        <button className="submit-btn" type="submit">Submit</button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                {filterCountries.map((country, index) => (
                                    <div className="dropdown-item" key={index} onClick={() => handleCountrySelect(country)}>
                                        {country}
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <div className="map-container">
                {countryData && (
                    <CountryPopMap cData={countryData.data}/>
                )}
            </div>
        </div>
    )
}
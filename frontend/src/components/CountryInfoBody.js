import React from "react";
import "../css/CountryPop.css"

export default function CountryInfoBody( props ) {
    const { countryData } = props
    console.log(countryData)
    return (
        <div className="cib-body">
            {/* {countryData.countryName && (
                <h2>Information</h2>
            )} */}
        </div>
    )
}
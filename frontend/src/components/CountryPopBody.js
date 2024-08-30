import React from "react";

export default function CountryPopBody( props ) {
    const {handleSubmit, message, countryName, setCountryName} = props
    return (
        <div className="population-body">
            <form onSubmit={handleSubmit}>
                {message ? (
                    <h1>{message.message}</h1>
                ) : (
                    <h1>Enter country name</h1>
                )}
                <input type="text" id="countryName" value={countryName} placeholder="Enter Country" onChange={(e) => setCountryName(e.target.value)}/>
                {/* {error && <p className="error-message">{error}</p>} */}
            </form>
            {countryName && (
                <h2>Showing results for: {countryName}</h2>
            )}
        </div>
    )
}
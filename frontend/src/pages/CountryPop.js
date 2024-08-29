import React, { useEffect, useState } from "react";

export default function CountryPop() {
    const [message, setMessage] = useState({})
    const [countryName, setCountryName] = useState('')
   

    const handleSubmit = async(e) => {
        e.preventDefault()
        const toSend = {
            country: countryName
        }
        console.log(toSend)
        const url = 'http://127.0.0.1:5000/population'
        const options = {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(toSend)
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const message = await response.json()
            setMessage(message)
            // success
        } else {
            const error = await response.json()
            setMessage(error)
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {message ? (
                    <h1>{message.message}</h1>
                ) : (
                    <h1>Enter country name</h1>
                )}
                <input type="text" id="countryName" value={countryName} placeholder="Enter Country" onChange={(e) => setCountryName(e.target.value)}/>
            </form>
        </div>
    )
}
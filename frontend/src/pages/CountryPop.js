import React, { useState } from "react";
import CountryPopNav from "../components/CountryPopNav";
import "../css/CountryPop.css"
import { useNavigate } from "react-router-dom";
import CountryPopBody from "../components/CountryPopBody";

export default function CountryPop() {
    const [message, setMessage] = useState()
    const [countryName, setCountryName] = useState('')
    // const [error, setError] = useState('')

    const navigate = useNavigate()
    const handleRouteChange = (route) => {
        navigate(route)
    }

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
            setCountryName(toSend.country)
            // success
        } else {
            const error = await response.json()
            setMessage(error)
            console.log(error)
        }
    }
    return (
        <div className="population-page">
            <CountryPopNav handleRouteChange={handleRouteChange}/>
            <CountryPopBody handleSubmit={handleSubmit} message={message} countryName={countryName} setCountryName={setCountryName}/>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import CountryPopNav from "../components/CountryPopNav";
import "../css/CountryPop.css"
import { useNavigate } from "react-router-dom";
import CountryPopBody from "../components/CountryPopBody";
import ErrorPupUp from "../components/ErrorPopUp";

export default function CountryPop() {
    const [message, setMessage] = useState()
    const [countryName, setCountryName] = useState('')
    const [countryList, setCountryList] = useState([])
    const [error, setError] = useState('')
    const [countryData, setCountryData] = useState({})

    const navigate = useNavigate()
    const handleRouteChange = (route) => {
        navigate(route)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const lettersOnly = /^[A-Za-z\s]+$/;
        if (!lettersOnly.test(countryName)) {
            setError('Invalid input. Letters only.')
            return
        }

        const toSend = { country: countryName };
        try {
            const response = await fetch('http://127.0.0.1:5000/population', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(toSend),
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                // console.log(data.data.centerCoords)
                setMessage(data.message)
                setCountryName(toSend.country);
                setCountryData(data) 
                setError('')
            } else {
                const errorData = await response.json();
                // console.log(errorData)
                setError(errorData.error || 'An error occurred')
                return
            }
        } catch (err) {
            setError('Network error: Unable to reach the server')
            console.log(err)
        }
    };

    useEffect(() => {
        const getCountries = async() => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get_country_list')
                if (response.ok) {
                    const data = await response.json()
                    setCountryList(data.names)
                } else {
                    const error = await response.json()
                    setError(error.message)
                }
            } catch (error) {
                setError('Network Error')
            }
        }
        getCountries()
    }, [])

    const handeCloseError = () => {
        setError('')
    }

    // console.log(countryData)
    return (
        <div className="population-page">
            <CountryPopNav handleRouteChange={handleRouteChange}/>
            <ErrorPupUp message={error} close={handeCloseError}/>
            <CountryPopBody
                handleSubmit={handleSubmit}
                message={message}
                countryName={countryName}
                setCountryName={setCountryName}
                countryList={countryList}
                countryData={countryData}
            />
        </div>
    )
}
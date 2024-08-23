import React from "react";
// import { useNavigate } from "react-router-dom"
import "../css/LandingPage.css"
import LandingHeader from "../components/LandingHeader";
import LandingBody from "../components/LandingBody";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate()
    const handleRouteChange = (route) => {
        console.log(route)
        navigate(`/${route}`)
    }
    return (
        <div className="landing-page">
            {/* Header */}
            <LandingHeader />
            {/* Body */}
            <LandingBody handleRouteChange={handleRouteChange}/>
            {/* Footer */}
        </div>
    )
}
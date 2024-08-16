import React from "react";
import { useNavigate } from "react-router-dom"
import "../css/LandingPage.css"
import ContentBox from "../components/ContentBox";

export default function LandingPage() {
    // const navigate = useNavigate()
    // const handleRouteChange = (route) => {
    //     navigate(`/${route}`)
    // }
    return (
        <div className="landing-page">
            <div className="banner-container">
                <h2 className="banner-text">banner here</h2>
                <h1 className="title-text">Population Simulation</h1>
            </div>
            <div className="second-title-container">
                <h1 className="title-text">Reimagined</h1>
            </div>
            <div className="content-container">
                <ContentBox />
            </div>
        </div>
    )
}
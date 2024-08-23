import React from "react";
import "../css/LandingPage.css"

export default function LandingBody({handleRouteChange}) {
    return (
        <div className="main-content">
            {/* <h2>Main content area</h2> */}
            <div className="left-card-container">
                <InfoCard buttonText='Create' handleClick={() => handleRouteChange('create')}/>
            </div>
            <div className="right-card-container">
                <InfoCard buttonText='Learn' handleClick={() => handleRouteChange('population')}/>
            </div>
        </div>
    )
}

function InfoCard({buttonText, handleClick}) {
    return (
        <div className="info-card">
            <div className="img-container">
                <h2>img</h2>
            </div>
            <div className="action-container">
                <h2>action container</h2>
                <button onClick={handleClick}>{buttonText}</button>
            </div>
        </div>
    )
}
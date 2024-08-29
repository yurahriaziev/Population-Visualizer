import React from "react";
import "../css/LandingPage.css"

export default function LandingBody({handleRouteChange}) {
    return (
        <div className="main-content">
            <div className="card-container">
                {/* <h2>Main content area</h2> */}
                <div className="left-card-container">
                    <InfoCard
                        buttonText='Create'
                        handleClick={() => handleRouteChange('create')}
                        text='Create and learn from custom simulations'
                    />
                </div>
                <div className="right-card-container">
                    <InfoCard
                        buttonText='Learn'
                        handleClick={() => handleRouteChange('population')}
                        text="View and break down a country's population"
                    />
                </div>
            </div>
            <div className="info-container">
                <div className="info-img-container">
                    <h1>img of country and its pop density</h1>
                </div>
                <div className="info-text-container">
                    <div className="info-title">
                        <h1>What is this</h1>
                    </div>
                    <div className="info-body">
                        <p>A site where country research is done simply</p>
                    </div>
                    <div className="info-btn">
                        <button onClick={() => handleRouteChange('create')}>Start Creating</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoCard({buttonText, handleClick, text}) {
    return (
        <div className="info-card">
            <div className="img-container">
                <h2>img</h2>
            </div>
            <div className="action-container">
                <h2>{text}</h2>
                <button onClick={handleClick}>{buttonText}</button>
            </div>
        </div>
    )
}
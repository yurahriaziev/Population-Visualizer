import React from "react";
import "../css/LandingPage.css"

export default function LandingFooter() {
    const handleClick = () => {
        console.log("Sending user to this project's Github")
    }

    return (
        <div className="landing-footer">
            <div className="left-footer">
                <p onClick={handleClick} className="link">Source Code</p>
                <p>All Rights Reserved</p>
            </div>
            <div className="right-footer">
                <p>Contanct</p>
                <p>contry.pop@gmail.com</p>
            </div>
        </div>
    )
}
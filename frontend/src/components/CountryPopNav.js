import React from "react";
import { useNavigate } from "react-router-dom";

export default function CountryPopNav( props ) {
    const { handleRouteChange } = props
    return (
        <div className="navbar">
            <div className="navbar-left">
                <button onClick={() => handleRouteChange('/home')}><i className="fa-solid fa-house"></i></button>
            </div>
        </div>
    )
}
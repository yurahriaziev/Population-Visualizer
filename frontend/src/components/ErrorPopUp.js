import React from "react";
import "../css/CountryPop.css"

export default function ErrorPupUp({message, close}) {
    if (!message) {
        return null
    }

    return (
        <div className="error-popup">
            <p>{message}</p>
            <button onClick={close}>Close</button>
        </div>
    )
}
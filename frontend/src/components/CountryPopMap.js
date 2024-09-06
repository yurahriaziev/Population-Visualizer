import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "../css/CountryPop.css"

function UpdateMapCenter({center}) {
    const map = useMap()
    useEffect(() => {
        if (center) {
            map.setView(center)
        }
    }, [map, center])
}

export default function CountryPopMap({cData}) {
    console.log('here', cData)
    return (
        <>
            {cData && cData.country_name ? (
                <div className="main-container">
                    <MapContainer
                        className="leaflet-container"
                        center={cData.centerCoords}
                        zoom={6}
                        scrollWheelZoom={true}
                        key={cData.centerCoords}
                    >
                        

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <UpdateMapCenter center={cData.centerCoords}/>
                    </MapContainer>
                </div>

            ) : (
                <h2>Choose country</h2>
            )}
        </>
    )
}
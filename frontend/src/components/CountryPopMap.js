import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet'
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

export default function CountryPopMap({cData, submitted}) {
    console.log('here', cData)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (cData) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [cData])


    return (
        <>
            {cData && cData.countryName ? (
                <div className="main-container">
                    <MapContainer
                        className="leaflet-container"
                        center={cData.centerCoords}
                        zoom={5}
                        scrollWheelZoom={true}
                        key={cData.centerCoords}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        { cData.geoData && <GeoJSON data={cData.geoData} />}
                        <UpdateMapCenter center={cData.centerCoords}/>
                    </MapContainer>
                </div>

            ) : loading && submitted ? (
                <h2>Loading...</h2>
            ) : (
                <h2>Choose country</h2>
            )}
        </>
    )
}
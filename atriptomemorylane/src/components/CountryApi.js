import React from 'react'

/**
 * Basically a drawing component for weather api.
 * @param {String} props 
 */
const CountryApi = (props) => {
    return (
        <div className="container">
            <div className="cards">
                <h1> {props.timezones}, {props.subRegion} {props.countryName} </h1>
            </div>
        </div>
    )
}



export default CountryApi

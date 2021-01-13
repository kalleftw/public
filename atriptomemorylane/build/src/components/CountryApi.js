import React from 'react'

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
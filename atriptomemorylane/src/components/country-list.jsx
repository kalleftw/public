import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../config'
import '../css/Countries.css'
import { MyContextCurrentCities } from '../context/cityContext'
/**
 * Method which will be used as a hook. Fetching every continent
 * @param {} continent 
 */
const useCountries = (continent) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        firebase
            .firestore()
            .collection(continent)
            .onSnapshot((snapshot) => {

                const newCountries = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCountries(newCountries)
            })
    },)
    return countries
}
/**
 * Method which puts each field into an array.
 * Making us able to find the correct field
 * @param {} param0 
 */
const CountryList = ({ continent, displayFields = [] }) => {
    const countries = useCountries(continent);
    const DataContext = useContext(MyContextCurrentCities);
    const { currentCity, setCurrentCity } = DataContext;
    return (
        <div className="countries">
            {countries.map(country => (
                <div key={country.id}>
                    <div className="entry">
                        {displayFields.includes("dest1") && country.reviewDest1 === currentCity.review && (
                            <div>{country.dest1}
                            </div>
                        )}
                        {displayFields.includes("continent") && (
                            <div>{country.continent}</div>
                        )}
                        {displayFields.includes("revName") && (
                            <div><Link onClick={() => setCurrentCity({ review: country.reviewDest1, city: country.dest1 })} to={"./Jumbotron"}>{country.revName}</Link><hr /></div>
                        )}
                        {displayFields.includes("countryName") && (
                            <div>{country.countryName}</div>
                        )}
                        {displayFields.includes("dest2") && country.reviewDest1 === currentCity.review && (
                            <div>{country.dest2}</div>
                        )}
                        {displayFields.includes("dest3") && country.reviewDest1 === currentCity.review && (
                            <div>{country.dest3}</div>
                        )}
                        {displayFields.includes("beerPrice") && country.reviewDest1 === currentCity.review && (
                            <div>The avarage beer price: {country.beerPrice} SEK</div>
                        )}
                        {displayFields.includes("foodPrice") && country.reviewDest1 === currentCity.review && (
                            <div>The avarage (street)food price: {country.foodPrice} SEK</div>
                        )}
                        {displayFields.includes("hostelPrice") && country.reviewDest1 === currentCity.review && (
                            <div>The avarage hostel price: {country.hostelPrice} SEK</div>
                        )}
                        {displayFields.includes("reviewDest1") && country.reviewDest1 === currentCity.review && (<div>{country.reviewDest1}</div>)}
                        {displayFields.includes("reviewDest2") && country.reviewDest1 === currentCity.review && (<div>{country.reviewDest2}</div>)}
                        {displayFields.includes("reviewDest3") && country.reviewDest1 === currentCity.review && (<div>{country.reviewDest3}</div>)}
                        {displayFields.includes("imgUrl") && country.reviewDest1 === currentCity.review && (<img src={country.url} alt="No image :(" />)}
                        {displayFields.includes("rating") && country.reviewDest1 === currentCity.review && (<div>{country.rating}</div>)}
                        {displayFields.includes("recommended") && country.reviewDest1 === currentCity.review && (<div>Are the destinations recommended? {country.recommended}</div>)}

                    </div>
                </div>
            ))}
        </div>
    );
};
export default CountryList
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../config'
import './Countries.css'
import { MyContextCurrentCities } from '../cityContext'



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

    }, [])
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

                        {displayFields.includes("dest1") && country.dest1 === currentCity && (
                            <div>{country.dest1}
                            </div>
                        )}
                        {displayFields.includes("continent") && (
                            <div>{country.continent}</div>
                        )}
                        {displayFields.includes("revName") && (
                            <div><Link onClick={() => setCurrentCity(country.dest1)} to={"./Jumbotron"}>{country.revName}</Link><hr/></div>

                        )}
                        {displayFields.includes("countryName") && (
                            <div>{country.countryName}</div>
                        )}

                        {displayFields.includes("dest2") && country.dest1 === currentCity &&(
                            <div>{country.dest2}</div>
                        )}
                        {displayFields.includes("dest3") && country.dest1 === currentCity &&(
                            <div>{country.dest3}</div>
                        )}
                        {displayFields.includes("beerPrice") && country.dest1 === currentCity &&(
                            <div>The avarage beer price: {country.beerPrice} SEK</div>
                        )}
                        {displayFields.includes("foodPrice") && country.dest1 === currentCity &&(
                            <div>The avarage (street)food price: {country.foodPrice} SEK</div>
                        )}
                        {displayFields.includes("hostelPrice") && country.dest1 === currentCity &&(
                            <div>The avarage hostel price: {country.hostelPrice} SEK</div>
                        )}
                        {displayFields.includes("reviewDest1") && country.dest1 === currentCity &&(<div>{country.reviewDest1}</div>)}
                        {displayFields.includes("reviewDest2") && country.dest1 === currentCity &&(<div>{country.reviewDest2}</div>)}
                        {displayFields.includes("reviewDest3") && country.dest1 === currentCity &&(<div>{country.reviewDest3}</div>)}
                        {displayFields.includes("imgUrl") && country.dest1 === currentCity &&(<img src={country.url} alt="no-img" />)}
                        {displayFields.includes("rating") && country.dest1 === currentCity &&(<div>{country.rating}</div>)}
                        {displayFields.includes("recommended") && country.dest1 === currentCity &&(<div>Are the destinations recommended? {country.recommended}</div>)}


                        

                    </div>
                </div>

            ))}


        </div>


    );

};




export default CountryList


// import React, { useState, useEffect, useContext } from 'react'
// import { Link } from 'react-router-dom';
// import firebase from '../config'
// import './Countries.css'
// import { MyContextCurrentCities } from '../countryContext'



// /**
//  * Method which will be used as a hook. Fetching every continent
//  * @param {} continent 
//  */
// const useCountries = (continent) => {
//     const [countries, setCountries] = useState([]);

//     useEffect(() => {
//         console.log(continent)
//         firebase
//             .firestore()
//             .collection(continent)
//             .onSnapshot((snapshot) => {
//                 const newCountries = snapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data()

//                 }))
//                 setCountries(newCountries)

//             })

//     }, [])
//     return countries
// }




// /**
//  * Method which puts each field into an array.
//  * Making us able to find the correct field
//  * @param {} param0 
//  */
// const CountryList = ({ continent, displayFields = [] }) => {
//     const countries = useCountries(continent);
//     const DataContext = useContext(MyContextCurrentCities);
//     const { setCurrentCity } = DataContext;

//     let mapped = Array.isArray(countries) && countries.map(country => setCurrentCity(country.dest1));


//     useEffect(() => {
//         setCurrentCity(mapped);

//     }, []);

//     return (
//         <div className="countries">
//             {countries.map(country => (
//                 <div key={country.id}>
//                     <div className="entry">

//                         {displayFields.includes("dest1") && (
//                             <div>Destination 1: {country.dest1}
//                             </div>
//                         )}
//                         {displayFields.includes("continent") && (
//                             <div>{country.continent}</div>
//                         )}
//                         {displayFields.includes("revName") && (
//                             <div>{country.revName}</div>
//                         )}
//                         {displayFields.includes("countryName") && (
//                             <div><Link to={"./Jumbotron"}>{country.countryName}</Link></div>
//                         )}

//                         {displayFields.includes("dest2") && (
//                             <div>Destination 2: {country.dest2}</div>
//                         )}
//                         {displayFields.includes("dest3") && (
//                             <div>Destination 3: {country.dest3}</div>
//                         )}
//                         {displayFields.includes("beerPrice") && (
//                             <div>Beer price: {country.beerPrice}</div>
//                         )}
//                         {displayFields.includes("foodPrice") && (
//                             <div>Food price: {country.foodPrice}</div>
//                         )}
//                         {displayFields.includes("hostelPrice") && (
//                             <div>Hostel price: {country.hostelPrice}</div>
//                         )}
//                         {displayFields.includes("review") && <div>Review: {country.review}</div>}
//                         {displayFields.includes("imgUrl") && <img src={country.url} alt="no-img" />}
//                         {displayFields.includes("rating") && <div>Rating: {country.rating}</div>}

//                     </div>
//                 </div>

//             ))}


//         </div>


//     );

// };




// export default CountryList
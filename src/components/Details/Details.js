import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import details from './details.css';

const Details = (props) => {
    const { country, colors } = props;
    const [border, setBorder] = useState(country)

    const fetchCountry = (cn) => {
        axios.get(`https://restcountries.com/v3.1/alpha/${cn}`).then(res => setBorder(res.data[0]));
    }
    return (
        <>
            <div className="back">
                <Link to="/"><button style={{ backgroundColor: colors.backgrnd === '#fff' ? '#fff' : '#2b3743', color: colors.color === 'black' ? 'black' : '#fff' }}>Back</button></Link>
            </div>
            <div className="details-country">
                <div className="flag">
                    <img src={border.flags.png} />
                </div>
                <div className="details">
                    <div className="content-country">
                        <div className="part">
                            <h1>{border.name.common}</h1>
                            <p><span>Native Name: </span>{border.name.common}</p>
                            <p><span>Population: </span>{border.population}</p>
                            <p><span>Region: </span>{border.region}</p>
                            <p><span>Sub Region: </span>{border.subregion}</p>
                            <p><span>Capital: </span>{border.capital}</p>
                        </div>
                        <div className="part">
                            <p><span>Top Level Domain: </span>{border.tld}</p>
                            <p><span>Currencies: </span>{extractCurrencies(border.currencies)}</p>
                            <p><span>Region: </span>{border.region}</p>
                            <p><span>Languages: </span>{extractLanguages(border.languages)}</p>
                        </div>
                    </div>
                    <div className="borders">
                        <p>Border Countries: </p>
                        <div className="all-borders">
                            {border.borders ? border.borders.map((br, index) => {
                                return (
                                    <Link to="/details" key={index} onClick={() => { fetchCountry(br) }}><button style={{
                                        backgroundColor: colors.backgrnd === '#fff' ? '#fff' : '#2b3743', color: colors.color === 'black' ? 'black' : '#fff'
                                    }}>{br}</button></Link>
                                )
                            }) : ""}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    function extractCurrencies(obj) {
        const curr = [];

        for (const key in obj) curr.push(obj[key].name)
        return curr.join(', ')
    }
    function extractLanguages(obj) {
        const lang = [];

        for (const key in obj) lang.push(obj[key])
        return lang.join(', ')
    }
}
export default Details;
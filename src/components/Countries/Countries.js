import React, { useEffect, useRef, useState } from "react";
import countries from './countries.css'
import { FiSearch } from 'react-icons/fi'
import axios from "axios";
import { Route, Routes, BrowserRouter, Router } from "react-router";
import { Link } from "react-router-dom";
import Details from "../Details/Details";

const Countries = (props) => {
    const URL = 'https://restcountries.com/v3.1/all';
    const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
    const { colors, getCountryDetails } = props;
    const [data, setData] = useState([]);
    const [fetch, setFetch] = useState([]);
    const wait = useRef();
    const region = useRef();
    const inputValue = useRef();

    useEffect(() => {
        axios.get(URL).then((res) => { setData(res.data); setFetch(res.data) });
    }, [])

    const fetchRegion = () => {
        if (region.current == 0) axios.get(URL).then((res) => { setData(res.data); setFetch(res.data) });
        else {
            const regionURL = 'https://restcountries.com/v3.1/region/' + regions[region.current]
            axios.get(regionURL).then((res) => { setData(res.data); setFetch(res.data) });
        }
    }
    const fetchSearch = () => {
        if (inputValue.current) {
            const fetchedData = data.filter((item) => {
                // return Object.values(item).join('').toLowerCase().includes(value.toLowerCase());
                return item.name.common.toLowerCase().includes(inputValue.current.toLowerCase())
            })
            setFetch(fetchedData);
        } else setFetch(data)
    }

    return (
        <div className="countries">
            <div className="container">
                <div className="filter-part">
                    <div className="search">
                        <i className="icon-search"><FiSearch /></i>
                        <input type="text" placeholder="Search for country..." ref={inputValue} onChange={(e) => { inputValue.current = e.target.value; fetchSearch() }} style={{
                            backgroundColor: colors.backgrnd === '#fff' ? '#fff' : '#2b3743', color: colors.color === 'black' ? 'black' : '#fff'
                        }} />
                    </div>
                    <div className="select" >
                        <select className="select-list" ref={region} onClick={(e) => { region.current = e.target.value; fetchRegion() }} style={{
                            backgroundColor: colors.backgrnd === '#fff' ? '#fff' : '#2b3743', color: colors.color === 'black' ? 'black' : '#fff'
                        }}>
                            {regions.map((reg, index) => {
                                return (
                                    <option value={index} key={index}>{reg}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="country-part">
                    <div className="wait" ref={wait} style={{ display: wait.current }}>Wait Loading...</div>
                    {fetch.map((item, index) => {
                        if (index === fetch.length - 1) wait.current = 'none'
                        return (
                            <Link onClick={(e) => { getCountryDetails(item) }} to="/details" className="country" key={index} style={{ backgroundColor: colors.backgrnd, color: colors.color, boxShadow: colors.backgrnd === '#2b3743' ? 'none' : '' }}>
                                <div className="image">
                                    <img src={item.flags.png} />
                                </div>
                                <div className="country-info">
                                    <h2 className="name">{item.name.common}</h2>
                                    <p><span>Population</span> : {item.population}</p>
                                    <p><span>Region</span> : {item.region}</p>
                                    <p><span>Capital</span> : {item.capital}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
export default Countries;

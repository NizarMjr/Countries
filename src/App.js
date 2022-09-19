import React, { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Countries from "./components/Countries/Countries";
import Details from "./components/Details/Details";
import Header from "./components/Header/Header";

function App() {
  const [colorPrimary, setColorPrimary] = useState('#eee')
  const [colorSecond, setColorSecond] = useState('black');
  const [colorReserve, setColorReserve] = useState('#fff');
  const [country, setCountry] = useState([]);
  const colors = {
    backgrnd: colorReserve,
    color: colorSecond
  }
  const getCountryDetails = (country) => {
    setCountry(country)
    localStorage.setItem('country', JSON.stringify(country));
  }
  const changeColor = () => {
    colorPrimary === '#eee' ? setColorPrimary('#202d36') : setColorPrimary('#eee');
    colorSecond === 'black' ? setColorSecond('white') : setColorSecond('black');
    colorReserve === '#fff' ? setColorReserve('#2b3743') : setColorReserve('#fff');
  }
  return (
    <div className="App" style={{ backgroundColor: colorPrimary, color: colorSecond }} >
      <BrowserRouter>
        <Header changeColor={changeColor} />
        <Routes>
          <Route path="/" exact element={<Countries colors={colors} getCountryDetails={getCountryDetails} />}></Route>
          <Route path='/details' exact element={<Details country={JSON.parse(localStorage.getItem('country'))} colors={colors} />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;

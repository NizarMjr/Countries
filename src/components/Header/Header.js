import React, { useState } from "react";
import header from './header.css'
import { MdDarkMode } from 'react-icons/md'
import { Link } from "react-router-dom";

const Header = (props) => {
    const { changeColor } = props
    const [background, setBackground] = useState('#fff');
    const [color, setcolor] = useState('#000');
    const setColor = () => {
        changeColor();
        background === '#fff' ? setBackground('#2b3743') : setBackground('#fff');
        color === '#000' ? setcolor('#fff') : setcolor('#000');
    }
    return (
        <header className="header" style={{ backgroundColor: background, color: color }}>
            <Link to="/Countries/" className="title" style={{ color: color }}>Where in the world?</Link>
            <div className="color-mode" onClick={() => setColor()}>
                <MdDarkMode /> Dark mode
            </div>
        </header>
    )
}
export default Header
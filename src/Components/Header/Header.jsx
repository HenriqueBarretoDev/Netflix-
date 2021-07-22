import React from 'react';
import './Header.css';
import netflixLogo from '../../Images/Netflix-Logo.png'
import logoAcc from '../../Images/logo--acc.jpg'


export default ({ black }) => {
    return (
        <header className={black ? 'black' : ''}>

            <div className='header--logo'>
                <a href="/">
                    <img src={netflixLogo} />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={logoAcc} />
                </a>
            </div>
        </header>
    )
}
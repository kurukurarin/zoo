import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Nav() {
    return (
            <div id="header-wrapper">
		        <div id="header" className="container">
                        <NavLink to="/"><h1 id="logo">Главная</h1></NavLink>
                    <nav id="nav">
                        <ul>
                            <li><NavLink to="/animals">Наши зверушки</NavLink></li>
                            <li className="break"><NavLink to="/tariffs">Тарифы</NavLink></li>
                            <li><NavLink to="/login"></NavLink></li>
                        </ul>
                    </nav>
      	        </div>
		    </div>
            );
}
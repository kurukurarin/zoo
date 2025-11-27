import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <header>
      <h1 id="logo">
        <NavLink to="/">Главная</NavLink>
      </h1>

      <nav id="nav">
        <ul>
          <li><NavLink to="/animals">Наши зверушки</NavLink></li>
          <li className="break"><NavLink to="/tariffs">Тарифы</NavLink></li>
          <li><NavLink to="/login">Вход</NavLink></li>
        </ul>
      </nav> 
    </header>
  );
}
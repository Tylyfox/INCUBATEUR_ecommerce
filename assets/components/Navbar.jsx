import React from "react";

const Navbar = (props) => {
  return (
    <div className="">
      <header>
        <a href="#" className="logo">
          E-commerce
        </a>
        <ul>
          <li key="home"><a href="#">Home</a></li>
          <li key="produits"><a href="#">Produits</a></li>
          <li key="panier"><a href="#">Panier</a></li>
          <li key="search"><form className="navForm">
          <input className="navSearch" type="search" placeholder="Search" />
          <button className="navButton" type="submit">Rechercher</button>
          <li key="subscribe"><a href="#">Inscription</a></li>
          <li key="connect"><a href="#">Connexion</a></li>
          <li key="disconnect"><a href="#">Deconnexion</a></li>
        </form></li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;

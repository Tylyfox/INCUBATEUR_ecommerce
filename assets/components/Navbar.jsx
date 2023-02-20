import React from "react";

const Navbar = (props) => {
  return (
    <div className="">
      <header>
        <a href="#" className="logo">
          E-commerce
        </a>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Produits</a></li>
          <li><a href="#">Panier</a></li>
          <li><form className="navForm">
          <input className="navSearch" type="search" placeholder="Search" />
          <button className="navButton" type="submit">Rechercher</button>
          <li><a href="#">Inscription</a></li>
          <li><a href="#">Connexion</a></li>
          <li><a href="#">Deconnexion</a></li>
        </form></li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;

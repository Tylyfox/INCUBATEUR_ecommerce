import React from "react";
import AuthAPI from "./services/authAPI";
import ProductsApi from "./services/productsAPI";


const Navbar = (props) => {

const handleLogOut = () => {
AuthAPI.logout();
}

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
          <li key="disconnect"><button onClick={handleLogOut}>Deconnexion</button></li>
        </form></li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;

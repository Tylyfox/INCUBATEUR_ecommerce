import React from "react";
import { NavLink } from "react-router-dom";
import AuthAPI from "./services/authAPI";
import ProductsApi from "./services/productsAPI";


const Navbar = (props) => {

const handleLogOut = () => {
AuthAPI.logout();
}

  return (
    <div>
      <header>
      <NavLink className="logo" to="/">E-commerce</NavLink>
        <ul>
          <li key="home"><NavLink className="link" to="/">Acceuil</NavLink></li>
          <li key="produits"><NavLink className="link" to="/produits">Produits</NavLink></li>
          <li key="panier"><NavLink className="link" to="/categories">Categories</NavLink></li>
          <li key="subscribe"><NavLink className="link" to="/inscription">Inscription</NavLink></li>
          <li key="connect"><NavLink className="link" to="/login">Connexion</NavLink></li>
          <li key="disconnect"><button onClick={handleLogOut}>Deconnexion</button></li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;

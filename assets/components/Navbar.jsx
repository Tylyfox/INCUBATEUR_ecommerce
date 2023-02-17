import React from "react";

const Navbar = (props) => {
  return (
    <div className="">
      <header>
        <a href="#" className="logo">
          Logo
        </a>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Produits</a></li>
          <li><a href="#">Panier</a></li>
          <li><form className="navForm">
          <input className="navSearch" type="search" placeholder="Search" />
          <button className="navButton" type="submit">Rechercher</button>
        </form></li>
        </ul>
      </header>
      <section className="banner"></section>
    </div>
  );
};

export default Navbar;

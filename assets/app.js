import React, { useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";
import "./styles/homePage.css";
import {
  HashRouter,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import ProductsPage from "./components/pages/ProductsPage";
import CategoriesPage from "./components/pages/CategoriesPage";
import LoginPage from "./components/pages/LoginPage";
import AuthAPI from "./components/services/authAPI";
import AuthContext from "./components/contexts/authContext";
import PrivateRoute from "./components/PrivateRoute";

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated
  );

  const NavBarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <HashRouter>
        <NavBarWithRouter />
        <main>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/produits" component={ProductsPage} />
            <PrivateRoute path="/categories" component={CategoriesPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);

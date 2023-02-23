import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import './styles/homePage.css';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import ProductsPage from './components/pages/ProductsPage';
import CategoriesPage from './components/pages/CategoriesPage';
import LoginPage from './components/pages/LoginPage';
import AuthAPI from './components/services/authAPI';

AuthAPI.setup();

const App = () => {
   
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated);   

    const NavBarWithRouter = withRouter(Navbar);

    return  <HashRouter>
            <NavBarWithRouter isAuthenticated = {isAuthenticated} onLogout={setIsAuthenticated}/>
                <main>
                    <Switch>
                        <Route path="/login" render={(props) => <LoginPage onLogin={setIsAuthenticated} {...props}/>}></Route>
                        <Route path="/produits" component={ProductsPage}></Route>
                        <Route path="/categories" component={CategoriesPage}></Route>
                        <Route path="/" component={HomePage}></Route>
                    </Switch>
                </main>
    </HashRouter>
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
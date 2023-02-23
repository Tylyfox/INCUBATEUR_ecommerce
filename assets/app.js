import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import './styles/navBar.css';
import './styles/homePage.css';
import {HashRouter, Switch, Route} from "react-router-dom";
import ProductsPage from './components/pages/ProductsPage';
import CategoriesPage from './components/pages/CategoriesPage';
import LoginPage from './components/pages/LoginPage';
import AuthAPI from './components/services/authAPI';

const App = () => {
   
    AuthAPI.setup();

    return  <HashRouter>
            <Navbar />
                <main>
                    <Switch>
                        <Route path="/login" component={LoginPage}></Route>
                        <Route path="/produits" component={ProductsPage}></Route>
                        <Route path="/categories" component={CategoriesPage}></Route>
                        <Route path="/" component={HomePage}></Route>
                    </Switch>
                </main>
    </HashRouter>
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
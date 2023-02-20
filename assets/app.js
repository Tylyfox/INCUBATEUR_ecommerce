import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import './styles/navBar.css';
import './styles/homePage.css';
import {HashRouter, Switch, Route} from "react-router-dom";
import ProductsPage from './components/pages/ProductsPage';
import CategoriesPage from './components/pages/CategoriesPage';

const App = () => {
   
    return  <HashRouter>
            <Navbar />
                <main>
                    <Switch>
                        <Route path="/produits" component={ProductsPage}></Route>
                        <Route path="/categories" component={CategoriesPage}></Route>
                        <Route path="/" component={HomePage}></Route>
                        
                    </Switch>
                </main>
    </HashRouter>
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
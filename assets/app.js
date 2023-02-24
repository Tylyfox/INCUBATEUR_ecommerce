import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import './styles/homePage.css';
import {HashRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";
import ProductsPage from './components/pages/ProductsPage';
import CategoriesPage from './components/pages/CategoriesPage';
import LoginPage from './components/pages/LoginPage';
import AuthAPI from './components/services/authAPI';

AuthAPI.setup();

const PrivateRoute = ({path, isAuthenticated, component}) => 
    isAuthenticated ? (<Route path={path} component={component} />
    ) : (
        <Redirect to="/login" />
    );
 
export default PrivateRoute;


const App = () => {
   
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated);

    const NavBarWithRouter = withRouter(Navbar);

    return  <HashRouter>
            <NavBarWithRouter isAuthenticated = {isAuthenticated} onLogout={setIsAuthenticated}/>
                <main>
                    <Switch>
                        <Route path="/login" render={(props) => <LoginPage onLogin={setIsAuthenticated} {...props}/>}/>
                        <PrivateRoute path="/produits" isAuthenticated={isAuthenticated} component={ProductsPage} />              
                        <PrivateRoute path="/categories" isAuthenticated={isAuthenticated} component={CategoriesPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
    </HashRouter>
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
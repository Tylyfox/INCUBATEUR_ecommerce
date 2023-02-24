import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import './styles/homePage.css';
import {HashRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";
import ProductsPage from './components/pages/ProductsPage';
import CategoriesPage from './components/pages/CategoriesPage';
import LoginPage from './components/pages/LoginPage';
import AuthAPI from './components/services/authAPI';
import AuthContext from './components/contexts/authContext';

AuthAPI.setup();

const PrivateRoute = ({path, component}) => {

    const {isAuthenticated} = useContext(AuthContext);

   return isAuthenticated ? (<Route path={path} component={component} />
    ) : (
        <Redirect to="/login" />
    );
 }
export default PrivateRoute;


const App = () => {
   
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated);

    const NavBarWithRouter = withRouter(Navbar);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    };

    return (  
        <AuthContext.Provider value={contextValue}>
        <HashRouter>
            <NavBarWithRouter/>
                <main>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/produits" component={ProductsPage} />              
                        <PrivateRoute path="/categories" component={CategoriesPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
        </HashRouter>
    </AuthContext.Provider>
    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
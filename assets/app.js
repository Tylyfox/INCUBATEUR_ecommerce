import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import './styles/navBar.css';

const App = () => {
    return <Navbar/>;
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
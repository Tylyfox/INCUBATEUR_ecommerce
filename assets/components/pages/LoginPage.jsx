import React, { useState } from 'react';
import AuthAPI from '../services/authAPI';
import "../../styles/loginPage.css";

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    //gestion des champs
    const handleChange =  ({currentTarget}) => {
        const{value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    };
    //gestion du submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AuthAPI.authenticated(credentials);
            setError("");
        } catch (error) {
            console.log(error.response);
            setError('Aucun compte ne possède cette email ou email et mot de passe invalide')
        }
    }

    return ( 
        <>
            <div className="login">
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="username">Adresse Email : </label>
                    <input type="email" name="username" placeholder='Adresse email de connexion' id='username' onChange={handleChange} value={credentials.username} />
                    {error && <p>{error}</p>}
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Mot de passe : </label>
                    <input type="password" name="password" placeholder='Mot de passe de connexion' id='password' onChange={handleChange} value={credentials.password}/>
                </div>
                <div className="formGroup">
                    <button type="submit">Connexion</button>
                </div>
            </form>
            </div>
        </>
     );
}
 
export default LoginPage;
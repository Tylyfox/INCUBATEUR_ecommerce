import axios from "axios";
import jwtDecode, { InvalidTokenError } from "jwt-decode";

function authenticated (credentials) {

    return axios
    .post("https://127.0.0.1:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {
        //stockage du tken dns le localStorage
        window.localStorage.setItem("authToken", token);
        //on previent Axios qu'on a un header par défaut qui contient un bearer + token sur toutes les futures requetes http
        axios.defaults.headers['Authorization'] = "Bearer " + token;
        return true;
    })
}

function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const jwtData =jwtDecode(token);
        if(jwtData.exp * 1000 > new Date().getTime()){
            axios.defaults.headers['Authorization'] = "Bearer " + token;
            console.log(axios.defaults.headers);
        } else {
            logout();
        }; 
    } else {
        logout();
        }
}

export default {
    authenticated,
    logout, 
    setup
}; 

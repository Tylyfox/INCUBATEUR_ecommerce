import axios from "axios";
import jwtDecode from "jwt-decode";

function authenticated (credentials) {

    return axios
    .post("https://127.0.0.1:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {
        //stockage du tken dns le localStorage
        window.localStorage.setItem("authToken", token);
        //on previent Axios qu'on a un header par défaut qui contient un bearer + token sur toutes les futures requetes http
       setAxiosToken(token);
        return true;
    })
}
function setAxiosToken(token) {
    axios.defaults.headers['Authorization'] = "Bearer " + token;
}

function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} =jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);        
        }
    }
}

function isAuthenticated () {
    const token = window.localStorage.getItem('authToken');

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            return true;
        } return false;
    }
    return false;
}

export default {
    authenticated,
    logout, 
    setup,
    isAuthenticated
}

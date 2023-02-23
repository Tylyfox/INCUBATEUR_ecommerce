import axios from "axios";

function authenticated (credentials) {

    return axios
    .post("https://127.0.0.1:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {
        //stockage du tken dns le localStorage
        window.localStorage.setItem("authToken", token);
        //on previent Axios qu'on a un header par défaut qui contient un bearer + token sur toutes les futures requetes http
        axios.defaults.headers['Authorization'] = "Bearer" + token;
        return true;
    })
}

export default {
    authenticated
}; 
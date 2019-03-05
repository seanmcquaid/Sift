import axios from "axios";

export default (userData) =>{
    const axiosPromise = axios({
        url : `${window.apiHost}/users/login`,
        method : "POST",
        data : userData
    })
    return{
        type: "LOGIN_ACTION",
        payload : axiosPromise
    }
}
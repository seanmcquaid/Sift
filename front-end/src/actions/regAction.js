import axios from "axios";

export default (registerData) =>{
    const axiosPromise = axios({
        url : `${window.apiHost}/users/register`,
        method : "POST",
        data : registerData
    })
    return{
        type: "REG_ACTION",
        payload : axiosPromise
    }
}
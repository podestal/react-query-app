import { API_URL } from "./config";
import axios from "axios";

export default (user) => {
    console.log(user)
    return axios.post(`http://127.0.0.1:8000/auth/users/`, user)
    .then(res => res.data)
    .catch(err => err)
}
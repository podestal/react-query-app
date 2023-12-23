import axios from "axios"
import { API_URL } from "./config"

export default () => {
    return axios.get(`${API_URL}/todos/`)
    .then(res => res.data)
    .catch(err => err)
}
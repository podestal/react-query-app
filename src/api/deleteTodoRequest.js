import axios from "axios";
import { API_URL } from "./config";

export default (id) => {
    return axios.delete(`${API_URL}/todos/${id}/`)
    .then(res => res.data)
    .catch(err => err)
}
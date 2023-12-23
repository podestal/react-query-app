import { API_URL } from "./config";
import axios from "axios";

export default (text) => {
    return axios.post(`${API_URL}/todos/`, { text })
}

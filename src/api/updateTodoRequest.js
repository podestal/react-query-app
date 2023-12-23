import axios from "axios"
import { API_URL } from "./config"

export default (todo) => {
    console.log(todo)
    return axios.put(`${API_URL}/todos/${todo.id}/`, todo)
    .then(res => res.data)
    .catch(err => err)
}
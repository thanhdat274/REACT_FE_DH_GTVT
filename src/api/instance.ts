import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8092/api"
})

export default instance;
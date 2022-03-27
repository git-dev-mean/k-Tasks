import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

class UserService {
  getAllUsers() {
    //   const token = authHeader();
    //   console.log(token);
    return axios.get(API_URL + "users", { headers: authHeader()});
  }
}

export default new UserService();

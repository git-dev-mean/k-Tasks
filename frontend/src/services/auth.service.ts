import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
  login(email: string, password: string) {
    return axios.post(API_URL + "login", { email, password }).then((res) => {
      if (res.data.access_token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
  }
  logout() {
    console.log("USER LOGOUT IN AUTH SERVICE");
    localStorage.removeItem("user");
  }
  register(name: string, email: string, password: string) {
    console.log("register user service");
    return axios.post(API_URL + "register", { name, email, password });
  }
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();

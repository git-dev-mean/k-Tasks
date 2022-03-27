import axios from "axios";
import ITask from "../types/task.type";
import authHeader from "./auth-header";


const API_URL = "http://localhost:8000/";

class TaskService {
  list_task() {
    return axios.get(API_URL + "list-tasks", { headers: authHeader()});
  }

  create_task(name: string) {
    return axios.post(API_URL + "create-task", { name }, { headers: authHeader()}).then((res) => {      
      return res.data;
    });
  }

  delete_task(tasks: ITask[]) {
    return axios.post(API_URL + "delete-task", { tasks }, { headers: authHeader()}).then((res) => {      
      return res.data;
    });
  }
}

export default new TaskService();

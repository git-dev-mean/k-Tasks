import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import TaskService from "../services/task.service";
import { Navigate } from "react-router-dom";
import ITask from "../types/task.type";
import { Table } from "react-bootstrap";
import EventBus from "../common/EventBus";

interface Props {
  text: string;
}
interface IState {
  redirect: string | null;
  userReady: boolean;
  accessToken: string;
}

const List_Tasks: React.FC = (): JSX.Element => {
  const [componentState, setComponentState] = useState<IState>({
    redirect: null,
    userReady: false,
    accessToken: "",
  });
  const [tasks, setTasks] = useState<ITask[]>([{ id: "", name: "" }]);

  useEffect(() => {
    const accessToken = AuthService.getCurrentUser();
    console.log(accessToken);
    setComponentState({ ...componentState, accessToken: accessToken });
    console.log(componentState.accessToken);
    if (!accessToken) <Navigate to="/home" />;

    TaskService.list_task()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        let tasksArr: ITask[] = [];
        data.map((task: ITask) => {
          tasksArr.push(task);
        });
        console.log(tasksArr);
        return tasksArr;
      })
      .then((data) => {
        console.log("data", data);
        setTasks(data);
        console.log(tasks);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          console.log("LOGIN FIRST ");
          EventBus.dispatch("logout");
        }
        console.log(err);
      });
  }, []);
  const TaskItems = tasks.map((task) => (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.name}</td>
    </tr>
  ));

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{TaskItems}</tbody>
      </Table>
    </div>
  );
};

export default List_Tasks;

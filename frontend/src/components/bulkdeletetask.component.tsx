import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import TaskService from "../services/task.service";
import { Navigate } from "react-router-dom";
import ITask from "../types/task.type";
import { Table } from "react-bootstrap";
import EventBus from "../common/EventBus";

interface IState {
  redirect: string | null;
  userReady: boolean;
  accessToken: string;
}

const BulkDeleteTask: React.FC = (): JSX.Element => {
  const [componentState, setComponentState] = useState<IState>({
    redirect: null,
    userReady: false,
    accessToken: "",
  });
  const [tasks, setTasks] = useState<ITask[]>([{ id: "", name: "" }]);
  const [selectedList, setSelectedList] = useState<ITask[]>([
    { id: "", name: "", delete: false },
  ]);
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

  const deleteSelectedRows = (): void => {
    console.log("delete Task ");
    TaskService.delete_task(selectedList).then((data) => console.log(data));
    console.log(selectedList);

    const newTasks = tasks.filter(function (el) {
      return selectedList.indexOf(el) < 0;
    });

    console.log(newTasks);
    setSelectedList([]);
    setTasks(newTasks);
  };

  const onItemCheck = (e: React.ChangeEvent<HTMLInputElement>, item: ITask) => {
    let tempList = tasks;
    tempList.map((task) => {
      if (task.id === item.id) {
        task.delete = e.target.checked;
      }
      return task;
    });

    //To Control Master Checkbox State
    // const totalItems = this.state.List.length;
    // const totalCheckedItems = tempList.filter((e) => e.selected).length;
    setTasks(tempList);
    setSelectedList(tasks.filter((e) => e.delete));
    // Update State
    // this.setState({
    //   MasterChecked: totalItems === totalCheckedItems,
    //   List: tempList,
    //   SelectedList: this.state.List.filter((e) => e.selected),
    // });
  };
  const TaskItems = tasks.map((task) => (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.name}</td>
      <td>
        <input
          type="checkbox"
          checked={task.delete}
          className="form-check-input"
          id={task.id}
          onChange={(e) => onItemCheck(e, task)}
        />
      </td>
    </tr>
  ));

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{TaskItems}</tbody>
      </Table>
      <button className="btn btn-primary" onClick={() => deleteSelectedRows()}>
        Delete Selected Rows
      </button>
    </div>
  );
};

export default BulkDeleteTask;

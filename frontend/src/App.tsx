import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LoginContext } from "./contexts/login.contexts";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import List_Tasks from "./components/listtasks.component";

import EventBus from "./common/EventBus";
import CreateTask from "./components/createtask.component";
import BulkDeleteTask from "./components/bulkdeletetask.component";
interface AppContextInterface {
  name?: string;
  accessToken?: string;
}
export const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      console.log("userinaptsx", user);
      setName(user);
    }
    EventBus.on("logout", logOut);
  }, [loggedInUser]);
  const logOut = () => {
    AuthService.logout();
    setLoggedInUser(undefined);
  };

  const user = loggedInUser;
  console.log("apptsx", user);
  return (
    <div>
      <LoginContext.Provider value={{ name, setName }}>
        {" "}
        <nav className="navbar navbar-expand navbar-dark bg-dark padding-10">
          <Link to="/" className="navbar-brand">
            Kwanso
          </Link>

          {name && (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/list-tasks" className="nav-link">
                  Tasks List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-task" className="nav-link">
                  Create Task
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/bulk-delete" className="nav-link">
                  Bulk Delete Task
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          )}
          {!name && (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<List_Tasks />} />
            <Route path="/list-tasks" element={<List_Tasks />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/bulk-delete" element={<BulkDeleteTask />} />
            <Route path="/login" element={<Login text="hi" />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </LoginContext.Provider>
    </div>
  );
};

export default App;

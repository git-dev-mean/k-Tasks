import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import TaskService from "../services/task.service";

interface IState {
  name: string;
  loading: boolean;
  message: string;
}
const CreateTask: React.FC = (): JSX.Element => {
  const [taskState, setTaskState] = useState<IState>({
    name: "",
    loading: false,
    message: "",
  });
  const navigate = useNavigate();
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required("This field is required!"),
    });
  };

  const handleRegister = (formValue: {
    name: string;
  }) => {
    const { name } = formValue;
    console.log(name);

    setTaskState({
      ...taskState,
      loading: true,
      message: "",
    });

    TaskService.create_task(name).then(
      () => {
        navigate("/list-tasks");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setTaskState({
          ...taskState,
          loading: false,
          message: resMessage,
        });
      }
    );
  };

  const initialValues = {
    name: "",
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={taskState.loading}
              >
                {taskState.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Create</span>
              </button>
            </div>

            {taskState.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {taskState.message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateTask;

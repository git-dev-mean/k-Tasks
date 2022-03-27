import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


interface IState {
  name: string;
  email: string;
  password: string;
  loading: boolean;
  message: string;
}
const Register: React.FC = (): JSX.Element => {
  const [componentState, setComponentState] = useState<IState>({
    name: "",
    email: "",
    password: "",
    loading: false,
    message: "",
  });
  const navigate = useNavigate();
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required("This field is required!"),
      email: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  };

  const handleRegister = (formValue: { name: string; email: string, password: string }) => {
    const { name, email, password } = formValue;
    console.log(name,email)

    setComponentState({
      ...componentState,
      loading: true,
      message: "",
    });

    AuthService.register(name,email, password).then(
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

        setComponentState({
          ...componentState,
          loading: false,
          message: resMessage,
        });
      }
    );
  };

  const initialValues = {
    name: "",
    email:"",
    password: "",
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

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
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={componentState.loading}
              >
                {componentState.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {componentState.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {componentState.message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { useNavigate  } from "react-router-dom";

interface Props {
  text: string;
}

interface IState {
  username: string;
  password: string;
  loading: boolean;
  message: string;
};
const Login: React.FC<Props> = (): JSX.Element => {
  const [ componentState, setComponentState ] = useState<IState>({
    username: "",
    password: "",
    loading: false,
    message: "",
  });
  const navigate = useNavigate();
  const validationSchema=()=> {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  const handleLogin=(formValue: { username: string; password: string })=> {
    const { username, password } = formValue;

    
    setComponentState({
      ...componentState,
      loading: true,
      message: ''
    });


    AuthService.login(username, password).then(
      () => {
        navigate('/list-tasks');
        // <props.history.push("/profile");
        // window.location.reload();>
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setComponentState({
          ...componentState,
          loading: false,
          message: resMessage
        });
      }
    );
  }
  const initialValues = {
    username: "",
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
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
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

export default Login;

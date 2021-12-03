import React from "react";
import "./Signup.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Signup = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required("You must enter a username for your post!"),
    password: Yup.string().min(5).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="signup">
      <h4 className="signup__title">Sign Up</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="signup__formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="signup__formInput"
            name="username"
            placeholder="Enter your username here"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="signup__formInput"
            name="password"
            type="password"
            placeholder="Enter your password here"
          />

          <button className="signup__button" type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;

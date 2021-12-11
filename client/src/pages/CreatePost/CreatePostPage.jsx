import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreatePostPage.scss";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

const CreatePostPage = () => {
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(250).required("You must input a Title!"),
    postText: Yup.string().required("You must enter text for your post!"),
    username: Yup.string()
      .min(3)
      .max(15)
      .required("You must enter a username for your post!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      history.push("/posts");
    });
  };

  useEffect(() => {
    if (!authState.status) {
      history.push("/login");
      alert("You must log in to create a post!");
    }
  }, []);

  return (
    <div className="createPostPage">
      <h4 className="createPostPage__title">Create Post</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="createPostPage__formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="createPostPage__formInput"
            name="title"
            placeholder="Name your post here"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            as="textarea"
            id="createPostPage__formInput"
            name="postText"
            placeholder="Type your post here"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="createPostPage__formInput"
            name="username"
            placeholder="Enter your username here"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePostPage;

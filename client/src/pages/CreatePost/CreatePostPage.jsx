import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreatePostPage.scss";

const CreatePostPage = () => {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(250).required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log("IT WORKED");
    });
  };
  return (
    <div className="createPostPage">
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

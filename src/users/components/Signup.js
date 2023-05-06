/* Packages */
import React, { useContext, useState, useEffect } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { Document, Page, pdfjs } from "react-pdf";

/* CSS */
import "./Login.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

/* Components */
const Signup = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failRes, setFailRes] = useState(false);
  const [failResMsg, setFailResMsg] = useState(
    "Sign up failed ,please try again"
  );

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  const previewHandler = () => {
    setPreviewMode(!previewMode);
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    resume: null,
  };

  const signInSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "min. 3 characters"),

    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "too short - min. 6 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain uppercase letter & 1 special character."
      ),
    resume: Yup.mixed()
      .required("A PDF file is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 3145728 // 3 MB in bytes
      )
      .test(
        "fileType",
        "Invalid file type. Only PDF files are allowed.",
        (value) => value && ["application/pdf"].includes(value.type)
      ),
  });

  const submitHandler = async (values) => {
    try {
      var formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("resume", values.resume);
      const response = await fetch(
        `${process.env.REACT_APP_USER_ROUTE}/signup`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setFailRes(true);
        setFailResMsg(responseData.msg);
        throw new Error(responseData.msg);
      }
      auth.login(responseData.userId, responseData.token);
      setFailRes(false);
      history.push("/");
    } catch (err) {
      setIsLoading(false);
      setFailRes(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        setIsLoading(true);
        submitHandler(values);
      }}
    >
      {(formik, setFieldValue) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            {failRes && <span className="error">{failResMsg}</span>}
            {isLoading && (
              <div className="preview-wrap">
                {" "}
                <LoadingSpinner />
              </div>
            )}
            <Form>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <Field
                  type="name"
                  name="name"
                  id="name"
                  className={errors.name && touched.name ? "input-error" : null}
                />
                <span className={formik.errors.name ? "error" : "no-error"}>
                  {touched.name &&
                    (formik.errors.name ? formik.errors.name : "✓")}
                </span>
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <span className={formik.errors.email ? "error" : "no-error"}>
                  {touched.email &&
                    (formik.errors.email ? formik.errors.email : "✓")}
                </span>
              </div>
              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <span className={formik.errors.password ? "error" : "no-error"}>
                  {touched.password &&
                    (formik.errors.password ? formik.errors.password : "✓")}
                </span>
              </div>
              <div className="form-row">
                <label htmlFor="resume">Resume</label>
                <div className="preview-row">
                  <Field
                    style={{ padding: "0", margin: "0" }}
                    type="file"
                    name="resume"
                    id="resume"
                    value={Field.value || ""}
                    accept=".pdf"
                    onChange={async (event) => {
                      console.log(event.target.files);
                      await formik.setFieldValue(
                        event.target.name,
                        event.target.files[0]
                      );
                      console.log(formik.values);
                      console.log(formik.values.resume);
                    }}
                    className={
                      errors.resume && touched.resume ? "input-error" : null
                    }
                  />

                  {formik.errors.resume ? (
                    <button
                      type="button"
                      style={{ opacity: ".5" }}
                      className="preview-button"
                      disabled
                    >
                      <FontAwesomeIcon icon={faEyeSlash} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="preview-button"
                      onClick={previewHandler}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  )}
                </div>

                <span className={formik.errors.resume ? "error" : "no-error"}>
                  {touched.resume &&
                    (formik.errors.resume ? formik.errors.resume : "✓")}
                </span>
              </div>
              {previewMode && (
                <div className="preview-wrap">
                  <div className="preview-window">
                    <Document
                      className="preview-doc"
                      file={formik.values.resume}
                    >
                      <button
                        type="button"
                        className="preview-close-button"
                        onClick={previewHandler}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                      <Page
                        className="preview-page"
                        style={{ width: "auto", height: "100%" }}
                        scale={0.59}
                        pageNumber={1}
                      />
                    </Document>
                  </div>
                </div>
              )}

              <div className="submit-btn-wrap">
                <button
                  type="submit"
                  className={
                    !(dirty && isValid) ? "disabled-btn" : "enabled-btn"
                  }
                  disabled={!(dirty && isValid)}
                >
                  Sign Up
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Signup;

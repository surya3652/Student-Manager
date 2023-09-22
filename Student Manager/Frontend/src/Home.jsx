import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import { useState, useEffect } from "react";
import "./assets/css/analyze.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [msg, setmsg] = useState();
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  const [login, setlogin] = useState(false);

  const [isNewUser, setIsNewUser] = useState(false);

  const [userName, setUserName] = useState(null);

  const toggleView = () => {
    setIsNewUser(!isNewUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      if (isNewUser) {
        const response = await axios.post(
          "http://localhost:5000/api/newuser",
          userData
        );
        console.log("User registered successfully:", response.data.message);
        if (response.data.message === "ID already exists") {
          toast.success("Username already exists");
        } else {
          console.log("Registration successful");
          toast.success("Registration Successful");
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/login",
          userData
        );
        console.log("User logged in successfully:", response.data.record);
        if (response.data.message === "Record not found") {
          toast.error("Record not found, Please Register");
        } else {
          toast.success("HELLO " + response.data.record.email);
          setlogin(true);
        }
      }
    } catch (error) {
      console.error("Axios Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
    }
  };

  return (
    <>
      {login ? (
        <>
          <IndexNavbar />
          <div className="wrapper">
            <PageHeader />
            <div className="main"></div>
            <Footer />
          </div>
        </>
      ) : (
        <>
          <br /> <br /> <br /> <br /> <br /> <br /> <br />
          <Container className="mt-5">
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <h2>{isNewUser ? "User Registration" : "User Login"}</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" block>
                    {isNewUser ? "Register" : "Sign In"}
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    block
                    onClick={toggleView}
                  >
                    {isNewUser
                      ? "Already have an account? Sign In"
                      : "New user? Register"}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./assets/css/analyze.css";
import axios from "axios";
import DataDisplay from "showTable";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import { NotificationContainer } from "react-notifications";
import { Button, Container, Modal} from "reactstrap";

export default function Analyse() {
  const [fulldata, setFulldata] = useState([]);
  const [showdata, setShowdata] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [gpa, setGpa] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "id":
        setId(value);
        break;
      case "name":
        setName(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "year":
        setYear(value);
        break;
      case "gpa":
        setGpa(value);
        break;
      default:
        break;
    }
  };

  const handleShowData = () => {
    axios({
      method: "POST",
      url: "http://localhost:5000/api/getdata", // Replace with the correct API endpoint
    })
      .then((response) => {
        setFulldata(response.data);
        setShowdata(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    let apiUrl = "http://localhost:5000";
    let method = "";

    switch (selectedOption) {
      case "insert":
        apiUrl = `${apiUrl}/api/insert`;
        method = "POST";
        break;
      case "update":
        apiUrl = `${apiUrl}/api/update`;
        method = "PUT";
        break;
      case "find":
        apiUrl = `${apiUrl}/api/find`;
        method = "POST";
        break;
      case "delete":
        apiUrl = `${apiUrl}/api/delete`;
        method = "DELETE";
        break;
      default:
        break;
    }

    const data = { id, name, gender, year, gpa };
    if (selectedOption === "find") {
      data.id = id;
      fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            toast.success(`Operation was successful!\n\n
            Name: ${result.record.name}\n
            Gender: ${result.record.gender}\n
            ID: ${result.record.id}\n
            year: ${result.record.year}\n
            gpa: ${result.record.gpa}`)
          } else {
            toast.error("Operation failed: " + result.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Set an error message and show the notification
          toast.error(
            "An error occurred while processing the request."
          );
        });
    } else {
      data.id = id;
      data.name = name;
      data.gender = gender;
      data.year = year;
      data.gpa = gpa;
      fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            toast.success(
              `Operation was successful! ${result.message}`,'',3000
            );
          } else {
            toast.error("Operation failed: " + result.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error(
            "An error occurred while processing the request."
          );
        });
    }
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "insert":
      case "update":
        return (
          <div>
            <br />
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={id}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={gender}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="year"
              placeholder="year"
              value={year}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="gpa"
              placeholder="gpa"
              value={gpa}
              onChange={handleInputChange}
            />
          </div>
        );
      case "delete":
      case "find":
        return (
          <div>
            <br />
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={id}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  };
  console.log(fulldata);

  return (
    <>
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      
      <IndexNavbar />
      <div style={{marginTop:"80px"}} className="wrapper">
        <div
          className="main"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%",
            minHeight: "90vh",
          }}
        >
          <div className="section section-basic" id="input-form">
            <Container>
              <div>
              {!selectedOption && (
                  <div>
                    <br />
                    <br />
                    <h1>Choose an option</h1>
                  </div>
                )}
                <button onClick={handleShowData}>Show Data in MongoDB</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => handleOptionChange("insert")}>
                  Insert
                </button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => handleOptionChange("update")}>
                  Update
                </button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => handleOptionChange("find")}>Find</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => handleOptionChange("delete")}>
                  Delete
                </button>
                {selectedOption && (
                  <div>
                    {renderForm()}
                    <button onClick={handleSubmit}>Submit</button>
                  </div>
                )}
                
              </div>
            </Container>
            {showdata && <DataDisplay data={fulldata.data} />}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

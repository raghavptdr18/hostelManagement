import React from "react";
import PersonalInfo from "./PersonalInfo";
import CommunicationDetails from "./CommunicationDetails";
import DashboardNavBar from "./DashboardNavBar";
import { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import spinner from "../../images/SpinnerWhite.gif";
import { getToken } from "../SignIn_SignUp/Sessions";
import "./roomChange.css";
import axios from "axios";
import RoomCard from "./RoomCard";

import { useNavigate } from "react-router-dom";
import DefaultProfilePicture from "../../images/default-profile-picture.svg";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [myData, setMyData] = useState([]);
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    prevRoom: "",
    reqRoom: "",
    reason: "",
    phone: "",
    exchange: "",
    exchangeId: "",
    comment: "",
  });
  const [activeComponent, setActiveComponent] = useState("guide");

  useEffect(() => {
    axios
      .get("/get-user-info", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        // console.log(response.data);
        setEmail(response.data.email_id);
        if (response.data === 1) {
        } else {
          const id = response.data.email_id;
          // console.log(id);
          axios.get(`/myRoomRequest/${id}`).then((response) => {
            console.log("ye wala" + JSON.stringify(response.data));
            setMyData(response.data);
          });
        }
      });
  });

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const formData = {
      email_id: email,
      prev_room: form.prevRoom,
      req_room: form.reqRoom,
      reason: form.reason,
      comments: form.comment,
      isexchange: form.exchange,
      exchange_id: form.exchangeId,
      phone: form.phone,
    };
    axios
      .post("/postRoomRequest", formData)
      .then((response) => {
        // console.log(response.data); // log the response data
        alert("Your room change request was sent!");
      })
      .catch((error) => {
        console.log(error); // log any errors
        // if there was an error, show an error message to the user
        alert("Error submitting request.");
      });
    setActiveComponent("my-requests");
  };
  const handleRegisterInputChange = (event) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };
  return (
    <>
      <DashboardNavBar currentFlag={4} />
      <div style={{ display: "flex" }}>
        <div className="part1" style={{ width: "33.33%" }}>
          <Button
            style={{ width: "100%", borderRadius: "0px" }}
            className={activeComponent === "guide" ? "activeButton" : "myBtn"}
            onClick={() => {
              setActiveComponent("guide");
            }}
          >
            Guidelines
          </Button>
        </div>
        <div style={{ width: "33.33%" }} className="part2">
          <Button
            style={{ width: "100%", borderRadius: "0px" }}
            className={
              activeComponent === "my-requests" ? "activeButton" : "myBtn"
            }
            onClick={() => {
              setActiveComponent("my-requests");
            }}
          >
            My requests
          </Button>
        </div>
        <div style={{ width: "33.33%" }} className="part3">
          <Button
            style={{ width: "100%", borderRadius: "0px" }}
            className={activeComponent === "form" ? "activeButton" : "myBtn"}
            onClick={() => {
              setActiveComponent("form");
            }}
          >
            Request form
          </Button>
        </div>
      </div>
      {activeComponent === "guide" ? (
        <>
          <div style={{ padding: "5rem" }}>
            <ol type="number">
              <li style={{ marginBottom: "1rem" }}>
                1. <span style={{ paddingLeft: "1rem" }}></span>Make sure that
                you have a valid reason for requesting a room change. Room
                changes are usually granted for issues like noise disturbance,
                problems with roommates, or other significant factors.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                2. <span style={{ paddingLeft: "1rem" }}></span>Before
                submitting a request for a room change, try to talk to your
                roommate(s) to address any issues you may be experiencing.{" "}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                3. <span style={{ paddingLeft: "1rem" }}></span>If you have
                tried to resolve the issue with your roommate(s) but are still
                experiencing significant problems, you can submit a room change
                request.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                4. <span style={{ paddingLeft: "1rem" }}></span>Room changes are
                typically processed on a first-come, first-served basis, and
                availability of rooms may be limited. Be patient and wait for
                your request to be processed.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                5. <span style={{ paddingLeft: "1rem" }}></span>Make sure to
                provide accurate and up-to-date information in your room change
                request.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                6. <span style={{ paddingLeft: "1rem" }}></span>If you haven't
                heard back about your room change request within a reasonable
                amount of time, follow up with the hostel management to inquire
                about the status of your request.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                7. <span style={{ paddingLeft: "1rem" }}></span>Keep an open
                mind about the type of room you are requesting. While it's
                important to have specific preferences, being too rigid in your
                requirements can limit your options.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                8. <span style={{ paddingLeft: "1rem" }}></span>Be aware of the
                timing of your request. Room changes may be more difficult to
                process during peak times, such as the start of a new semester
                or during popular events.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                9. <span style={{ paddingLeft: "1rem" }}></span>Remember that
                the hostel management is doing their best to accommodate your
                request. Be gracious and thank them for their assistance.
              </li>
              <li>
                10. <span style={{ paddingLeft: "1rem" }}></span>Before
                submitting a room change request, students should check the
                hostel policy on room changes.
              </li>
            </ol>
          </div>
        </>
      ) : (
        <></>
      )}
      {activeComponent === "form" ? (
        <>
          <div
            style={{ width: "80%", margin: "auto" }}
            className="mt-5 md:mt-0 md:col-span-2"
          >
            <form onSubmit={handleSubmitForm}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* Applicant's Name */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="prevRoom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Default Email ID
                      </label>
                      <input
                        readOnly
                        type="text"
                        name="prevRoom"
                        placeholder={email}
                        id="prevRoom"
                        onChange={handleRegisterInputChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="prevRoom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Previous Room Number
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="prevRoom"
                        placeholder="Previous room number"
                        value={form.prevRoom}
                        id="prevRoom"
                        onChange={handleRegisterInputChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="reqRoom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Desired room number
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="reqRoom"
                        placeholder="Request room number"
                        value={form.reqRoom}
                        onChange={handleRegisterInputChange}
                        id="reqRoom"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="reason"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Reason
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="reason"
                        placeholder="State a valid reason"
                        value={form.reason}
                        onChange={handleRegisterInputChange}
                        id="reason"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={handleRegisterInputChange}
                        name="phone"
                        id="phone"
                        placeholder="10 digit number"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Category */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="exchange"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Is it a room exchange request ?
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <select
                        id="exchange"
                        name="exchange"
                        value={form.exchange}
                        onChange={handleRegisterInputChange}
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select one</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    {form.exchange === "yes" ? (
                      <>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="exchangeId"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email ID of other person
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="email"
                            value={form.exchangeId}
                            onChange={handleRegisterInputChange}
                            name="exchangeId"
                            id="exchangeId"
                            placeholder="Email ID of exchanger (for verification)"
                            required
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Additional Comments
                      </label>
                      <input
                        type="text"
                        value={form.comment}
                        onChange={handleRegisterInputChange}
                        name="comment"
                        id="comment"
                        placeholder="Additional comments (if any)"
                        // required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-4 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
                {!isLoading ? (
                  <button
                    style={{
                      backgroundColor: "#1f2937",
                    }}
                    type="submit"
                    className="text-white focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Request
                  </button>
                ) : (
                  <button
                    disabled
                    type="submit"
                    className="text-white focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <img
                      className="h-5 w-5 mx-auto"
                      alt="spinner"
                      src={spinner}
                    />
                  </button>
                )}

                {/* <button
                            onClick={closePersonalInfo}
                            data-modal-toggle="personalDetailsModal"
                            type="button"
                            className="text-gray-500 focus:outline-none bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            Cancel
                          </button> */}
              </div>
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
      {activeComponent === "my-requests" ? (
        <>
        <div className="mt-5 md:mt-0 md:col-span-2">
          {
           myData.map((data)=>(
           <RoomCard 
           id = {data._id}
           prevRoom={data.prev_room}
           reqRoom = {data.req_room}
           reason = {data.reason}
           isexchange = {data.isexchange}
           exchange_id = {data.exchange_id}
           request_status={data.request_status}
           /> 
           
           ))
          }
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

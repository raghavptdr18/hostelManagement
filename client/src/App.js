import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./components/SignIn_SignUp/Sessions";
import Logout from "./components/SignIn_SignUp/Logout";
import ContactUs from "./components/Landing/ContactUs";

import Error from "./components/Landing/Error";
import WithHeaderFooter from "./components/Landing/WithHeaderFooter";
import GuideLines from "./components/Landing/GuideLines";
import Profile from "./components/Applicant/Profile";
import SignInStartPage from "./components/SignIn_SignUp/SignInStartPage";
import ForgotPasswordPage from "./components/SignIn_SignUp/ForgotPasswordPage";
import ApplicantHomePage from "./components/Applicant/ApplicantHomePage";

import Complaint from "./components/Applicant/complaint";
import Water from "./components/forms/water";
import SeeComplaint from "./components/Admin/seeComplaint";
import AddFees from "./components/Admin/AddFess";
import SolvedComplaint from "./components/Admin/SolvedComplaints";
import RoomChange from "./components/Applicant/roomChange";
import MyComplaint from "./components/Applicant/MyComplaint";
import FeesSection from "./components/Applicant/PendingFeesSection";
import FeesHistorySection from "./components/Applicant/FeesHistorySection";

// Admin
import ManageAdmins from "./components/Admin/ManageAdmins";
import WithNavbarAndSidebar from "./components/Admin/WithNavbarAndSidebar";
import AdminProfile from "./components/Admin/AdminProfile";
import AddStudents from "./components/Admin/AddStudents";
import ViewStudents from "./components/Admin/ViewStudents";
// import Complaint from "./components/complaint";

function App() {
  // Pages that can only be accessed if you are logged in
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = getToken();

    if (isAuthenticated) {
      return children;
    }

    return <Navigate to="error" />;
  };

  // Login page can only be accessed if you are logged out
  const SpecialRoute = ({ children }) => {
    const isAuthenticated = getToken();

    if (isAuthenticated) {
      return <Navigate to="/home" />;
    }

    return children;
  };

  return (
    <BrowserRouter className="font-cereal-font">
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <ApplicantHomePage />
            </PrivateRoute>
          }
        />
        {/* <Route path ="/electricityform" element={<Electricity/>}/>
        <Route path ="/furnitureform" element={<Furniture/>}/>
        <Route path ="/equipmentsform" element={<Equipments/>}/> */}
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/mycomplaint"
          element={
            <PrivateRoute>
              <MyComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/registercomplaint"
          element={
            <PrivateRoute>
              <Complaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/roomchange"
          element={
            <PrivateRoute>
              <RoomChange />
            </PrivateRoute>
          }
        />
        <Route
          path="/waterform"
          element={
            <PrivateRoute>
              <Water />
            </PrivateRoute>
          }
        />
        <Route
          path="/fees-section-pending-requests"
          element={
            <PrivateRoute>
              <FeesSection />
            </PrivateRoute>
          }
        />
        <Route
          path="/fees-section-fees-history"
          element={
            <PrivateRoute>
              <FeesHistorySection />
            </PrivateRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />

        <Route element={<WithNavbarAndSidebar />}>
          <Route
            path="/admin/profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/admin/manage-admins/"
            element={
              <PrivateRoute>
                <ManageAdmins />
              </PrivateRoute>
            }
          />
          <Route
            path="/AddStudents/add-students/"
            element={
              <PrivateRoute>
                <AddStudents />
              </PrivateRoute>
            }

          />
          <Route
            path="/ViewStudents/view-students/"
            element={
              <PrivateRoute>
                <ViewStudents />
              </PrivateRoute>
            }

          />
          <Route
            path="/admin/fees"
            element={
              <PrivateRoute>
                <AddFees />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/complaints"
            element={
              <PrivateRoute>
                <SeeComplaint />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/solvedcomplaints"
            element={
              <PrivateRoute>
                <SolvedComplaint />
              </PrivateRoute>
            }
          />

        </Route>
        <Route element={<WithHeaderFooter />}>
          <Route path="/" element=
            {
              <SpecialRoute>
                <SignInStartPage />
              </SpecialRoute>
            }></Route>
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/guidelines" element={<GuideLines />}></Route>
          <Route
            path="/forgot-password"
            element={
              <SpecialRoute>
                <ForgotPasswordPage />
              </SpecialRoute>
            }
          />
          <Route path="/*" element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

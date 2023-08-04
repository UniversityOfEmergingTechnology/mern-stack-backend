import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import PrivateRoute from "./components/Auth/PrivateRoute";
import OpenRoute from "./components/Auth/OpenRoute";
import Settings from "./components/Dashboard/Settings/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import {useSelector} from 'react-redux'
import AddCourse from "./components/Dashboard/AddCourse";
import MyCourses from "./components/Dashboard/MyCourses";
import EditCourse from "./components/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import EnrolledCourses from "./components/Dashboard/EnrolledCourses";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/ViewCourse/VideoDetails";
import Cart from "./components/Dashboard/Cart";
import Instructor from "./components/Dashboard/InstructorDashboard/Instructor";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import Error from "./pages/Error";

function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <>
      <Routes>
      <Route path="*" element={<Error />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>
        <Route path="/contact-us" element={<ContactUs/>}></Route>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        ></Route>

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path='dashboard/settings' element={<Settings/>}/>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="dashboard/cart" element={<Cart />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse/>}/>
                <Route path="/dashboard/my-courses" element={<MyCourses/>} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                <Route path='dashboard/instructor' element={<Instructor/>}></Route>
              </>
            )
          }

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}></Route>
            )}
        </Route>
      </Routes>
    </>
  );
}

export default App;

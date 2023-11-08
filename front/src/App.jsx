import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientRecords from "./components/PatientRecords.jsx";
import Schedule from "./Pages/Schedule.jsx";
import HomePage from "./Pages/HomePage.jsx"; // Import the home page component
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Login";
import AppLayout from "./Pages/AppLayout";
import SignUp from "./Pages/SignUp"; // talked with Mihir to resolve the warning from eslint
// but wasn't able to solve it

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="app" element={<AppLayout />}>
          <Route path="patient-records" element={<PatientRecords />} />
        </Route>
        <Route path="app/scheduling" element={<Schedule />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

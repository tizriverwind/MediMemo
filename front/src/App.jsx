import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientRecords from "./components/PatientRecords.jsx";
import Scheduling from "./components/Scheduling.jsx";
import HomePage from "./Pages/HomePage.jsx"; // Import the home page component
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Login";
import AppLayout from "./Pages/AppLayout";
import SignUp from "./Pages/SignUp"; // talked with Mihir to resolve the warning from eslint
// but wasn't able to solve it
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "patient-records",
        element: <PatientRecords />,
      },
      {
        path: "scheduling",
        element: <Scheduling />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

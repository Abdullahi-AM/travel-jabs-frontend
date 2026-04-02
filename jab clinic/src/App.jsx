import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/authContext.jsx";
import Layout from "./components/layout/Layout";
import Home from "./views/Home";
import Clinics from "./views/Clinics";
import BookAppointment from "./views/BookAppointment";
import Appointments from "./views/Appointments";
import Vaccines from "./views/Vaccines";
import Staff from "./views/Staff";
import AboutMe from "./views/AboutMe";
import Login from "./views/Login";
import NotFound from "./views/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/book/:clinicId" element={<BookAppointment />} />
            <Route path="/appointments/:clinicId" element={<Appointments />} />
            <Route path="/vaccines" element={<Vaccines />} />
            <Route path="/staff/:clinicId" element={<Staff />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

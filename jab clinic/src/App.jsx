import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./views/Home";
import Clinics from "./views/Clinics";
import BookAppointment from "./views/BookAppointment";
import Appointments from "./views/Appointments";
import NotFound from "./views/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/book/:clinicId" element={<BookAppointment />} />
          <Route path="/appointments/:clinicId" element={<Appointments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

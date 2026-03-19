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
        <main>
          <h1>Clinics</h1>
          {clinics.map((clinic) => (
                          <Card key={clinic.ClinicID}>
                              <h3>{clinic.ClinicName}</h3>
                              <p>{clinic.ClinicAddress}</p>
                              <p>{clinic.ClinicPostcode}</p>
                              <p>Contact: {clinic.ClinicContact}</p>
                              <p>Manager: {clinic.ClinicManagerFirstname} {clinic.ClinicManagerLastname}</p>
                              </Card>
                      ))}
        </main>
        <h1>Staff</h1>
        {staff.map((staff) => (
                          <Card key={staff.StaffID}>
                              <h3>{staff.StaffFirstname} {staff.StaffLastname}</h3>
                              <p>{staff.StaffRoleID}</p>
                              <p>{staff.StaffRoleName}</p>
                              <p>{staff.StaffClinicID}</p>
                              <p>{staff.StaffClinicName}</p>
                              
                              </Card>
                             
                      ))}
      </Layout>
    </BrowserRouter>
  );
}

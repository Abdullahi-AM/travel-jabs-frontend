import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../components/api/API.js";
import apiURL from "../components/api/apiURL.js";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Clinics() {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClinics() {
      try {
        const response = await API.get(`${apiURL}/clinics`);
        if (response.isSuccess) setClinics(response.result);
        else throw new Error(response.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchClinics();
  }, []);

  if (loading) return <p>Loading clinics...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!clinics || clinics.length === 0) return <p>No clinics found.</p>;

  return (
    <CardContainer>
      {clinics.map((clinic) => (
        <Card key={clinic.ClinicID}>
          <h3>{clinic.ClinicName}</h3>
          <p>{clinic.ClinicAddress}</p>
          <p>{clinic.ClinicPostcode}</p>
          <p>Contact: {clinic.ClinicContact}</p>
          <button onClick={() => navigate(`/book/${clinic.ClinicID}`)}>Book Appointment</button>
          <button onClick={() => navigate(`/appointments/${clinic.ClinicID}`)}>View Appointments</button>
          <button onClick={() => navigate(`/staff/${clinic.ClinicID}`)}>View Staff</button>
        </Card>
      ))}
    </CardContainer>
  );
}
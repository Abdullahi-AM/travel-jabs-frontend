import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Appointments() {
  const { clinicId } = useParams();

  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch("https://softwarehub.uk/unibase/traveljabs/v1/api/appointments");
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        const filtered = data.filter((a) => a.AppointmentClinicID === parseInt(clinicId));
        setAppointments(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [clinicId]);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!appointments || appointments.length === 0) return <p>No appointments found.</p>;

  return (
    <div>
      <h2>Appointments</h2>

      <CardContainer>
        {appointments.map((appointment) => (
          <Card key={appointment.AppointmentID}>
            <p>{new Date(appointment.AppointmentDatetime).toLocaleString()}</p>
            <p>Patient: {appointment.AppointmentPatientFirstname} {appointment.AppointmentPatientLastname}</p>
            <p>Clinician: {appointment.AppointmentStaffFirstname} {appointment.AppointmentStaffLastname}</p>
            <p>Status: {appointment.AppointmentStatusName}</p>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}

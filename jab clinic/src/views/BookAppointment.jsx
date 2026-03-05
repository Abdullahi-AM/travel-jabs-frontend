import { useParams } from "react-router-dom";

export default function BookAppointment() {
  const { clinicId } = useParams();

  return (
    <div>
      <h2>Book Appointment</h2>
      <p>Booking for clinic {clinicId}</p>
    </div>
  );
}

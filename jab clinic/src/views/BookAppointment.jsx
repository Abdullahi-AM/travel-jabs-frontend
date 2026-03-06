import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookAppointment() {
  const { clinicId } = useParams();

  const initialAppointment = {
    AppointmentDatetime: "",
    AppointmentPatientID: 0,
    AppointmentClinicID: parseInt(clinicId),
    AppointmentStaffID: 0,
    AppointmentStatusID: 1
  };

  const [appointment, setAppointment] = useState(initialAppointment);
  const [patients, setPatients] = useState(null);
  const [clinicians, setClinicians] = useState(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch("https://softwarehub.uk/unibase/traveljabs/v1/api/patients");
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    async function fetchClinicians() {
      try {
        const response = await fetch(`https://softwarehub.uk/unibase/traveljabs/v1/api/staff/clinics/${clinicId}/clinicians`);
        if (!response.ok) throw new Error("Failed to fetch clinicians");
        const data = await response.json();
        setClinicians(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchPatients();
    fetchClinicians();
  }, [clinicId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: name === "AppointmentDatetime" ? value : parseInt(value) });
  };

  const handleSubmit = () => alert(JSON.stringify(appointment));

  return (
    <div>
      <h2>Book Appointment</h2>

      <div className="FormTray">
        <label>
          Date and Time
          <input
            type="datetime-local"
            name="AppointmentDatetime"
            value={appointment.AppointmentDatetime}
            onChange={handleChange}
          />
        </label>

        <label>
          Patient
          {!patients ? (
            <p>Loading records ...</p>
          ) : (
            <select
              name="AppointmentPatientID"
              value={appointment.AppointmentPatientID}
              onChange={handleChange}
            >
              <option value="0" hidden>No patient selected</option>
              {patients.map((patient) => (
                <option key={patient.PatientID} value={patient.PatientID}>
                  {patient.PatientFirstname} {patient.PatientLastname}
                </option>
              ))}
            </select>
          )}
        </label>

        <label>
          Clinician
          {!clinicians ? (
            <p>Loading records ...</p>
          ) : (
            <select
              name="AppointmentStaffID"
              value={appointment.AppointmentStaffID}
              onChange={handleChange}
            >
              <option value="0" hidden>No clinician selected</option>
              {clinicians.map((clinician) => (
                <option key={clinician.StaffID} value={clinician.StaffID}>
                  {clinician.StaffFirstname} {clinician.StaffLastname}
                </option>
              ))}
            </select>
          )}
        </label>
      </div>

      <div className="action-tray">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../components/api/API.js";
import apiURL from "../components/api/apiURL.js";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Appointments() {
  const { clinicId } = useParams();

  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState(null);
  const [clinicians, setClinicians] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await API.get(`${apiURL}/appointments/clinics/${clinicId}`);
      if (response.isSuccess) setAppointments(response.result);
      else setAppointments([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [clinicId]);

  useEffect(() => {
    async function fetchPatients() {
      const response = await API.get(`${apiURL}/patients`);
      if (response.isSuccess) setPatients(response.result);
    }
    async function fetchClinicians() {
      const response = await API.get(`${apiURL}/staff/clinics/${clinicId}/clinicians`);
      if (response.isSuccess) setClinicians(response.result);
    }
    fetchPatients();
    fetchClinicians();
  }, [clinicId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedAppointment({ ...selectedAppointment, [name]: name === "AppointmentDatetime" ? value : parseInt(value) });
  };

  const handleModify = (appointment) => {
    setSelectedAppointment({
      ...appointment,
      AppointmentDatetime: appointment.AppointmentDatetime.slice(0, 16)
    });
    setSubmitMessage(null);
    setErrors({});
  };

  const handleCancel = () => {
    setSelectedAppointment(null);
    setSubmitMessage(null);
    setErrors({});
  };

  const isValid = {
    AppointmentDatetime: (value) => value && value.length > 0,
    AppointmentPatientID: (value) => value && value > 0,
    AppointmentStaffID: (value) => value && value > 0
  };

  const errorMessage = {
    AppointmentDatetime: "Date and time is required",
    AppointmentPatientID: "Patient must be selected",
    AppointmentStaffID: "Clinician must be selected"
  };

  const isValidRecord = (record) => {
    let isRecordValid = true;
    Object.keys(isValid).forEach((key) => {
      const value = record[key];
      if (isValid[key](value)) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isRecordValid = false;
      }
    });
    setErrors({ ...errors });
    return isRecordValid;
  };

  const handleSubmit = async () => {
    if (!isValidRecord(selectedAppointment)) return;
    const response = await API.put(`${apiURL}/appointments/${selectedAppointment.AppointmentID}`, selectedAppointment);
    if (response.isSuccess) {
      setSubmitMessage("Appointment updated successfully!");
      setSelectedAppointment(null);
      setErrors({});
      fetchAppointments();
    } else {
      setSubmitMessage(`Update unsuccessful: ${response.message}`);
    }
  };

  const handleDelete = async (id) => {
    const response = await API.delete(`${apiURL}/appointments/${id}`);
    if (response.isSuccess) {
      setSubmitMessage("Appointment deleted successfully!");
      fetchAppointments();
    } else {
      setSubmitMessage(`Failed to delete: ${response.message}`);
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!appointments || appointments.length === 0) return <p>No appointments found.</p>;

  return (
    <div>
      <h2>Appointments</h2>

      {submitMessage && <p>{submitMessage}</p>}

      {selectedAppointment && (
        <div className="FormTray">
          <label>
            Date and Time
            <input
              type="datetime-local"
              name="AppointmentDatetime"
              value={selectedAppointment.AppointmentDatetime}
              onChange={handleChange}
            />
            {errors.AppointmentDatetime && <p className="form-error">{errors.AppointmentDatetime}</p>}
          </label>

          <label>
            Patient
            {!patients ? (
              <p>Loading records ...</p>
            ) : (
              <select
                name="AppointmentPatientID"
                value={selectedAppointment.AppointmentPatientID}
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
            {errors.AppointmentPatientID && <p className="form-error">{errors.AppointmentPatientID}</p>}
          </label>

          <label>
            Clinician
            {!clinicians ? (
              <p>Loading records ...</p>
            ) : (
              <select
                name="AppointmentStaffID"
                value={selectedAppointment.AppointmentStaffID}
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
            {errors.AppointmentStaffID && <p className="form-error">{errors.AppointmentStaffID}</p>}
          </label>

          <div className="action-tray">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      <CardContainer>
        {appointments.map((appointment) => (
          <Card key={appointment.AppointmentID}>
            <p>{new Date(appointment.AppointmentDatetime).toLocaleString()}</p>
            <p>Patient: {appointment.AppointmentPatientFirstname} {appointment.AppointmentPatientLastname}</p>
            <p>Clinician: {appointment.AppointmentStaffFirstname} {appointment.AppointmentStaffLastname}</p>
            <p>Status: {appointment.AppointmentStatusName}</p>
            <button onClick={() => handleModify(appointment)}>Modify</button>
            <button onClick={() => handleDelete(appointment.AppointmentID)}>Delete</button>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}

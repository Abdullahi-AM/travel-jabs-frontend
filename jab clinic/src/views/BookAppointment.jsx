import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookAppointment() {
  const { clinicId } = useParams();
  const navigate = useNavigate();

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
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState(null);

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
    if (!isValidRecord(appointment)) return;

    const request = {
      method: "POST",
      body: JSON.stringify(appointment),
      headers: { "Content-Type": "application/json" }
    };

    try {
      const response = await fetch("https://softwarehub.uk/unibase/traveljabs/v1/api/appointments", request);
      const result = await response.json();

      if (response.status >= 200 && response.status < 300) {
        setSubmitMessage("Appointment booked successfully!");
        setAppointment(initialAppointment);
        setErrors({});
      } else {
        setSubmitMessage(`Submission unsuccessful: ${result.message}`);
      }
    } catch (err) {
      setSubmitMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>

      {submitMessage && <p>{submitMessage}</p>}

      <div className="FormTray">
        <label>
          Date and Time
          <input
            type="datetime-local"
            name="AppointmentDatetime"
            value={appointment.AppointmentDatetime}
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
          {errors.AppointmentPatientID && <p className="form-error">{errors.AppointmentPatientID}</p>}
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
          {errors.AppointmentStaffID && <p className="form-error">{errors.AppointmentStaffID}</p>}
        </label>
      </div>

      <div className="action-tray">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => navigate("/clinics")}>Cancel</button>
      </div>
    </div>
  );
}

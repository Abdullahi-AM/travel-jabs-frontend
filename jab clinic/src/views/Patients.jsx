import { useState, useEffect } from "react";
import API from "../components/api/API.js";
import apiURL from "../components/api/apiURL.js";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Patients() {
  const initialPatient = {
    PatientFirstname: "",
    PatientLastname: "",
    PatientAddress: "",
    PatientPostcode: "",
    PatientAge: ""
  };

  const [patients, setPatients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPatient, setNewPatient] = useState(initialPatient);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState(null);

  const fetchPatients = async () => {
    try {
      const response = await API.get(`${apiURL}/patients`);
      if (response.isSuccess) setPatients(response.result);
      else throw new Error(response.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const isValid = {
    PatientFirstname: (value) => value && value.length > 0,
    PatientLastname: (value) => value && value.length > 0,
    PatientAge: (value) => value && parseInt(value) > 0
  };

  const errorMessage = {
    PatientFirstname: "First name is required",
    PatientLastname: "Last name is required",
    PatientAge: "Age must be greater than 0"
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

  const handleAdd = () => {
    setIsAdding(true);
    setNewPatient(initialPatient);
    setSubmitMessage(null);
    setErrors({});
  };

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddSubmit = async () => {
    if (!isValidRecord(newPatient)) return;
    const response = await API.post(`${apiURL}/patients`, newPatient);
    if (response.isSuccess) {
      setSubmitMessage("Patient registered successfully!");
      setNewPatient(initialPatient);
      setIsAdding(false);
      setErrors({});
      fetchPatients();
    } else {
      setSubmitMessage(`Failed to add: ${response.message}`);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setSubmitMessage(null);
    setErrors({});
  };

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!patients || patients.length === 0) return <p>No patients found.</p>;

  return (
    <div>
      <h2>Patients</h2>

      {submitMessage && <p>{submitMessage}</p>}

      <button onClick={handleAdd}>Register new patient</button>

      {isAdding && (
        <div className="FormTray">
          <label>
            First Name
            <input type="text" name="PatientFirstname" value={newPatient.PatientFirstname} onChange={handleAddChange} />
            {errors.PatientFirstname && <p className="form-error">{errors.PatientFirstname}</p>}
          </label>
          <label>
            Last Name
            <input type="text" name="PatientLastname" value={newPatient.PatientLastname} onChange={handleAddChange} />
            {errors.PatientLastname && <p className="form-error">{errors.PatientLastname}</p>}
          </label>
          <label>
            Address
            <input type="text" name="PatientAddress" value={newPatient.PatientAddress} onChange={handleAddChange} />
          </label>
          <label>
            Postcode
            <input type="text" name="PatientPostcode" value={newPatient.PatientPostcode} onChange={handleAddChange} />
          </label>
          <label>
            Age
            <input type="number" name="PatientAge" value={newPatient.PatientAge} onChange={handleAddChange} />
            {errors.PatientAge && <p className="form-error">{errors.PatientAge}</p>}
          </label>
          <div className="action-tray">
            <button onClick={handleAddSubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      <CardContainer>
        {patients.map((patient) => (
          <Card key={patient.PatientID}>
            <h3>{patient.PatientFirstname} {patient.PatientLastname}</h3>
            <p>{patient.PatientAddress}</p>
            <p>{patient.PatientPostcode}</p>
            <p>Age: {patient.PatientAge}</p>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}

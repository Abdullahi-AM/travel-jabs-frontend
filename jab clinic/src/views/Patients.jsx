import { useState, useEffect } from "react";
import API from "../components/api/API.js";
import apiURL from "../components/api/apiURL.js";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Patients() {
  const [patients, setPatients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!patients || patients.length === 0) return <p>No patients found.</p>;

  return (
    <div>
      <h2>Patients</h2>

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

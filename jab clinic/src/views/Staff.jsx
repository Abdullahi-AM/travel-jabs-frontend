import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../components/api/API.js";
import apiURL from "../components/api/apiURL.js";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Staff() {
  const { clinicId } = useParams();

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);

  const fetchStaff = async () => {
    try {
      const response = await API.get(`${apiURL}/staff/clinics/${clinicId}`);
      if (response.isSuccess) setStaff(response.result);
      else setStaff([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [clinicId]);

  const handleDelete = async (id) => {
    const response = await API.delete(`${apiURL}/staff/${id}`);
    if (response.isSuccess) {
      setSubmitMessage("Staff member deleted successfully!");
      fetchStaff();
    } else {
      setSubmitMessage(`Failed to delete: ${response.message}`);
    }
  };

  if (loading) return <p>Loading staff...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!staff || staff.length === 0) return <p>No staff found.</p>;

  return (
    <div>
      <h2>Staff</h2>

      {submitMessage && <p>{submitMessage}</p>}

      <CardContainer>
        {staff.map((member) => (
          <Card key={member.StaffID}>
            <h3>{member.StaffFirstname} {member.StaffLastname}</h3>
            <p>Role: {member.StaffRoleID === 1 ? "Manager" : "Clinician"}</p>
            <button onClick={() => handleDelete(member.StaffID)}>Delete</button>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}

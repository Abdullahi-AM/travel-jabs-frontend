import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../components/api/API.js";
import apiURL from "../components/api/apiURL.js";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Staff() {
  const { clinicId } = useParams();

  const initialStaff = {
    StaffFirstname: "",
    StaffLastname: "",
    StaffRoleID: 2,
    StaffClinicID: parseInt(clinicId),
  };

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaff, setNewStaff] = useState(initialStaff);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState({});
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

  const isValid = {
    StaffFirstname: (value) => value && value.length > 0,
    StaffLastname: (value) => value && value.length > 0,
  };

  const errorMessage = {
    StaffFirstname: "First name is required",
    StaffLastname: "Last name is required",
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

  // Add handlers
  const handleAdd = () => {
    setIsAdding(true);
    setSelectedStaff(null);
    setNewStaff(initialStaff);
    setSubmitMessage(null);
    setErrors({});
  };

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setNewStaff({
      ...newStaff,
      [name]:
        name === "StaffRoleID" || name === "StaffClinicID"
          ? parseInt(value)
          : value,
    });
  };

  const handleAddSubmit = async () => {
    if (!isValidRecord(newStaff)) return;
    const response = await API.post(`${apiURL}/staff`, newStaff);
    if (response.isSuccess) {
      setSubmitMessage("Staff member added successfully!");
      setNewStaff(initialStaff);
      setIsAdding(false);
      setErrors({});
      fetchStaff();
    } else {
      setSubmitMessage(`Failed to add: ${response.message}`);
    }
  };

  // Modify handlers
  const handleModify = (member) => {
    setSelectedStaff({ ...member });
    setIsAdding(false);
    setSubmitMessage(null);
    setErrors({});
  };

  const handleModifyChange = (event) => {
    const { name, value } = event.target;
    setSelectedStaff({
      ...selectedStaff,
      [name]:
        name === "StaffRoleID" || name === "StaffClinicID"
          ? parseInt(value)
          : value,
    });
  };

  const handleModifySubmit = async () => {
    if (!isValidRecord(selectedStaff)) return;
    const response = await API.put(
      `${apiURL}/staff/${selectedStaff.StaffID}`,
      selectedStaff
    );
    if (response.isSuccess) {
      setSubmitMessage("Staff member updated successfully!");
      setSelectedStaff(null);
      setErrors({});
      fetchStaff();
    } else {
      setSubmitMessage(`Failed to update: ${response.message}`);
    }
  };

  const handleDelete = async (id) => {
    const response = await API.delete(`${apiURL}/staff/${id}`);
    if (response.isSuccess) {
      setSubmitMessage("Staff member deleted successfully!");
      fetchStaff();
    } else {
      setSubmitMessage(`Failed to delete: ${response.message}`);
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setSelectedStaff(null);
    setIsAdding(false);
    setSubmitMessage(null);
    setErrors({});
  };

  if (loading) return <p>Loading staff...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!staff || staff.length === 0) return <p>No staff found.</p>;

  return (
    <div>
      <h2>Staff</h2>

      {submitMessage && <p>{submitMessage}</p>}

      <button onClick={handleAdd}>Add new staff</button>

      {isAdding && (
        <div className="FormTray">
          <label>
            First Name
            <input
              type="text"
              name="StaffFirstname"
              value={newStaff.StaffFirstname}
              onChange={handleAddChange}
            />
            {errors.StaffFirstname && (
              <p className="form-error">{errors.StaffFirstname}</p>
            )}
          </label>

          <label>
            Last Name
            <input
              type="text"
              name="StaffLastname"
              value={newStaff.StaffLastname}
              onChange={handleAddChange}
            />
            {errors.StaffLastname && (
              <p className="form-error">{errors.StaffLastname}</p>
            )}
          </label>

          <label>
            Role
            <select
              name="StaffRoleID"
              value={newStaff.StaffRoleID}
              onChange={handleAddChange}
            >
              <option value="1">Manager</option>
              <option value="2">Clinician</option>
            </select>
          </label>

          <div className="action-tray">
            <button onClick={handleAddSubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {selectedStaff && (
        <div className="FormTray">
          <label>
            First Name
            <input
              type="text"
              name="StaffFirstname"
              value={selectedStaff.StaffFirstname}
              onChange={handleModifyChange}
            />
            {errors.StaffFirstname && (
              <p className="form-error">{errors.StaffFirstname}</p>
            )}
          </label>

          <label>
            Last Name
            <input
              type="text"
              name="StaffLastname"
              value={selectedStaff.StaffLastname}
              onChange={handleModifyChange}
            />
            {errors.StaffLastname && (
              <p className="form-error">{errors.StaffLastname}</p>
            )}
          </label>

          <label>
            Role
            <select
              name="StaffRoleID"
              value={selectedStaff.StaffRoleID}
              onChange={handleModifyChange}
            >
              <option value="1">Manager</option>
              <option value="2">Clinician</option>
            </select>
          </label>

          <div className="action-tray">
            <button onClick={handleModifySubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      <CardContainer>
        {staff.map((member) => (
          <Card key={member.StaffID}>
            <h3>
              {member.StaffFirstname} {member.StaffLastname}
            </h3>
            <p>Role: {member.StaffRoleID === 1 ? "Manager" : "Clinician"}</p>
            <button onClick={() => handleModify(member)}>Modify</button>
            <button onClick={() => handleDelete(member.StaffID)}>Delete</button>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}

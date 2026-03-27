import { useState, useEffect } from "react";
import API from "../components/api/API.js";
import apiURL from "../components/api/apiURL.js";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Vaccines() {
  const initialVaccine = {
    VaccineName: "",
    VaccineCost: ""
  };

  const [vaccines, setVaccines] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [newVaccine, setNewVaccine] = useState(initialVaccine);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState(null);

  const fetchVaccines = async () => {
    try {
      const response = await API.get(`${apiURL}/vaccines`);
      if (response.isSuccess) setVaccines(response.result);
      else throw new Error(response.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const isValid = {
    VaccineName: (value) => value && value.length > 0,
    VaccineCost: (value) => value && parseFloat(value) > 0
  };

  const errorMessage = {
    VaccineName: "Vaccine name is required",
    VaccineCost: "Cost must be greater than 0"
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
    setSelectedVaccine(null);
    setNewVaccine(initialVaccine);
    setSubmitMessage(null);
    setErrors({});
  };

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setNewVaccine({ ...newVaccine, [name]: value });
  };

  const handleAddSubmit = async () => {
    if (!isValidRecord(newVaccine)) return;
    const response = await API.post(`${apiURL}/vaccines`, newVaccine);
    if (response.isSuccess) {
      setSubmitMessage("Vaccine added successfully!");
      setNewVaccine(initialVaccine);
      setIsAdding(false);
      setErrors({});
      fetchVaccines();
    } else {
      setSubmitMessage(`Failed to add: ${response.message}`);
    }
  };

  // Modify handlers
  const handleModify = (vaccine) => {
    setSelectedVaccine({ ...vaccine });
    setIsAdding(false);
    setSubmitMessage(null);
    setErrors({});
  };

  const handleModifyChange = (event) => {
    const { name, value } = event.target;
    setSelectedVaccine({ ...selectedVaccine, [name]: value });
  };

  const handleModifySubmit = async () => {
    if (!isValidRecord(selectedVaccine)) return;
    const response = await API.put(`${apiURL}/vaccines/${selectedVaccine.VaccineID}`, selectedVaccine);
    if (response.isSuccess) {
      setSubmitMessage("Vaccine updated successfully!");
      setSelectedVaccine(null);
      setErrors({});
      fetchVaccines();
    } else {
      setSubmitMessage(`Failed to update: ${response.message}`);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    const response = await API.delete(`${apiURL}/vaccines/${id}`);
    if (response.isSuccess) {
      setSubmitMessage("Vaccine deleted successfully!");
      fetchVaccines();
    } else {
      setSubmitMessage(`Failed to delete: ${response.message}`);
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setSelectedVaccine(null);
    setIsAdding(false);
    setSubmitMessage(null);
    setErrors({});
  };

  if (loading) return <p>Loading vaccines...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!vaccines || vaccines.length === 0) return <p>No vaccines found.</p>;

  return (
    <div>
      <h2>Vaccines</h2>

      {submitMessage && <p>{submitMessage}</p>}

      <button onClick={handleAdd}>Add new vaccine</button>

      {isAdding && (
        <div className="FormTray">
          <label>
            Vaccine Name
            <input
              type="text"
              name="VaccineName"
              value={newVaccine.VaccineName}
              onChange={handleAddChange}
            />
            {errors.VaccineName && <p className="form-error">{errors.VaccineName}</p>}
          </label>

          <label>
            Cost
            <input
              type="number"
              name="VaccineCost"
              value={newVaccine.VaccineCost}
              onChange={handleAddChange}
              step="0.01"
            />
            {errors.VaccineCost && <p className="form-error">{errors.VaccineCost}</p>}
          </label>

          <div className="action-tray">
            <button onClick={handleAddSubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {selectedVaccine && (
        <div className="FormTray">
          <label>
            Vaccine Name
            <input
              type="text"
              name="VaccineName"
              value={selectedVaccine.VaccineName}
              onChange={handleModifyChange}
            />
            {errors.VaccineName && <p className="form-error">{errors.VaccineName}</p>}
          </label>

          <label>
            Cost
            <input
              type="number"
              name="VaccineCost"
              value={selectedVaccine.VaccineCost}
              onChange={handleModifyChange}
              step="0.01"
            />
            {errors.VaccineCost && <p className="form-error">{errors.VaccineCost}</p>}
          </label>

          <div className="action-tray">
            <button onClick={handleModifySubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      <CardContainer>
        {vaccines.map((vaccine) => (
          <Card key={vaccine.VaccineID}>
            <h3>{vaccine.VaccineName}</h3>
            <p>Cost: £{vaccine.VaccineCost}</p>
            <button onClick={() => handleModify(vaccine)}>Modify</button>
            <button onClick={() => handleDelete(vaccine.VaccineID)}>Delete</button>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}

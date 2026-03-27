import { useState, useEffect } from "react";
import API from "../components/api/API.js";
import apiURL from "../components/api/apiURL.js";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";

export default function Vaccines() {
  const [vaccines, setVaccines] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading vaccines...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!vaccines || vaccines.length === 0) return <p>No vaccines found.</p>;

  return (
    <div>
      <h2>Vaccines</h2>

      <CardContainer>
        {vaccines.map((vaccine) => (
          <Card key={vaccine.VaccineID}>
            <h3>{vaccine.VaccineName}</h3>
            <p>Cost: £{vaccine.VaccineCost}</p>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}

import { useEffect, useState } from "react";
import Card from "../../ui/Card.jsx";
import CardContainer from "../../ui/CardContainer.jsx";

export default function Clinics() {
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchClinics() {
            try {
                const response = await fetch("https://softwarehub.uk/unibase/traveljabs/v1/api/clinics");
                if (!response.ok) throw new Error("Failed to fetch clinics");

                const data = await response.json();
                setClinics(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchClinics();
    }, []);

    if (loading) return <p>Loading clinics...</p>;
    if (error) return <p>Error: {error}</p>;
    if (clinics.length === 0) return <p>No clinics found.</p>;

    return (
        <CardContainer>
            {clinics.map((clinic) => (
                <Card key={clinic.ClinicID}>
                    <h3>{clinic.ClinicName}</h3>
                    <p>{clinic.ClinicAddress}</p>
                    <p>{clinic.ClinicPostcode}</p>
                    <p>Contact: {clinic.ClinicContact}</p>
                    <p>
                        Manager: {clinic.ClinicManagerID} {" "} {clinic.ClinicManagerFirstname} {" "}
                        {clinic.ClinicManagerLastname}
                    </p>
                </Card>
            ))}
        </CardContainer>
    );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";
import Action from "../components/ui/Actions.jsx";

// Model adapted for clinics entity
const model = {};

model.table = 'Clinics';
model.fields = ['ClinicID', 'ClinicName', 'ClinicAddress', 'ClinicPostcode', 'ClinicContact', 'ClinicManagerID'];

model.buildCreateQuery = (req) => {
    return `INSERT INTO ${model.table} SET
        ClinicName=:ClinicName,
        ClinicAddress=:ClinicAddress,
        ClinicPostcode=:ClinicPostcode,
        ClinicContact=:ClinicContact,
        ClinicManagerID=:ClinicManagerID
    `;    
};

model.buildReadQuery = (req, variant) => {
    // Initialisation
    let table = model.table;
    let fields = model.fields;
    
    // Resolve foreign keys
    table = `(${table} LEFT JOIN ManagerID ON ClinicManagerID)`;
    fields = [...fields, 'CONCAT(ClinicManagerFirstname, " ", ClinicManagerLastname) AS ClinicManagerName'];

    // Build and return query
    let where = '';
    
    switch(variant) {
        case 'primary':
            const id = req.params.id;
            where = `WHERE ClinicID=:ID`
            break;
        
    }

    return `SELECT ${fields} FROM ${table} ${where}`;
};


class Controller {
    constructor(model) {
        this.buildReadQuery = model.buildReadQuery;
        this.buildCreateQuery = model.buildCreateQuery;
    }

    // Adapted get method for frontend fetch
    get = async (variant, id) => {
        const url = `https://softwarehub.uk/unibase/traveljabs/v1/api/clinics`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch clinics");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to execute fetch: ${error.message}`);
        }
    };

    // Post method 
    post = async (req) => {
        const url = 'https://softwarehub.uk/unibase/traveljabs/v1/api/clinics';
        const parameters = req.body;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parameters)
            });
            if (!response.ok) throw new Error("Failed to create clinic");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to execute post: ${error.message}`);
        }
    };
}

const Clinics = () => {
    const navigate = useNavigate();
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        const controller = new Controller(model);
        const loadClinics = async () => {
            try {
                const data = await controller.get();
                setClinics(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        loadClinics();
    }, []);



    return (
        <CardContainer>
            {clinics.map((clinic) => (
                <Card key={clinic.ClinicID}>
                    <h3>{clinic.ClinicName}</h3>
                    <p>{clinic.ClinicAddress}</p>
                    <p>{clinic.ClinicPostcode}</p>
                    <p>Contact: {clinic.ClinicContact}</p>
                    <p>Manager: {clinic.ClinicManagerName}</p>
                 
                        
                         <Action.Tray buttonText={buttonText} onClick={() => navigate(`/book/${clinic.ClinicID}`)} >
                            </Action.Tray>
  
  
                    
                </Card>
            ))}
        </CardContainer>
    );

}
export default buildReadQuery;

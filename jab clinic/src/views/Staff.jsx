import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";
import Action from "../components/ui/Actions.jsx";
import buildReadQuery from "./Clinics.jsx";

// Model adapted for clinics entity
const model = {};

model.table = 'Staff';
model.fields = ['StaffID', 'StaffFirstname', 'StaffLastname', 'StaffRoleID', 'StaffClinicID', 'StaffRoleName', 'StaffClinicName'];

model.buildCreateQuery = (req) => {
    return `INSERT INTO ${model.table} SET
        StaffFirstname=:StaffFirstname,
        StaffLastname=:StaffLastname,
        StaffRoleID=:StaffRoleID,
        StaffClinicID=:StaffClinicID,
        StaffRoleName=:StaffRoleName,
        StaffClinicName=:StaffClinicName
    `;    
};

model.buildReadQuery = (req, variant) => {
    // Initialisation
    let table = model.table;
    let fields = model.fields;
    
    // Resolve foreign keys
    table = `(${table} LEFT JOIN Roles ON StaffRoleID=RoleID LEFT JOIN Clinics ON StaffClinicID=ClinicID )`
    fields = [...fields, 'RoleName AS StaffRoleName', 'ClinicName AS StaffClinicName'];

    // Build and return query
    let where = '';
    
    switch(variant) {
        case 'primary':
            const id = req.params.id;
            where = `WHERE StaffID=:ID`
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
        const url = `https://softwarehub.uk/unibase/traveljabs/v1/api/clinics${variant === 'primary' ? '/' + id : ''}`;
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
        const url = 'https://softwarehub.uk/unibase/traveljabs/v1/api/staff/clinics';
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

     <Action.Tray>
                     <Action.Modify showText onClick={() => onSelect(module)} />
                     <Action.Delete showText  />
                
                 </Action.Tray>
    
}

const Staff = () => {
    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);         

    useEffect(() => {
        const controller = new Controller(model);




        const loadStaff = async () => {
            try {


                const data = await controller.get();
                setStaff(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        loadStaff();
    }, []);

           


}

   
     


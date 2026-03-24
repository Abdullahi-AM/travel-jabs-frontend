import { useState, useEffect } from 'react';
import useLoad from './components/API/useLoad.js';
import apiURL from './components/API/apiURL.js';
import Form from '../../ui/Form.jsx';



const defaultStaff = {
    StaffID: null,
    StaffFirstname: '',
    StaffLastname: '',
    StaffID: null,
    StaffClinicID: null,
    StaffRoleID: null,
    StaffRoleName: '',
    StaffClinicName: ''
 

    
};

const StaffForm = ({ initialStaff, onSubmit,onCancel}) => {
    //Initialisation
    const conformance = {

    js2html : {
        StaffFirstname: (value) => (value === null ? '' : value),
        StaffLastname: (value) => (value === null ? '' : value),
        StaffID: (value) => (value === null ? '' : value),
        StaffClinicID: (value) => (value === null ? '' : value),
        StaffRoleID: (value) => (value === null ? '' : value),
        StaffRoleName: (value) => (value === null ? '' : value),
        StaffClinicName: (value) => (value === null ? '' : value),

    },
    html2js : {
        StaffFirstname: (value) => (value === '' ? null : value),
        StaffLastname: (value) => (value === '' ? null : value),
        StaffID: (value) => (value === '' ? null : value),
        StaffClinicID: (value) => (value === '' ? null : value),
        StaffRoleID: (value) => (value === '' ? null : value),
        StaffRoleName: (value) => (value === '' ? null : value),
        StaffClinicName: (value) => (value === '' ? null : value),
    },
    };

    const validation = {
    isValid:  {
        StaffFirstname: (name) => name && name.length > 0,
        StaffID: (id) => id === null || id > 0,
        StaffLastname: (lastname) => lastname && lastname.length > 0,
        StaffClinicID: (id) => id === null || id > 0,
        StaffRoleID: (id) => id === null || id > 0,
        StaffRoleName: (name) => name && name.length > 0,
        StaffClinicName: (name) => name && name.length > 0,
    },

    errorMessage : {
        StaffFirstname: 'Staff first name is too short',
        StaffID: 'Staff ID is not in a valid format',
        StaffLastname: 'Staff last name is too short',
        StaffClinicID: 'Staff clinic ID is not in a valid format',
        StaffRoleID: 'Staff role ID is not in a valid format',
        StaffRoleName: 'Staff role name is too short',
        StaffClinicName: 'Staff clinic name is too short',
        
    },
};

    const staffEndpoint = `${apiURL}/api/staff`;
    
    
    //State
    const [staff, errors, handleChange, handleSubmit] = Form.useForm(initialStaff ? initialStaff : defaultStaff, conformance, validation, onSubmit);
    const [loadingStaffMessage, loadStaff] = useLoad(myStaffEndpoint);
   

    
    //Handlers 
    //View
    const clinicAddressOptions = {
    unselected: { value: '0', label: 'No address selected' },
    list: []
    };

    const clinicPostcodeOptions = {
    unselected: { value: '0', label: 'No postcode selected' },
    list: []
};

const clinicContactOptions = {
    unselected: { value: '0', label: 'No contact selected' },
    list: []
};





    const nameOptions = {
        noOptionsMessage: loadingStaffMessage,
        unselected: { value: '0', label: 'No name selected' },
        list:
            staff &&
            staff.map((user) => ({
                value: user.UserID,
                label: `${user.UserFirstname} ${user.UserLastname}`,
            })),
    };


    
    return (
        <Form onSubmit={handleSubmit} onCancel={onCancel}>

            <Form.TextInput label='Staff First Name' name='StaffFirstname' value={conformance.js2html.StaffFirstname(staff.StaffFirstname)} onChange={handleChange} error={errors.StaffFirstname} />

            <Form.TextInput label='Staff ID' name='StaffID' value={conformance.js2html.StaffID(staff.StaffID)} onChange={handleChange} error={errors.StaffID}  />

            <Form.TextInput label='Staff Last Name' name='StaffLastname' value={conformance.js2html.StaffLastname(staff.StaffLastname)} onChange={handleChange} error={errors.StaffLastname}  />

            <Form.TextInput label='Staff Clinic ID' name='StaffClinicID' value={conformance.js2html.StaffClinicID(staff.StaffClinicID)} onChange={handleChange} error={errors.StaffClinicID}  />

            <Form.TextInput label='Staff Role ID' name='StaffRoleID' value={conformance.js2html.StaffRoleID(staff.StaffRoleID)} onChange={handleChange} error={errors.StaffRoleID}  />

            <Form.TextInput label='Staff Role Name' name='StaffRoleName' value={conformance.js2html.StaffRoleName(staff.StaffRoleName)} onChange={handleChange} error={errors.StaffRoleName}  />

            <Form.TextInput label='Staff Clinic Name' name='StaffClinicName' value={conformance.js2html.StaffClinicName(staff.StaffClinicName)} onChange={handleChange} error={errors.StaffClinicName}  />

           <label>
            Staff Name
                    { !staff ? (
                        <p>{loadingStaffMessage}</p>
                    ) : (
                    <select name="StaffID" value={conformance.js2html.StaffID(staff.StaffID)} onChange={handleChange}>
                        <option value='0' hidden>No staff selected</option>
                            {staff.map( (staff) => (
                                <option key={staff.StaffID} value={staff.StaffID}>{staff.StaffFirstname} {staff.StaffLastname}</option> 
                        ))}
                    </select>
                    )}

           </label>

                
                    
        </Form>

                

                


           
        
    );
};
   
export default StaffForm;

import { useState, useEffect } from 'react';
import useLoad from '../api/useLoad.js';
import apiURL from '../api/apiURL.js';
import Form from '../ui/Form.jsx';

import './ClinicForm.scss';

const defaultClinic = {
    ClinicID: null,
     ClinicName: '',
    ClinicAddress: '',
    ClinicPostcode: '',
    ClinicContact: '',
    ClinicManagerID: null,
    ClinicManagerFirstname: '',
    ClinicManagerLastname: ''

    
};

const ClinicForm = ({ initialClinic, onSubmit,onCancel}) => {
    //Initialisation
    const conformance = {

    js2html : {
        ClinicName: (value) => (value === null ? '' : value),
        ClinicID: (value) => (value === null ? '' : value),
        ClinicAddress: (value) => (value === null ? '' : value),
        ClinicPostcode: (value) => (value === null ? '' : value),
        ClinicContact: (value) => (value === null ? '' : value),
        ClinicManagerID: (value) => (value === null ? '' : value),
        ClinicManagerFirstname: (value) => (value === null ? '' : value),
        ClinicManagerLastname: (value) => (value === null ? '' : value),

    },
    html2js : {
        ClinicName: (value) => (value === '' ? null : value),
        ClinicID: (value) => (value === '' ? null : value),
        ClinicAddress: (value) => (value === '' ? null : value),
        ClinicPostcode: (value) => (value === '' ? null : value),
        ClinicContact: (value) => (value === '' ? null : value),
        ClinicManagerID: (value) => (value === '' ? null : value),
        ClinicManagerFirstname: (value) => (value === '' ? null : value),
        ClinicManagerLastname: (value) => (value === '' ? null : value),
    },
    };

    const validation = {
    isValid:  {
        ClinicName: (name) => name && name.length > 0,
        ClinicID: (id) => id === null || id > 0,
        ClinicAddress: (address) => address && address.length > 0,
        ClinicPostcode: (postcode) => postcode && postcode.length > 0,
        ClinicContact: (contact) => contact && contact.length > 0,
        ClinicManagerID: (id) => id === null || id > 0,
        ClinicManagerFirstname: (firstname) => firstname && firstname.length > 0,
        ClinicManagerLastname: (lastname) => lastname && lastname.length > 0,
    },

    errorMessage : {
        ClinicName: 'Clinic name is too short',
        ClinicID: 'Clinic ID is not in a valid format',
        ClinicAddress: 'Clinic address is too short',
        ClinicPostcode: 'Clinic postcode is too short',
        ClinicContact: 'Clinic contact is too short',
        ClinicManagerID: 'Clinic manager ID is not in a valid format',
        ClinicManagerFirstname: 'Clinic manager first name is too short',
        ClinicManagerLastname: 'Clinic manager last name is too short',
    },
};

    const yearsEndpoint = `${apiURL}/api/clinics`;
    const staffEndpoint = `${apiURL}/api/staff`;
    
    
    //State
    const [clinic, errors, handleChange, handleSubmit] = Form.useForm(initialClinic ? initialClinic : defaultClinic, conformance, validation, onSubmit);
    

    
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





    const managerOptions = {
        noOptionsMessage: loadingStaffMessage,
        unselected: { value: '0', label: 'No manager selected' },
        list:
            staff &&
            staff.map((user) => ({
                value: user.UserID,
                label: `${user.UserFirstname} ${user.UserLastname}`,
            })),
    };


    
    return (
        <Form onSubmit={handleSubmit} onCancel={onCancel}>

            <Form.TextInput label='Clinic Name' name='ClinicName' value={conformance.js2html.ClinicName(clinic.ClinicName)} onChange={handleChange} error={errors.ClinicName} />

            <Form.TextInput label='Clinic ID' name='ClinicID' value={conformance.js2html.ClinicID(clinic.ClinicID)} onChange={handleChange} error={errors.ClinicID}  />

            <Form.TextInput label='Clinic Address' name='ClinicAddress' value={conformance.js2html.ClinicAddress(clinic.ClinicAddress)} onChange={handleChange} error={errors.ClinicAddress}  />

            <Form.TextInput label='Clinic Postcode' name='ClinicPostcode' value={conformance.js2html.ClinicPostcode(clinic.ClinicPostcode)} onChange={handleChange} error={errors.ClinicPostcode}  />

            <Form.TextInput label='Clinic Contact' name='ClinicContact' value={conformance.js2html.ClinicContact(clinic.ClinicContact)} onChange={handleChange} error={errors.ClinicContact}  />

            <Form.Select label='Clinic Manager ID' name='ClinicManagerID' value={conformance.js2html.ClinicManagerID(clinic.ClinicManagerID)} onChange={handleChange} error={errors.ClinicManagerID} options={managerOptions} />


           

                
                <label>
                    Staff Name
                    { !clinic ? (
                        <p>{loadingStaffMessage}</p>
                    ) : (
                    <select name="ClinicID" value={conformance.js2html.ClinicID(clinic.ClinicID)} onChange={handleChange}>
                        <option value='0' hidden>No staff selected</option>
                            {clinic.map( (clinic) => (
                                <option key={clinic.ClinicID} value={clinic.ClinicID}>{clinic.ClinicName}</option> 
                        ))}
                    </select>
                    )}
                    
                </label>

                

                


           
        </Form>
    );
};
   
export default ClinicForm;

import { useState } from 'react';
import { Confirm, useAlert } from './Alert.jsx';
import Spacer from './Spacer.jsx';
import Action from './Actions.jsx';
import './Form.scss';

const Form = ({onSubmit, onCancel, children}) => {
//Initialisation
//State
 const [isConfirmOpen, confirmMessage, openConfirm, closeConfirm] = useAlert();
//Handlers
const handleConfirm = () => openConfirm('Are you sure you want to submit?');
//View
    return (
        <div className='Form'>
            {isConfirmOpen && <Confirm message={confirmMessage} onDismiss={closeConfirm} onConfirm={onSubmit} />}
            <Spacer>
            <div className='FormTray'>
                <Spacer>{children}</Spacer>
            </div>
            <Action.Tray>
                <Action.Submit showText onClick={handleConfirm} />
                <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
            </Action.Tray>
            </Spacer>
        </div>
    );
};

const FormField = ({ label, error, children }) => {
    return (
        <label>
            <p className='FormLabel'>{label}</p>
            {children}
            <p className="FormError">{error}</p>
        </label>

);
};
const TextInput = ({ label, name, value, onChange, error }) => {
    return (
        <FormField label={label} error={error}>
            <input type="text" name={name} value={value} onChange={onChange} />
            <p className="FormError">{error}</p>
        </FormField>

);
};

const TextSelect = ({ label, name, value, options, onChange, error }) => {
    return (
        <FormField label={label} error={error}>
                    { !options.list ? (
                        <p>{options.noOptionsMessage}</p>
                    ) : (
                    <select name={name} value={value} onChange={onChange}>
                        <option value={options.unselected.value} hidden>{options.unselected.label}</option>
                            {options.list.map( (option) => (
                                <option key={option.value} value={option.value}>{option.label}</option> ))
                    }
                        
                    </select>)}
                </FormField>


);
};

const useForm = (initialRecord,conformance, onSubmit) => {
    //Initialisation
    //State
    const [record, setRecord] = useState(initialRecord);
    const [errors, setErrors] = useState(
        Object.keys(initialRecord).reduce( (accum, key) => ({...accum, [key]: null}), {})
    );

    const isValidRecord = (record) => {
        let isRecordValid = true;

        Object.keys(validation.isValid).forEach((key) => {
            const value = record[key];
            if( validation.isValid[key](value) ) 
                errors[key] = null;
            else {
                errors[key] = validation.errorMessages[key];
                isRecordValid = false;
        }

            }
        );
        key = 'ModuleName';
        value = record[key];
        if( validation.isValid[key](value) ) 
            errors[key] = null;
        else {
            errors[key] = validation.errorMessages[key];
            isRecordValid = false;
        }

        key = 'ModuleCode';
        value = record[key];
        if (validation.isValid[key](value))
            errors[key] = null;
        else {
            errors[key] = validation.errorMessages[key];
            isRecordValid = false;
        }

        return isRecordValid;
    };


    //Handlers
    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecord({...record, [name]: conformance.html2js[name](value) });
    };

    const handleSubmit = () => {
        isValidRecord(record) && onSubmit(record);
        setErrors({...errors});
    }
    //Return
    return [record, errors, handleChange, handleSubmit];
    
};

//Compound component
Form.useForm = useForm;
Form.TextInput = TextInput;
Form.TextSelect = TextSelect;

export default Form;
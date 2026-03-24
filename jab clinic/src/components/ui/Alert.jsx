import { useState } from 'react';
import { Model, useModel } from './Model.jsx';
import Spacer from './Spacer.jsx';
import Action from './Actions.jsx';
import './Alert.scss';

export const Alert = ({ message, onDismiss }) => {   
    return (
        <Model title='Alert' headerColor='DodgerBlue'>
            <Spacer>
            <p className='alertMessage'>{message}</p>    
            <Action.Tray>
                <Action.Dismiss showText onClick={onDismiss} />
            
            </Action.Tray>
            </Spacer>      
        </Model>
    );
};

export const Confirm = ({ message, onConfirm, onDismiss }) => {   
    //Initialisation
    //State
    //Handlers
    const handleConfirm = () => {
        onConfirm();
        onDismiss();
    };
    //Views
    return (
        <Model title='Confirmation needed' headerColor='Orange'>
            <Spacer>
            <p className='alertMessage'>{message}</p>    
            <Action.Tray>
                <Action.Yes showText onClick={onConfirm} />
                <Action.Dismiss showText onClick={onDismiss} />
            
            </Action.Tray>
            </Spacer>      
        </Model>
    );
};

export const Error = ({ message, onDismiss }) => {   
    return (
        <Model title='Error' headerColor='Red'>
            <Spacer>
            <p className='alertMessage'>{message}</p>    
            <Action.Tray>
                <Action.Dismiss showText onClick={onDismiss} />
            
            </Action.Tray>
            </Spacer>      
        </Model>
    );
};

export const useAlert = () => {
    //State
    const [isOpen, openModel, close] = useModel(false);
    const [message, setMessage] = useState(null);
    //Handlers
     const open = (message) => {
        setMessage(message);
        openModel();
   
    };

    
    //Return
    return [isOpen, message, open, close];

};


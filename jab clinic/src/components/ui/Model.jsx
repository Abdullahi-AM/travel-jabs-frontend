import { useState } from 'react';
import './Model.scss';

export const Model = ({ title,headerColor, children}) => {
    return (
        <div className="ModelOverlay">
            <div className="ModelPane"></div>
            <header style ={{backgroundColor: headerColor}}>
                <p>{title}</p>
            </header>
            <main>{children}</main>
        </div>
    );
};

export const useModel = (initialState) => {
    //State
    const [isFormOpen, setIsOpen] = useState(initialState);
    //Handlers
     const openForm = () => {
      setIsOpen(true);
    };

    const closeForm = () => {
      setIsOpen(false);
    };
    //Return
    return [isFormOpen, openForm, closeForm];

};




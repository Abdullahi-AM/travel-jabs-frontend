import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";
import Action from "../components/ui/Actions.jsx";
import { Model, useModel } from '../components/ui/Model.jsx';
import useLoad from '../components/api/useLoad.js';
import apiURL from '../components/api/apiURL.js';
import Spacer from '../components/ui/Spacer.jsx';
import API from '../components/api/API.js';
import ClinicCard from '../components/Entity/ClinicCard.jsx';
import ClinicForm from '../components/Entity/ClinicForm.jsx';
import { Alert, Error, useAlert } from '../components/ui/Alert.jsx';
import { useAuth } from '../components/auth/authContext.jsx';


const Clinics = () => {
    // Initialisation
    const { loggedInUser } = useAuth();
    let myClinicsEndpoint = `${apiURL}/clinics`;
    if (loggedInUser && loggedInUser.UserID) {
      myClinicsEndpoint = `${apiURL}/clinics/${loggedInUser.UserID}`;
    }
    const postClinicEndpoint = `${apiURL}/clinics`;

    // State 
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [isFormOpen, openForm, closeForm] = useModel(false);
    const [isAlertOpen, alertMessage, openAlert, closeAlert] = useAlert();
    const [isErrorOpen, errorMessage, openError, closeError] = useAlert();
    
    const [clinics, loadingMessage, loadClinics] = useLoad(myClinicsEndpoint);

    //Handlers
    const handleSelect = (clinic) => {
      setSelectedClinic(clinic);
      openForm();

    };

    const handleCancel = () => {
      setSelectedClinic(null);
      closeForm();

    }
    const handleAdd = async (clinic) => {
      const result = await API.post(postClinicEndpoint,clinic);
      checkSuccess(result);
      
    };

    const handleModify = async (clinic) => {
      const putClinicEndpoint = `${postClinicEndpoint}/${clinic.ClinicID}`;
      const result = await API.post(putClinicEndpoint,clinic);
      checkSuccess(result);
    };

    const checkSuccess = (result) => {
       if (result.isSuccess) {
        handleCancel();
        loadClinics(myClinicsEndpoint);
        openAlert('Submission successful');
      }
      else openError(`Submission unsuccessful: ${result.message}`);
    };

    //View
      return (
      <>
          <h1>Clinics</h1>

          { isFormOpen && (
          <Model title={selectedClinic ? 'Modify clinic' : 'Add new clinic'} >
            <ClinicForm 
              initialClinic={selectedClinic}
              onCancel={closeForm} 
              onSubmit={selectedClinic ? handleModify : handleAdd} 
            />
          </Model>
      )}

          {isAlertOpen && <Alert message={alertMessage} onDismiss={closeAlert} />}
          {isErrorOpen && <Error message={errorMessage} onDismiss={closeError} />}
          <Spacer>
          
          
        
      
          {!clinics? (
                      <p>{loadingMessage}</p>
                    ) : (
                    <CardContainer>
                    {
                      clinics.map((clinic)=>{
                        return(
                          <ClinicCard key={clinic.ClinicID} clinic={clinic} onSelect={handleSelect}/>
                            
                        )
                      })
                    }
                    </CardContainer>
                    )}
          </Spacer>
      </>
      );
    };

export default Clinics;
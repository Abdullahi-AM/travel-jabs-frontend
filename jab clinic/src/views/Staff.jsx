import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import CardContainer from "../components/ui/CardContainer.jsx";
import Action from "../components/ui/Actions.jsx";
import { Model, useModel } from '../components/ui/Model.jsx';
import useLoad from '../API/useLoad.js';
import apiURL from '../API/apiURL.js';
import Spacer from '../../UI/Spacer.jsx';
import API from '../API/API.js';
import StaffCard from '../components/Entity/StaffCard.jsx';
import StaffForm from './StaffForm.jsx';
import { Alert, Error, useAlert } from '../components/ui/Alert.jsx';


const Staff = () => {
    // Initialisation
    const { loggedInUser } = useAuth();
    const myStaffEndpoint = 
    loggedInUser.UsertypeID === 1
      ? `${apiURL}/api/staff/clinics/${loggedInUser.UserID}`
      : `${apiURL}/api/staffclinics/${loggedInUser.UserID}`;
    const postStaffEndpoint = `${apiURL}/api/staff/clinics`;

    // State 
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [isFormOpen, openForm, closeForm] = useModel(false);
    const [isAlertOpen, alertMessage, openAlert, closeAlert] = useAlert();
    const [isErrorOpen, errorMessage, openError, closeError] = useAlert();
    
    const [staff, loadingMessage, loadStaff] = useLoad(myStaffEndpoint);
    };

    //Handlers
    const handleSelect = (staffMember) => {
      setSelectedStaff(staffMember);
      openForm();

    };

    const handleCancel = () => {
      setSelectedStaff(null);
      closeForm();

    }
    const handleAdd = async (staffMember) => {
      const result = await API.post(postStaffEndpoint,staffMember);
      checkSuccess(result);
      
    };

    const handleModify = async (staffMember) => {
      const putStaffEndpoint = `${postStaffEndpoint}/${staffMember.StaffID}`;
      const result = await API.post(putStaffEndpoint,staffMember);
      checkSuccess(result);
    };

    const checkSuccess = (result) => {
       if (result.isSuccess) {
        handleCancel();
        loadStaff(myStaffEndpoint);
        openAlert('Submission successful');
      }
      else openError(`Submission unsuccessful: ${result.message}`);
    };

    //View
      return (
      <>
          <h1>Staff</h1>

          { isFormOpen && (
          <Model title={selectedStaff ? 'Modify staff' : 'Add new staff'} >
            <StaffForm 
              initialStaff={selectedStaff}
              onCancel={closeForm} 
              onSubmit={selectedStaff ? handleModify : handleAdd} 
            />
          </Model>
      )}

          {isAlertOpen && <Alert message={alertMessage} onDismiss={closeAlert} />}
          {isErrorOpen && <Error message={errorMessage} onDismiss={closeError} />}
          <Spacer>
          
          <Action.Tray>
            <Action.Add showText buttonText="Add new staff" onClick={openForm} />

          </Action.Tray>
        
      
          {!staff? (
                      <p>Loading records ...</p>
                    ) : (
                    <CardContainer>
                    {
                      staff.map((staffMember)=>{
                        return(
                          <StaffCard key={staffMember.StaffID} staff={staffMember} onSelect={handleSelect}/>
                            
                        )
                      })
                    }
                    </CardContainer>
                    )}
          </Spacer>
      </>
      );
    

export default Staff;
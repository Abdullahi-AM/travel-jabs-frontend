import Card from '../ui/Card.jsx';
import Spacer from '../ui/Spacer.jsx';
import Action from '../ui/Actions.jsx';
import './StaffCard.scss';

const StaffCard = ({ staff, onSelect }) => {

    return (
        <div className="staffCard">
            <Card>
                <Spacer>
                <div>
                <p>{staff.StaffID}</p>
                <p>{staff.StaffClinicID}</p>
                <p>{staff.StaffFirstname}</p>
                <p>{staff.StaffLastname}</p>
                </div>
                <Action.Tray>
                     <Action.Modify showText onClick={() => onSelect(staff)} />
                     <Action.Delete showText  />
                
                 </Action.Tray>
                </Spacer>
            </Card>
        </div>
    );
};

export default StaffCard;
import { Card } from '../../UI/Card.jsx';
import Spacer from '../../UI/Spacer.jsx';
import Action from '../../UI/Actions.jsx';
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
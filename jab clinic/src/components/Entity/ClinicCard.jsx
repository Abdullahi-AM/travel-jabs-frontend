import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card.jsx';
import Spacer from '../ui/Spacer.jsx';
import Action from '../ui/Actions.jsx';
import './ClinicCard.scss';

const ClinicCard = ({ clinic, onSelect }) => {
    const navigate = useNavigate();

    const handleBookAppointment = () => {
      navigate(`/book/${clinic.ClinicID}`);
    };

    return (
        <div className="ClinicCard">
            <Card>
                <Spacer>
                <div>
                <p>{clinic.ClinicID}</p>
                <p>{clinic.ClinicName}</p>
                </div>
                <Action.Tray>
                     <Action.Modify showText onClick={() => onSelect(clinic)} />
                     <Action.Delete showText />
                     <Action.Book showText onClick={handleBookAppointment} />
                </Action.Tray>
                </Spacer>
            </Card>
        </div>
    );
};

export default ClinicCard;
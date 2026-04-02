import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/authContext.jsx";

const manager = {
  UserID: 1,
  UserFirstname: "Emma",
  UserRoleID: 1
};

const clinician = {
  UserID: 2,
  UserFirstname: "Farhan",
  UserRoleID: 2
};

const patient = {
  UserID: 69,
  UserFirstname: "Ben",
  UserRoleID: 3
};

const Login = () => {
  // Initialisation -------------------------------------------
  const { login } = useAuth();
  const navigate = useNavigate();

  // State ----------------------------------------------------
  // Handlers -------------------------------------------------
  const handleLogin = (user) => {
    login(user);
    navigate("/");
  };

  // View -----------------------------------------------------
  return (
    <>
      <h1>Login</h1>
      <div className="action-tray">
        <button onClick={() => handleLogin(manager)}>Log in as Manager</button>
        <button onClick={() => handleLogin(clinician)}>Log in as Clinician</button>
        <button onClick={() => handleLogin(patient)}>Log in as Patient</button>
      </div>
    </>
  );
};

export default Login;

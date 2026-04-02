import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/authContext.jsx";
import "./Layout.scss";

export default function Layout({ children }) {
  const { loggedInUser, logout } = useAuth();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-strip" />
        <div className="header-inner">
          <h1>Travel Jabs Clinic</h1>
          <p>Vaccinations and travel health advice</p>
          {loggedInUser && <p className="welcome">Welcome {loggedInUser.UserFirstname}</p>}
        </div>
      </header>

      <nav className="layout-nav">
        <NavLink to="/" end>Home</NavLink>
        {loggedInUser && (
          <>
            <NavLink to="/clinics">Clinics</NavLink>
            {(loggedInUser.UserRoleID === 1 || loggedInUser.UserRoleID === 2) && (
              <NavLink to="/vaccines">Vaccines</NavLink>
            )}
            <NavLink to="/about-me">About Me</NavLink>
          </>
        )}
        {!loggedInUser ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <NavLink to="/" onClick={logout}>Logout</NavLink>
        )}
      </nav>

      <main>{children}</main>

      <footer>
        <small>CI5320 • Travel Jabs</small>
      </footer>
    </div>
  );
}

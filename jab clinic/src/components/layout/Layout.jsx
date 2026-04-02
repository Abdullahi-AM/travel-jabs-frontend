import { NavLink } from "react-router-dom";
import "./Layout.scss";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-strip" />
        <div className="header-inner">
          <h1>Travel Jabs Clinic</h1>
          <p>Vaccinations and travel health advice</p>
        </div>
      </header>

      <nav className="layout-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/clinics">Clinics</NavLink>
        <NavLink to="/vaccines">Vaccines</NavLink>
        <NavLink to="/staff">Staff</NavLink>
        <NavLink to="/about-me">About Me</NavLink>
      </nav>

      <main>{children}</main>

      <footer>
        <small>CI5320 • Travel Jabs</small>
      </footer>
    </div>
  );
}

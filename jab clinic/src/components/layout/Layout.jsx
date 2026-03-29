import { NavLink } from "react-router-dom";
import "./Layout.scss";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <h1>Travel Jabs</h1>
      </header>

      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/clinics">Clinics</NavLink>
        <NavLink to="/vaccines">Vaccines</NavLink>
        <NavLink to="/staff">Staff</NavLink>
      </nav>

      <main>{children}</main>

      <footer>
        <small>CI5320 • Travel Jabs</small>
      </footer>
    </div>
  );
}

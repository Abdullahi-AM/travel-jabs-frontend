import { Link } from "react-router-dom";
import { useAuth } from "../components/auth/authContext.jsx";
import "./Home.scss";

export default function Home() {
  const { loggedInUser } = useAuth();

  return (
    <section className="home-page">
      <div className="home-hero">
        <h2>Welcome to Travel Jabs Clinic</h2>
        <p>
          We help you prepare for safe travel with vaccinations, appointment
          booking and trusted clinic support.
        </p>
      </div>

      {loggedInUser && (
        <div className="home-links">
          <Link to="/clinics" className="home-link-card">
            <h3>Find a clinic</h3>
            <p>Browse available clinics and choose where to book.</p>
          </Link>

          {(loggedInUser.UserRoleID === 1 || loggedInUser.UserRoleID === 2) && (
            <Link to="/vaccines" className="home-link-card">
              <h3>View vaccines</h3>
              <p>See vaccine names and costs before booking.</p>
            </Link>
          )}

          {(loggedInUser.UserRoleID === 1 || loggedInUser.UserRoleID === 2) && (
            <Link to="/clinics" className="home-link-card">
              <h3>Meet staff</h3>
              <p>Manage and review staff records linked to clinics.</p>
            </Link>
          )}

          <Link to="/about-me" className="home-link-card">
            <h3>About me</h3>
            <p>Find Out More Here.</p>
          </Link>
        </div>
      )}

      {!loggedInUser && (
        <div className="home-links">
          <Link to="/login" className="home-link-card">
            <h3>Login</h3>
            <p>Log in to access clinics, vaccines and appointments.</p>
          </Link>
        </div>
      )}
    </section>
  );
}

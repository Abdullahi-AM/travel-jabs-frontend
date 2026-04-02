import { Link } from "react-router-dom";
import "./Home.scss";

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-hero">
        <h2>Welcome to Travel Jabs Clinic</h2>
        <p>
          We help you prepare for safe travel with vaccinations, appointment
          booking and trusted clinic support.
        </p>
      </div>

      <div className="home-links">
        <Link to="/clinics" className="home-link-card">
          <h3>Find a clinic</h3>
          <p>Browse available clinics and choose where to book.</p>
        </Link>

        <Link to="/vaccines" className="home-link-card">
          <h3>View vaccines</h3>
          <p>See vaccine names and costs before booking.</p>
        </Link>

        <Link to="/staff" className="home-link-card">
          <h3>Meet staff</h3>
          <p>Manage and review staff records linked to clinics.</p>
        </Link>

        <Link to="/about-me" className="home-link-card">
          <h3>About me</h3>
          <p>Find Out More Here.</p>
        </Link>
      </div>
    </section>
  );
}
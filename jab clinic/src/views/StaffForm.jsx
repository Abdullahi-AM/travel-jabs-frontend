import "./StaffForm.scss";

export default function StaffForm({ formData, onChange, onSubmit, onCancel }) {
  return (
    <div className="StaffForm">
      <h2>Modify Staff Member</h2>

      <form onSubmit={onSubmit}>
        <div className="FormTray">
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </label>

          <label>
            Phone Number
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
            />
          </label>

          <label>
            Role
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={onChange}
            />
          </label>
        </div>

        <div className="ActionTray">
          <button type="submit" className="primary">
            Save Changes
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
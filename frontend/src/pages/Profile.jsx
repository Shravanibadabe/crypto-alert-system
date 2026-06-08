import Sidebar from "../components/Sidebar";

function Profile() {

  const name =
    localStorage.getItem("name");

  const email =
    localStorage.getItem("email");

  const role =
    localStorage.getItem("role");

  return (

    <div className="layout">

      <Sidebar />

      <div className="content">

        <div className="profile-container">

          <div className="profile-header">

            <div className="avatar">

              {name?.charAt(0)}

            </div>

            <h2>{name}</h2>

            <span className="role-badge">
              {role}
            </span>

          </div>

          <div className="profile-body">

            <div className="profile-item">

              <label>Email</label>

              <p>{email}</p>

            </div>

            <div className="profile-item">

              <label>Role</label>

              <p>{role}</p>

            </div>

            <div className="profile-item">

              <label>Status</label>

              <p>Active</p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;
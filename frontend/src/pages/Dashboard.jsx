import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {

  const [productCount, setProductCount] =
    useState(0);

  const [userCount, setUserCount] =
    useState(0);

  const role =
    localStorage.getItem("role");

  const name =
    localStorage.getItem("name");

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      // Products Count
      const products =
        await API.get("/api/v1/products/");

      setProductCount(
        products.data.length
      );

      // User Count Only For Admin
      if(role === "admin") {

        try {

          const users =
            await API.get(
              "/api/v1/auth/users"
            );

          setUserCount(
            users.data.length
          );

        } catch(err) {

          console.log(err);

          setUserCount(0);
        }
      }

    } catch(err) {

      console.log(err);

    }
  };

  return (

    <div className="layout">

      <Sidebar />

      <div className="content">

        <div className="welcome-card">

          <h1>
            Welcome Back,
            {" "}
            {name}
          </h1>

          <p>
            Product Management &
            Role Based Dashboard
          </p>

        </div>

        <div className="dashboard-grid">

          {/* Products */}

          <div className="dashboard-card purple">

            <h5>Total Products</h5>

            <h1>
              {productCount}
            </h1>

          </div>

          {/* User Count Only For Admin */}

          {
            role === "admin" && (

              <div className="dashboard-card blue">

                <h5>Total Users</h5>

                <h1>
                  {userCount}
                </h1>

              </div>

            )
          }

          {/* Role */}

          <div className="dashboard-card green">

            <h5>Your Role</h5>

            <h1>
              {role}
            </h1>

          </div>

        </div>

        <div className="activity-card">

          <h3>
            Dashboard Overview
          </h3>

          <hr />

          <p>
            ✅ JWT Authentication Active
          </p>

          <p>
            ✅ Protected Routes Enabled
          </p>

          <p>
            ✅ Role Based Access Control
          </p>

          <p>
            ✅ Total Products :
            {" "}
            <strong>
              {productCount}
            </strong>
          </p>

          {
            role === "admin" && (

              <p>
                ✅ Total Users :
                {" "}
                <strong>
                  {userCount}
                </strong>
              </p>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
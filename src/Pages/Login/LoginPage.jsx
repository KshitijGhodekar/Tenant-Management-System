import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import { login } from "../Apis/ApiCall";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      const result = await login(credentials.email, credentials.password);
      console.log("Results",result)
      if (result === "Login successful!") {
        if (credentials.password === "tenant") {
          navigate("/tenant-view");
        } else if (credentials.password === "landlord") {
          navigate("/landlord-view");
        }
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again."); 
    }
  };

  return (
    <div className="loginPage">
      <div className="loginImage">
        <img
          src={require("./Tenant.jpg")}
          alt="Tenant Management"
          style={{ width: "110em", padding: "1em" }}
        />
      </div>
      <div className="loginForm">
        <div className="formHeader">
          <h1>Tenant Management</h1>
          <p>Access, manage, and find the perfect property with ease</p>
        </div>
        <div className="inputGroup">
          <label>Email</label>
          <input
            type="email"
            value={credentials.email}
            placeholder="Email@gmail.com"
            onChange={(e) =>
              setCredentials({
                email: e.target.value,
                password: credentials.password,
              })
            }
          />
        </div>

        <div className="inputGroup">
          <label>Password</label>
          <input
            type="password"
            value={credentials.password}
            placeholder="Enter Your Password"
            onChange={(e) =>
              setCredentials({
                email: credentials.email,
                password: e.target.value,
              })
            }
          />
        </div>

        <div className="loginButtons">
          <button
            className="loginButton"
            onClick={handleSubmit}
          >
            Login
          </button>
          <button className="googleSignIn">Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};
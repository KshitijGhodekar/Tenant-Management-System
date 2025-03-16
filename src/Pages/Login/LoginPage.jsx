import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginPage.scss";
import { login } from "../Apis/ApiCall";
import { loginSuccess } from "../../redux/action";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(credentials.email)) {
      alert("Invalid email format");
      return;
    }

    try {
      const token = await login(credentials.email, credentials.password);
      if (token) {
        localStorage.setItem("jwtToken", token);

        const role = credentials.password === "tenant" ? "tenant" : "landlord";
        dispatch(
          loginSuccess({
            email: credentials.email,
            role,
            token,
          })
        );

        if (role === "tenant") {
          navigate("/tenant-view");
        } else if (role === "landlord") {
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

  const isLoginDisabled =
    !validateEmail(credentials.email) || credentials.password.trim() === "";

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
            disabled={isLoginDisabled}
          >
            Login
          </button>
          <button className="googleSignIn">Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ Login }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log("hello");
    try {
      const response = await axios.post(
        "https://my-gamepad-backend.herokuapp.com/signup",
        {
          email: `${email}`,
          username: `${username}`,
          password: `${password}`,
        }
      );

      if (response.data.token) {
        Login(response.data.token);
        navigate("/");
      } else {
        alert("Une erreur est survenue.");
      }
    } catch (error) {
      if (error.response && error.response.status === 428) {
        setError(" email et/ou mot de passe invalide");
      }
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handlesubmit}>
          <h2>Sign Up</h2>
          <input
            className="input"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p style={{ color: "red" }}>{error}</p>
          <button type="submit">Sign up</button>
          <p>
            Already have an account? <Link to="/login">Log in.</Link>
          </p>{" "}
          <div>
            <p>
              By signing up, you agree to RAWG’s Terms of Service and Privacy
              Policy
            </p>
          </div>
        </form>
      </div>{" "}
      <div
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dyj84szrx/image/upload/v1638958585/gamepad/gta-5_rgba_0_0_0_0.7_.a815fe3debf7abf2132eb7aa30d55bb9_ry7zj1.jpg")`,
          opacity: 0.2,
        }}
        className="backgroundSignUp"
      ></div>
    </div>
  );
};

export default Signup;

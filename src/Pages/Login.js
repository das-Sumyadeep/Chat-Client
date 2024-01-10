import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utility/apiRoutes";
import GoogleLogin from "../Components/GoogleLogin";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.message, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (password === "") {
      toast.error("Username And Password is required", toastOption);
      return false;
    } else if (username.length === "") {
      toast.error("Username And Password is required", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <div className="regiDiv">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="brand">
              <img src={Logo} alt="Logo" />
              <h1>Chatify</h1>
            </div>

            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />

            <button type="submit">Login</button>
          </form>
          <div className="otherLogin">
            <GoogleLogin />
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </div>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #82cd47;

  .regiDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background-color: #1b4242;
    padding: 2rem;
    border-radius: 2rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: #9ec8b9;
      text-transform: uppercase;
      font-size: 1.5rem;
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid white;
      border-radius: 0.4rem;
      color: white;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #9ec8b9;
        outline: none;
      }
      &::-ms-reveal{
        filter: invert(100%);
      }
    }

    button {
      width: 100%;
      padding: 1rem 2rem;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
      border-radius: 0.4rem;
      text-transform: uppercase;
      background-color: #9ec8b9;
      border: 0.1rem solid #1b4242;
      color: #1b4242;
      transition: 0.5s ease-in-out;

      &:hover {
        background-color: #1b4242;
        border: 0.1rem solid #9ec8b9;
        color: #9ec8b9;
      }
    }
  }

  .otherLogin {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    span {
      text-transform: uppercase;
      color: white;
      a {
        color: #9ec8b9;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }

  @media screen and (min-width: 600px) {
    .regiDiv {
      width: 70%;
    }
  }

  @media screen and (min-width: 768px) {
    .regiDiv {
      width: 50%;
    }
  }

  @media screen and (min-width: 769px) {
    .regiDiv {
      width: 40%;
    }
  }
`;

export default Login;

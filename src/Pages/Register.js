import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utility/apiRoutes";

import GoogleLogin from "../Components/GoogleLogin";

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/setAvatar");
        }
    }, []);

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
            const { username, email, password } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.message, toastOption);
            }
            if (data.status === true) {
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
                navigate("/setAvatar");
            }
        }
    };

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error("Password And Confirm Password should match", toastOption);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOption);
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be greater or equal to 8 characters",
                toastOption
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required", toastOption);
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
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(e) => handleChange(e)}
                        />
                        <button type="submit">Create User</button>
                    </form>
                    <div className="otherLogin">
                        <GoogleLogin />
                        <span>
                            already have an account? <Link to="/login">Login</Link>
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
      &::-ms-reveal {
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

  /* Media Query for Tablet Screens */
  @media screen and (min-width: 600px) {
    .regiDiv {
      width: 70%;
    }
  }

  /* Media Query for Larger Screens */
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

export default Register;

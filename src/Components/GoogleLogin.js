import React from "react";
import styled from "styled-components";
import { BsGoogle } from "react-icons/bs";
import { FirebaseAuth } from "../utility/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseRoute } from "../utility/apiRoutes";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {

  const navigate = useNavigate();

  const providers = {
    google: new GoogleAuthProvider(),
  };

  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const firebaseLogin = async (loginType) => {
    try {
      const provider = providers[loginType];
      const UserData = await signInWithPopup(FirebaseAuth, provider);
      const email = UserData.user.email ? UserData.user.email : UserData.user.providerData[0].email;
      const username = UserData.user.displayName ? UserData.user.displayName : UserData.user.providerData[0].displayName;

      const { data } = await axios.post(firebaseRoute, { username, email });

      if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user ? data.user : data.emailCheck));
        navigate("/");
      }
    } catch (err) {
      toast.error("Try again with other email", toastOption);
    }
  };

  return (
    <>
      <Container>
        <button onClick={() => firebaseLogin("google")}>
          <BsGoogle /> <p>Continue with Google</p>
        </button>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
button {
    display: flex;
    gap: 0.7rem;
    justify-content: center;
    align-items: center;
    background-color: #9ec8b9;
    border: 0.1rem solid #1b4242;
    color: #1b4242;
    padding: 1rem 2rem;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 0.4rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    p {
      padding-top: 0.3rem;
    }
    &:hover {
      background-color: #1b4242;
      border: 0.1rem solid #9ec8b9;
      color: #9ec8b9;
    }
  }
`;

export default GoogleLogin;

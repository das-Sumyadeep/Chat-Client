import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.png";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username} !</span>
      </h1>
      <h3>Please select a chat to Start Messaging</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  color: white;
  img {
    height: 12rem;
    margin-bottom: 2rem;
  }
  span {
    color: #f2cd5c;
  }

  @media screen and (min-width: 700px) and (max-width: 1080px) {
    img {
      height: 8rem;
      margin-bottom: 2rem;
    }
    span {
      font-size: 1.2rem;
      color: #f2cd5c;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 699px) {
    img {
      height: 8rem;
      margin-bottom: 2rem;
    }
    span {
      font-size: 1rem;
      color: #f2cd5c;
    }
  }
  @media screen and (min-width: 350px) and (max-width: 599px) {
    display: none;
  }
`;

export default Welcome;

import React from 'react'
import { FiLogOut } from "react-icons/fi";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <Button onClick={handleLogout} title='Logout'>
      <FiLogOut />
    </Button>
  )
}

const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
border: none;
cursor: pointer;
gap: 0.8rem;
color: white;
svg{
    font-weight: bold;
    font-size: 2rem;
}

`;

export default Logout
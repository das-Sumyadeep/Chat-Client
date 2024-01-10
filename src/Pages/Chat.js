import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUserRoute, host } from '../utility/apiRoutes'
import Contacts from '../Components/Contacts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Welcome from '../Components/Welcome'
import ChatContainer from '../Components/ChatContainer'
import { io } from 'socket.io-client';

const Chat = () => {

  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const toastOption = {
    position: 'top-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
        setIsLoaded(true);
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    const getContacts = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
            setContacts(data.data);
          } else {
            navigate('/setAvatar');
          }
        }
      } catch (err) {
        toast.error("Please wait fetching data", toastOption);
      }
    }
    getContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <>
      <Container>
        <div className={`container ${currentChat !== undefined ? 'selectedChat' : ""}`}>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          {
            isLoaded && currentChat === undefined ? <Welcome currentUser={currentUser} /> :
              <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          }

        </div>
      </Container>
      <ToastContainer />
    </>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #82CD47;
.container{
  height: 85vh;
  width: 85vw;
  background-color: #183d3d;
  display: grid;
  grid-template-columns: 25% 75%;
 
  @media screen and (min-width: 700px) and (max-width: 1080px){
    grid-template-columns: 40% 60%;
  }  
  @media screen and (min-width: 600px) and (max-width: 699px){
    grid-template-columns: 40% 60%;
  }  
  @media screen and (min-width: 350px) and (max-width: 599px){
    grid-template-columns: 100% 0;
  }  
}
.selectedChat{
  @media screen and (min-width: 350px) and (max-width: 599px){
    grid-template-columns: 0 100%;
  }
}
`

export default Chat
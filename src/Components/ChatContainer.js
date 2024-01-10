import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatInputs from "./ChatInputs";
import { addMssgRoute } from "../utility/apiRoutes";
import { getMssgRoute } from "../utility/apiRoutes";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Logout from "./Logout";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.post(getMssgRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    if (currentChat) {
      getMessages();
    }
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg, file) => {
    try {
      await axios.post(addMssgRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
        file: file,
      });
    } catch (err) {
      toast.error("The file is too large!", toastOption);
    }

    if (file) {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        file: file,
      });
    }

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, text: msg, file: file });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg, file) => {
        setArrivalMessage({ fromSelf: false, text: msg, file: file });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="backBtn">
                <BiArrowBack onClick={() => navigate(-1)} />
              </div>
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentChat.username}</h2>
              </div>
            </div>
            <div className="tabLog">
              <Logout />
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${message.fromSelf ? "sended" : "recieved"
                      }`}
                  >
                    <div className="content">
                      {message &&
                        (message.text ? (
                          <p>{message.text}</p>
                        ) : (
                          <img
                            src={message.file}
                            alt="image_file"
                            className="image_file"
                          />
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInputs handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 350px) and (max-width: 599px) {
    grid-template-rows: 15% 70% 15%;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  
  .chat-header {
    background-color: #2e4f4f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .backBtn{
        svg {
          display: none;
        }
      }
      @media screen and (min-width: 350px) and (max-width: 599px) {
        .backBtn{
          svg{
            display: flex;
            font-size: 1.2rem;
            color: white;
          }
        }
      }
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h2 {
          color: white;
        }
      }
    }
    .tabLog {
      display: none;
    }
  }

  @media screen and (min-width: 700px) and (max-width: 850px) {
    .chat-header {
      .tabLog {
        display: flex;
        svg {
          font-size: 1.5rem;
        }
      }
    }
  }
  @media screen and (min-width: 700px) and (max-width: 1080px) {
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h2 {
          font-size: 1.2rem;
          color: white;
        }
      }
    }
  }
  @media screen and (min-width: 600px) and (max-width: 699px) {
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h2 {
          font-size: 1rem;
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        p {
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          color: white;
        }

        .image_file {
          max-width: 100%;
          border-radius: 1rem;
        }
      }

      @media screen and (min-width: 600px) and (max-width: 699px) {
        .content {
          max-width: 70%;
          overflow-wrap: break-word;
          p {
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: white;
          }

          .image_file {
            max-width: 100%;
            border-radius: 1rem;
          }
        }
      }

      @media screen and (min-width: 700px) and (max-width: 1080px) {
        .content {
          max-width: 50%;
          overflow-wrap: break-word;
          p {
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: white;
          }

          .image_file {
            max-width: 100%;
            border-radius: 1rem;
          }
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        p {
          background-color: #2e8a99;
        }
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        p {
          background-color: #3c6562;
        }
      }
    }
  }
`;

export default ChatContainer;

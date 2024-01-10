import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import Logout from './Logout'
import { useNavigate } from 'react-router-dom'

const Contacts = ({ contacts, currentUser, changeChat }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }
    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <div className='brand'>
                            <div className='logo' onClick={() => navigate('/')}>
                                <img src={logo} alt='logo' />
                                <h3>Chatify</h3>
                            </div>
                            <div className='tabLog'>
                                <Logout />
                            </div>
                        </div>
                        <div className='contacts'>
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div className={`contact ${index === currentSelected ? "selected" : ""}`}
                                            key={index} onClick={() => changeCurrentChat(index, contact)}>
                                            <div className='avatar'>
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                    alt='avatar'
                                                />
                                            </div>
                                            <div className='username'>
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='current-user'>
                            <div className='avatar'>
                                <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                                    alt='avatar'
                                />
                            </div>
                            <div className='username'>
                                <h2>{currentUser.username}</h2>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #2E4F4F;
.brand{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img{
            height: 3rem;
        }
        h3{
            font-size: 1.5rem;
            color: #C3EDC0;
            text-transform: uppercase;
        }
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #A8DF8E;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact{
        background-color: #A8DF8E;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        display: flex;
        align-items: center;
        transition: 0.5s ease-in-out;
        .avatar{
            img{
                height: 3rem;
            }
        }
    }
    .selected{
        background-color: #E9FFC2;
    }
}
.current-user{
    background-color: #C8E4B2;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1.2rem;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
    }
}
@media screen and (min-width: 700px) and (max-width: 1080px){
    .brand{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            gap: 0.5rem;
            img{
                height: 2rem;
            }
            h3{
                font-size: 1.2rem;
                color: #C3EDC0;
                text-transform: uppercase;
            }
        }
    }
    .current-user{
        gap: 1rem;
        .username{
            h2{
                font-size: 1.2rem;
            }
        }
        .avatar{
            img{
                height: 2rem;
                max-inline-size: 100%;
            }
        }
    }
    .contacts{
        .contact{
            background-color: #A8DF8E;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            display: flex;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    height: 2rem;
                }
            }
            .username{
                h3{
                    font-size: 1.2rem;
                }
            }
        }
    }
}
@media screen and (min-width: 600px) and (max-width: 699px){
    .brand{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img{
                height: 2rem;
            }
            h3{
                font-size: 1rem;
                color: #C3EDC0;
                text-transform: uppercase;
            }
        }
        .tabLog{
            svg{

                font-size: 1.2rem;
            }
        }
    }
    .current-user{
        gap: 1rem;
        .username{
            h2{
                font-size: 1rem;
            }
        }
        .avatar{
            img{
                height: 2rem;
                max-inline-size: 100%;
            }
        }
    }
    .contacts{
        .contact{
            background-color: #A8DF8E;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            display: flex;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    height: 2rem;
                }
            }
            .username{
                h3{
                    font-size: 1rem;
                }
            }
        }
    }
}

@media screen and (min-width: 700px) and (max-width: 850px){
    .tabLog{
        display: none;
    }
}

`;

export default Contacts
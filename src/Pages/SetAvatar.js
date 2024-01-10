import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import loading from '../assets/loading.gif'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { setAvatarRoute } from '../utility/apiRoutes'
import { Buffer } from 'buffer'

const SetAvatar = () => {

    const api = process.env.REACT_APP_AVATAR;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOption = {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate('/login');
        }
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOption);
        } else {
            try{
                const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
                const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                    image: avatars[selectedAvatar]
                });

                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));
                    navigate('/');
                } else {
                    toast.error("Error setting avatar, try again", toastOption);
                }
            }catch(err){
                toast.error("Error setting avatar, try again later", toastOption);
            }
        }
    };

    useEffect(() => {
        const getAvatars = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const image = await axios.get(
                        `${api}/${Math.round(Math.random() * 1000)}`
                    );
                    const buffer = new Buffer(image.data);
                    data.push(buffer.toString('base64'));
                }
                setAvatars(data);
                setIsLoading(false);
            } catch (err) {
                toast.error("Please try again later", toastOption);
                setIsLoading(true);
            }
        }
        getAvatars();
    }, []);

    return (
        <>
            {
                isloading ? <Container>
                    <img src={loading} alt='loader' className='loader' />
                </Container> : (

                    <Container>
                        <div className='title-container'>
                            <h1>Pick an avatar as your profile picture</h1>
                        </div>
                        <div className='avatars'>
                            {
                                avatars.map((avatar, index) => {
                                    return (
                                        <div key={index}
                                            className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>

                                            <img src={`data:image/svg+xml;base64,${avatar}`}
                                                alt='avatar'
                                                onClick={() => setSelectedAvatar(index)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className='submit-btn'
                            onClick={setProfilePicture}>
                            Set as Profile Picture
                        </button>
                    </Container>
                )}
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #82CD47;
height: 100vh;
weight: 100vw;
.loader{
    max-inline-size: 100%;
}
.title-container{
    h1{
        color: #1B4242;
    }
}
.avatars{
    display: flex;
    gap: 2rem;
    .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img{
            height: 6rem;
        }
    }
    .selected{
        border: 0.4rem solid #1B4242;
    }
}
.submit-btn{
    background-color: #9EC8B9;
    border: 0.1rem solid #1B4242;
    color: #1B4242;
    padding: 1rem 2rem;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 0.4rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
        background-color: #1B4242;
        border: 0.1rem solid #9EC8B9;
        color: #9EC8B9;
}
`;

export default SetAvatar
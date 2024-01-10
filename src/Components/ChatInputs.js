import React, { useState } from 'react'
import styled from 'styled-components'
import { BsEmojiSmileFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import Picker from 'emoji-picker-react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { ToastContainer, toast } from 'react-toastify';

const ChatInputs = ({ handleSendMsg }) => {

    const [showEmoji, setShowEmoji] = useState(false);
    const [mssg, setMssg] = useState("");

    const toastOption = {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleEmojiPicker = () => {
        setShowEmoji(!showEmoji);
    }

    const handleEmoji = (event, emojiObject) => {

        let message = mssg;
        message += emojiObject.emoji;

        setMssg(message);
        setShowEmoji(!showEmoji);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if (mssg.length > 0) {
            handleSendMsg(mssg, "");
        }
        setMssg('');
    }

    const sendFile = (e) => {

        const selectedFile = e.target.files[0];

        // if(!selectedFile) return;

        // const reader = new FileReader();

        // reader.readAsDataURL(selectedFile);

        // reader.onload = () => {
        //     const data = reader.result;
        //     handleSendMsg("", data);
        // }

        if (selectedFile) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);

            fileRef.put(selectedFile).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    handleSendMsg("", downloadURL);
                })
            })
        } else {
            toast.error("Not valid file", toastOption)
        }
    }

    return (
        <>
            <Container>
                <div className='button-container'>
                    <div className='emoji'>
                        <BsEmojiSmileFill onClick={handleEmojiPicker} />
                        {
                            showEmoji && <Picker onEmojiClick={handleEmoji} />
                        }
                    </div>
                </div>
                <form className='input-container' onSubmit={sendChat}>
                    <input type='text' placeholder='type your message here' value={mssg} onChange={(e) => setMssg(e.target.value)} />
                    <div className='select-files'>
                        <label title="Image" htmlFor='file'><BiImageAdd /></label>
                        <input type='file' id='file' className='fileInput' onChange={sendFile} />
                    </div>
                    <button className='submit'>
                        <IoMdSend />
                    </button>
                </form>
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
padding: 0 2rem;
padding-bottom: 0.3rem;
@media screen and (min-width: 700px) and (max-width: 1080px){
    grid-template-columns: 5% 95%;
    padding: 0 1.5rem;
    gap: 1rem;
} 
@media screen and (min-width: 600px) and (max-width: 699px){
    grid-template-columns: 10% 90%;
    padding: 0 1.5rem;
    gap: 1rem;
} 
@media screen and (min-width: 350px) and (max-width: 599px){
    grid-template-columns: 10% 90%;
    padding: 0 1.5rem;
    gap: 1rem;
} 
.button-container{
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg{
            font-size: 1.8rem;
            color: #F8DE22;
            cursor: pointer;
        }
        .emoji-picker-react{
            position: absolute;
            top: -22rem;
        }
    }
}
.input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #2E4F4F;
    
    input{
        width: 95%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.3rem;

        @media screen and (min-width: 600px) and (max-width: 699px){
            &::placeholder{
                font-size: 1rem;
            }
        } 
        &:focus{
            outline: none;
        }
        &::placeholder{
            color: #9DB2BF;
        }
    }
    @media screen and (min-width: 700px) and (max-width: 1080px){
        .select-files{
            position: relative;
            left: 5%;
            svg{
                font-size: 1.8rem;
            }
        }
    } 
    @media screen and (min-width: 600px) and (max-width: 699px){
        .select-files{
            position: relative;
            left: 8%;
            svg{
                font-size: 1.8rem;
            }
        }
    } 
    @media screen and (min-width: 350px) and (max-width: 599px){
        .select-files{
            position: relative;
            left: 5%;
            svg{
                font-size: 1.8rem;
            }
        }
    } 
    .select-files{
        position: relative;
        svg{
            font-size: 2.2rem;
            cursor: pointer;
            color: #9DB2BF;
        }
        .fileInput{
            display: none;
        }
    }
    button{
        padding: 0.5rem 1.5rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        @media screen and (min-width: 700px) and (max-width: 1080px){
            padding: 1rem 1rem;
            svg{
                font-size: 1rem;
            }
        } 
        @media screen and (min-width: 600px) and (max-width: 699px){
            padding: 0.5rem 0.5rem;
            svg{
                font-size: 1rem;
            }
        } 
        @media screen and (min-width: 350px) and (max-width: 599px){
            padding: 0.8rem 0.8rem;
            svg{
                font-size: 1rem;
            }
        } 
        svg{
            font-size: 2rem;
            color: #183D3D;
        }
    } 
}
`;

export default ChatInputs
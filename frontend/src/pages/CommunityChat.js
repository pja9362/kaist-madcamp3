import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import { SOCKET_SEND, SOCKET_RECEIVE, SOCKET_URL } from "../service/socket";
import './Community.css';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import { io } from "socket.io-client";

const CommunityChat = ({ tokenId }) => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const roomId = 1;
    const socket = io(SOCKET_URL, {
        query: { userId: tokenId },
    });

    useEffect(() => {
        socket.on(SOCKET_RECEIVE.CONNECT, () => {
        console.log("socket server connected.");
        });
        socket.on(SOCKET_RECEIVE.DISCONNECT, () => {
        console.log("socket server disconnected.");
        });
        socket.emit(SOCKET_SEND.ROOM_IN, roomId);
        socket.on(SOCKET_RECEIVE.MESSAGE, (data) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key is pressed!');
            handleClickButton(event);
            }
        };

    const handleInputTextChange = (event) => {
        setInputText(event.target.value);
    };

    const handleClickButton = (event) => {
        socket.emit(SOCKET_SEND.MESSAGE, roomId, inputText);
        setInputText('');
    };


    return (
        <div className='chat-box' >
            <div className='chat-header'>
                <div className='chat-mode-box '>
                    <div className='chat-mode-selected'>Live</div>
                    <div className='chat-mode'>Offline</div>
                    </div>
            </div>
                <div className='chat-content'>
                    {messages.map((data, index) => (
                        data.from === tokenId ?
                            <div key={index} className='flex-align-mine'>
                                <div className='chat-message-mine'>{data.message}</div>
                            </div>
                            :
                            <div key={index}>
                            <div className='chat-name'>{data['from']}</div>
                            <div className='flex-align-other'>
                                <div className='chat-photo'></div>
                                    <div className='chat-message'>{data.message}</div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className='flex-row' style={{ width:'100%', padding:30, transform: 'translateY(-60px)' }}>
                <FavoriteBorderOutlined color='disabled'/>
                <input className='chat-input-box' placeholder='Type your message' value={inputText} onKeyPress={handleKeyPress} onChange={handleInputTextChange}/>
                    <div className='chat-input-button' onClick={handleClickButton} onKeyDown={handleClickButton}>
                    <SendSharpIcon style={{ marginRight: 4 }}/>
                    <div>Send</div>
                </div>
            </div>
            </div>
    );
};

export default CommunityChat;

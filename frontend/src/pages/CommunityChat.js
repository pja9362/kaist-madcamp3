import AttachFileIcon from '@mui/icons-material/AttachFile';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { BACK_ENDPOINT, SOCKET_RECEIVE, SOCKET_SEND, SOCKET_URL } from "../service/socket";
import './Community.css';
import { createRoot } from 'react-dom';
import { fetchTicketImage } from '../services/api';
import { Avatar } from '@mui/material'; 

const CommunityChat = ({ tokenId, roomId }) => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const lastMessageRef = useRef(null);
    const [ownerAddress, setOwnerAddress] = useState('');

    useEffect(() => {
        setOwnerAddress(localStorage.getItem('ownerAddress'));
    }, []);

    // my profile image
    const [senderProfile, setSenderProfile] = useState(null);

    useEffect(() => {
        fetchTicketImage(ownerAddress).then((data) => {
            const photoUri = data?.photoUri; 
            if (photoUri !== '') {
                setSenderProfile(photoUri);
            }
        });
    }, [ownerAddress]);


    useEffect(() => {
        const handleScrollToLastMessage = () => {
            if (lastMessageRef.current) {
                setTimeout(() => {
                    lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
                }, 0);
            }
        };

        handleScrollToLastMessage();
    }, []);

    useEffect(() => {
        const handleScrollToLastMessage = () => {
            if (lastMessageRef.current && messages.length > 0) {
                setTimeout(() => {
                    lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
                }, 100);
            }
        };

        handleScrollToLastMessage();
    }, [messages]);

    useEffect(() => {
        if (socket) {
            socket.on(SOCKET_RECEIVE.CONNECT, () => {
                console.log("socket server connected.");
            });
            socket.on(SOCKET_RECEIVE.DISCONNECT, () => {
                console.log("socket server disconnected.");
            });
            socket.emit(SOCKET_SEND.ROOM_IN, roomId);
            socket.off(SOCKET_RECEIVE.MESSAGE);
            socket.on(SOCKET_RECEIVE.MESSAGE, (data) => {
                setMessages((prevMessages) => [...prevMessages, data]);
            });
        }
    }, [roomId, socket]);

    useEffect(() => {
        const newSocket = io(SOCKET_URL, {
            query: { userId: tokenId },
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [tokenId]);

    useEffect(() => {
        const fetchChatMessages = async () => {
            if (roomId === -1) return;
            const PORT = 80;
            const ROUTER_PATH = '/chatRoom';
            const API_URL = `http://${BACK_ENDPOINT}:${PORT}${ROUTER_PATH}/${roomId}`;

            try {
                const response = await fetch(`${API_URL}`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessages(data.messages.map((data) => ({
                    type: data.type, profileImage: data.profileImage,
                    from: data.nftTokenId, 
                    message: data.contents, 
                    createdAt: formatTime(data.createdAt)
                })));
                console.log('room messages: ', data.messages);
            } catch (error) {
                console.error('Error fetching room messages: ', error);
            }
        };
        fetchChatMessages();

    }, [roomId]);

    const uploadImage = async (file) => {
        if (!file) return;
        const PORT = 80;
        const ROUTER_PATH = '/image/upload';
        const API_URL = `http://${BACK_ENDPOINT}:${PORT}${ROUTER_PATH}`;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_URL}`, { method: 'POST', body: formData });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            socket.emit(SOCKET_SEND.MESSAGE, roomId, 1, data.url, senderProfile);
        } catch (error) {
            console.error('Error fetching room messages: ', error);
        }
    };

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
        if(inputText === '') return;
        socket.emit(SOCKET_SEND.MESSAGE, roomId, 0, inputText, senderProfile);
        setInputText('');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        uploadImage(file);
    };

    const handleFileClick = () => {
        document.getElementById('file-upload').click();
    };

    const [isHeartClicked, setIsHeartClicked] = useState(false);

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let period = "AM";
        let formattedHours = hours;

        if (hours >= 12) {
            period = "PM";
            formattedHours = hours === 12 ? 12 : hours - 12;
        }

        formattedHours = formattedHours < 10 ? "0" + formattedHours : formattedHours;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

        return `${formattedHours}:${formattedMinutes} ${period}`;
    }

    const handleHeartButtonClick = () => {
        const groupSize = 3;
        const chatBox = document.querySelector('.chat-box');
        const chatBoxRect = chatBox.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('span');
                createRoot(heart).render(<p style={{ color: `hsla(${Math.random() * 30}, 100%, 50%, ${Math.random()})`, fontSize: `${Math.random() * 24 + 12}px` }}>&#x1F497;</p>);
                heart.classList.add('heart');
                heart.style.left = `${Math.random() * (chatBoxRect.right - chatBoxRect.left) + chatBoxRect.left}px`;
                heart.style.bottom = `${window.innerHeight - chatBoxRect.bottom}px`;
                heart.style.transform = `rotate(${Math.random() * 360}deg)`;
                document.body.appendChild(heart);
                setTimeout(() => {
                    heart.remove();
                    setIsHeartClicked(false);
                }, 3000);
            }, Math.floor(i / groupSize) * 300);
        }
    };

    const formatString = (str) => {
        if (!str || str.length < 8) {
            return str;
        }

        const prefix = str.slice(0, 5);
        const suffix = str.slice(-3);

        return `${prefix}...${suffix}`;
    };

    return (
        roomId === -1
            ? <div className='chat-box' >
                <div className='no-room-message'> No room selected </div>
            </div>
            : <div className='chat-box' >
                <div className='chat-header'>
                    <div className='chat-mode-box '>
                        <div className='chat-mode-selected'>Live</div>
                        <div className='chat-mode'>Offline</div>
                    </div>
                </div>
                <div className='flex-column' style={{ overflowY: 'auto' }}>
                    <div className='chat-room-inside'>
                        <div className='chat-content'>
                            {messages.map((data, index) => (
                                data.from === tokenId ?
                                    <div key={index}>
                                        <div className='flex-align-mine'>
                                            {
                                                data.type === 1
                                                ?  <div className='chat-message-mine'><img src={data.message} alt="Image" style={{ width: '200px' }} /></div>
                                                : <div className='chat-message-mine'>{data.message}</div>
                                            }
                                            {(index === messages.length - 1 || messages[index + 1].createdAt !== data.createdAt) && <div className='chat-time'>{data.createdAt}</div>}
                                        </div>
                                        {index === messages.length - 1 && <div ref={messages.length - 1 === index ? lastMessageRef : null} />}
                                    </div>
                                    :
                                    (index !== 0 && messages[index - 1].from === data.from) ?
                                        <div key={index} style={{ marginLeft: 45 }}>
                                            <div className='flex-align-other'>
                                                {
                                                    data.type === 1
                                                    ? <div className='chat-message'><img src={data.message} alt="image" style={{ width: '200px' }} /></div>
                                                    :  <div className='chat-message' >{data.message}</div>
                                                }
                                                {(index === messages.length - 1 || messages[index + 1].createdAt !== data.createdAt) && <div className='chat-time'>{data.createdAt}</div>}
                                            </div>
                                            {index === messages.length - 1 && <div ref={messages.length - 1 === index ? lastMessageRef : null} />}
                                        </div>
                                        :
                                        <div key={index}>
                                            <div className='chat-name'>{formatString(data.from)}</div>
                                            <div className='flex-align-other'>
                                                {data.profileImage && (
                                                    <Avatar
                                                        src={data.profileImage}
                                                        alt={`User Avatar`}
                                                        sx={{ width: 44, height: 44, borderRadius: 44, border: '2px solid var(--point-color)' }}
                                                    />
                                                )}
                                                {
                                                    data.type === 1
                                                    ?  <div className='chat-message'><img src={data.message} alt="image" style={{ width: '200px' }} /></div>
                                                    :  <div className='chat-message'>{data.message}</div>
                                                }
                                                {(index === messages.length - 1 || messages[index + 1].createdAt !== data.createdAt) && <div className='chat-time'>{data.createdAt}</div>}
                                            </div>
                                            {index === messages.length - 1 && <div ref={messages.length - 1 === index ? lastMessageRef : null} />}
                                        </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex-row' style={{ justifySelf: 'flex-end', marginBottom: 20 }}>
                        <FavoriteBorderIcon sx={{ mr: '15px', ml: '35px', color: isHeartClicked ? 'red' : 'white' }} onClick={() => { setIsHeartClicked(true); handleHeartButtonClick(); }} />
                        <AttachFileIcon onClick={handleFileClick} sx={{ mr: '20px', color: 'white' }} />
                        <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                        <input className='chat-input-box' style={{ padding: '5px 15px', borderRadius: '20px', border: 0, outline: 'none' }} placeholder='Type your message' value={inputText} onKeyPress={handleKeyPress} onChange={handleInputTextChange} />
                        <div className='chat-input-button' style={{ borderRadius: '20px', padding: '1px 2px' }} onClick={handleClickButton} onKeyDown={handleClickButton}>
                            <SendSharpIcon style={{ marginRight: '10px' }} />
                            <div>Send</div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default CommunityChat;

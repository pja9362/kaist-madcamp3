import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import './Community.css';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
const CommunityChat = () => {
    return (
        <div className='chat-box' >
            <div className='chat-header'>
                <div className='chat-mode-box '>
                    <div className='chat-mode-selected'>Live</div>
                    <div className='chat-mode'>Offline</div>
                </div>
            </div>
            <div className='chat-content'>
                <div>
                    <div className='chat-name'>super start NUP</div>
                    <div className='flex-align-other'>
                        <div className='chat-photo'></div>
                        <div className='chat-message'>{'hi'}</div>
                    </div>
                </div>
                <div>
                    <div className='chat-name'>super start NUP</div>
                    <div className='flex-align-other'>
                        <div className='chat-photo'></div>
                        <div className='chat-message'>{'hi'}</div>
                    </div>
                </div>
                <div className='flex-align-mine'>
                    <div className='chat-message-mine'>{'hi nup zzuk!!!! I love you'}</div>
                </div>
            </div>
            <div className='flex-row' style={{ width:'100%', padding:30, transform: 'translateY(-60px)' }}>
                <FavoriteBorderOutlined color='disabled'/>
                <input className='chat-input-box' placeholder='  Type your message' />
                <div className='chat-input-button'>
                    <SendSharpIcon style={{ marginRight: 4 }}/>
                    <div>Send</div>
                </div>
            </div>
        </div>
    );
};

export default CommunityChat;

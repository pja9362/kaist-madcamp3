import React from 'react';
import Header from '../components/Header';
import './Community.css';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
const Community = () => {
    return (
        <div className='root-container'>
            <Header/>
            <div className='container'>
                <div className='chat-list-box'>
                    <div className='chat-list-header'>
                        <div className='flex-row'>
                            <div className='list-item-photo'></div>
                            <div className='flex-column'>
                                <div className='bold-text'>name</div>
                                <div className='medium-text'>message</div>
                            </div>
                        </div>
                    </div>
                    <div className='chat-list'>
                        <div className='list-item-box'>
                            <div className='flex-row'>
                                <div className='list-item-photo'></div>
                                <div className='flex-column'>
                                    <div className='bold-text'>Room name</div>
                                    <div className='medium-text'>message</div>
                                </div>
                            </div>
                        </div>
                        <div className='list-item-box-selected'>
                            <div className='flex-row'>
                                <div className='list-item-photo-selected'></div>
                                <div className='flex-column'>
                                    <div className='bold-text-white'>Room name</div>
                                    <div className='medium-text-white'>message</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='chat-box' >
                    <div className='chat-header'>
                        <div className='chat-mode-box '>
                            <div className='chat-mode-selected'>Live</div>
                            <div className='chat-mode'>Offline</div>
                        </div>
                    </div>
                    <div className='chat-content'></div>
                    <div className='flex-row' style={{ width:'100%', padding:30, transform: 'translateY(-60px)' }}>
                        <FavoriteBorderOutlined color='disabled'/>
                        <input className='chat-input-box' placeholder='  Type your message' />
                        <div className='chat-input-button'>
                            <SendSharpIcon style={{ marginRight: 4 }}/>
                            <div>Send</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;

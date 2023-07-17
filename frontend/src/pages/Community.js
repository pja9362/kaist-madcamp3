import React from 'react';
import Header from '../components/Header';
import './Community.css';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import CommunityChat from './CommunityChat';
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
                        <div className='list-item-box'>
                            <div className='flex-row'>
                                <div className='list-item-photo'></div>
                                <div className='flex-column'>
                                    <div className='bold-text'>Room name</div>
                                    <div className='medium-text'>message</div>
                                </div>
                            </div>
                        </div>
                        <div className='list-item-box'>
                            <div className='flex-row'>
                                <div className='list-item-photo'></div>
                                <div className='flex-column'>
                                    <div className='bold-text'>Room name</div>
                                    <div className='medium-text'>message</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CommunityChat/>
            </div>
        </div>
    );
};

export default Community;

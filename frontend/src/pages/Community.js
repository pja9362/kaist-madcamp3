import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import './Community.css';
import { BACK_ENDPOINT } from "../service/socket";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import CommunityChat from './CommunityChat';
import backImage from '../images/background_grad.png';


const Community = () => {
    const [ownerAddress, setOwnerAddress] = useState('');
    const [chatRoomList, setChatRoomList] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(1);

    useEffect(() => {
        fetchChatRoomList();
    }, []);

    useEffect(() => {
        const address = localStorage.getItem('ownerAddress');
        setOwnerAddress(address);
    }, []);

    const fetchChatRoomList = async () => {
        const PORT = 80;
        const ROUTER_PATH = '/chatRoom';

        const API_URL = `http://${BACK_ENDPOINT}:${PORT}${ROUTER_PATH}`;

        try {
            const response = await fetch(`${API_URL}`, {method: 'GET'});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setChatRoomList(data);
            //   const { nftCount } = data;
            console.log('room List:', data);
            } catch (error) {
            console.error('Error fetching roomList:', error);
            }
        };

        const formatString = (str) => {
            if (!str || str.length < 8) {
                return '';
            }
    
            const prefix = str.slice(0, 5);
            const suffix = str.slice(-3);

            return `${prefix}...${suffix}`;
        };

    return (
        <div className='root-container'>
            <Header/>
            <div className='container'>
                <div className='chat-list-box'>
                    <div className='chat-list-header' style={{backgroundImage: `url(${backImage})`}}>
                        <div className='flex-row'>
                            <div className='list-item-photo'></div>
                            <div className='flex-column'>
                                <div className='bold-text'>{formatString(ownerAddress)}</div>
                                <div className='medium-text'>message</div>
                            </div>
                        </div>
                    </div>
                    <div className='chat-list'>
                        {chatRoomList.map((data, index) => (
                            (data.id === selectedRoomId) ?
                                <div key={index} className='list-item-box-selected'>
                                    <div className='flex-row'>
                                        <div className='list-item-photo-selected' style={data.profilePhotoUrl&&{ backgroundImage: `url(${data.profilePhotoUrl})` }}></div>
                                        <div className='flex-column'>
                                            <div className='bold-text-white'>{data.name}</div>
                                            <div className='medium-text-white'>{ data.createdAt.split('T')[0] }</div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div key={index} className='list-item-box'>
                                <div className='flex-row'>
                                    <div className='list-item-photo' style={data.profilePhotoUrl&&{ backgroundImage: `url(${data.profilePhotoUrl})` }}></div>
                                    <div className='flex-column'>
                                        <div className='bold-text'>{data.name}</div>
                                        <div className='medium-text'>{ data.createdAt.split('T')[0] }</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <CommunityChat roomId={1} tokenId={ownerAddress}/>
            </div>
        </div>
    );
};

export default Community;

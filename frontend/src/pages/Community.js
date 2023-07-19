import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import './Community.css';
import { BACK_ENDPOINT } from "../service/socket";
import CommunityChat from './CommunityChat';
import backImage from '../images/background_grad.png';
import defaultProfile from '../images/default_profile.png';
import { fetchTicketImage } from '../services/api';
import { Avatar } from '@mui/material';
import Web3 from 'web3';
import data from '../abi/data.json';
import config from '../config/config';

const Community = () => {
    const [ownerAddress, setOwnerAddress] = useState('');
    const [chatRoomList, setChatRoomList] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(-1);
    const [tokenId, setTokenId] = useState('');
    const [isRegistered, setIsRegistered] = useState('');

    useEffect(() => {
        fetchChatRoomList();
      }, []);

    const contractAddress = config.contractAddress;

    // 채팅방 입장 Register MetaMask Call 로직
    const registerMetamaskCall = async () => {
        try {
          // Web3 인스턴스 생성
          const web3 = new Web3(window.ethereum);
          // 스마트 컨트랙트 인스턴스 생성
          const contract = new web3.eth.Contract(data, contractAddress);
          // 사용자의 지갑 주소 가져오기
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          // 스마트 컨트랙트의 함수 호출
          const receipt = await contract.methods.register(tokenId)
            .send({ from: account });
          return receipt;
        } catch (error) {
          console.error(error);
        }
      };
      

    const isValidReceipt = (receipt) => {
        return receipt && receipt.status;
    };
    
    const handleChatRoomClick = async (roomId) => {
        if(isRegistered) {
            setSelectedRoomId(roomId);
        } else {
            const receipt = await registerMetamaskCall();
            if (isValidReceipt(receipt)) {
            setSelectedRoomId(roomId);
            } else {
            alert("Invalid receipt");
            }
        }
    };

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

            // my profile image
    const [myProfile, setMyProfile] = useState(null);

    useEffect(() => {
        setOwnerAddress(localStorage.getItem('ownerAddress'));
    }, []); 

    useEffect(() => {
        fetchTicketImage(ownerAddress).then((data) => {
            const photoUri = data?.photoUri; 
            const tokenId = data?.tokenId;
            const isRegister = data?.isRegistered;
            if (photoUri !== '' ) {
                setMyProfile(photoUri);
                setTokenId(tokenId);
                setIsRegistered(isRegister);
            }
            
        });
    }, [ownerAddress]);

    return (
        <div className='root-container'>
            <Header/>
            <div className='container'>
                <div className='chat-list-box'>
                    <div className='chat-list-header' style={{backgroundImage: `url(${backImage})`}}>
                        <div className='flex-row'>
                            <div className='list-item-photo' style={{backgroundImage: `url(${myProfile || defaultProfile})`}}></div>
                            <div className='flex-column'>
                                <div className='bold-text'>{formatString(ownerAddress)}</div>
                                <div className='medium-text'>내 프로필</div>
                            </div>
                        </div>
                    </div>
                    <div className='chat-list'>
                        {chatRoomList.map((data, index) => (
                            (data.id === selectedRoomId) ?
                                <div key={index} className='list-item-box-selected'>
                                    <div className='flex-row'>
                                            <Avatar
                                                className='list-item-photo-selected'
                                                src={data.profilePhotoUrl}
                                                alt={`User Avatar`}
                                                sx={{ width: 44, height: 44, borderRadius: 44, border: '2px solid var(--point-color)' }}
                                            />
                                        {/* <div className='list-item-photo-selected' style={data.profilePhotoUrl&&{ backgroundImage: `url(${data.profilePhotoUrl})` }}></div> */}
                                        <div className='flex-column'>
                                            <div className='bold-text-white'>{data.name}</div>
                                            <div className='medium-text-white'>{ data.createdAt.split('T')[0] }</div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div key={index} className='list-item-box' onClick={()=>handleChatRoomClick(data.id)}>
                                <div className='flex-row'>
                                    {/* <div className='list-item-photo' style={data.profilePhotoUrl&&{ backgroundImage: `url(${data.profilePhotoUrl})` }}></div> */}
                                    <Avatar
                                        className='list-item-photo'
                                        src={data.profilePhotoUrl}
                                        alt={`User Avatar`}
                                        sx={{ width: 44, height: 44, borderRadius: 44, border: '2px solid var(--point-color)' }}
                                    />
                                    <div className='flex-column'>
                                        <div className='bold-text'>{data.name}</div>
                                        <div className='medium-text'>{ data.createdAt.split('T')[0] }</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <CommunityChat roomId={selectedRoomId} tokenId={ownerAddress} />
            </div>
        </div>
    );
};

export default Community;

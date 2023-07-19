import React, {useEffect, useState} from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import Web3 from 'web3';
import data from "../abi/data.json";
import config from '../config/config';
import { fetchUpdatedTicketCount } from '../services/api';
import AlertMessage from './AlertMessage';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const TicketModal = ({ open, onClose, concert, setTicketCount, isPurchased }) => {

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const contractAddress = config.contractAddress;

    const handlePurchaseConfirmation = async () => {
            // 메타마스크와 연동하는 코드 추가
            try {
                // Web3 인스턴스 생성
                const web3 = new Web3(window.ethereum);
                // 스마트 컨트랙트 인스턴스 생성
                const contract = new web3.eth.Contract(data, contractAddress);
                
                // 사용자의 지갑 주소 가져오기
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                // 스마트 컨트랙트의 함수 호출
                const receipt = await contract.methods.MintTicket()
                .send({ from: account, value: web3.utils.toWei("0.001", "ether") });
               // 트랜잭션이 성공적으로 마이닝된 경우에만 처리
                if (receipt.status) {
                    // 예매 완료 알림
                    setIsAlertOpen(true);

                    // nftCount 업데이트를 TicketModal 컴포넌트의 상태로 처리합니다.
                    const updatedNftCount = await fetchUpdatedTicketCount();
                    setTicketCount(updatedNftCount);
                }

                // NFT 개수 업데이트
            } catch (error) {
                console.error(error);
            } 
    };

    return (
        <>
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="concert-modal-title"
            aria-describedby="concert-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    // width: '40%',
                    p: 4,
                    maxWidth: '50%',
                    maxHeight: '70%',
                    bgcolor: '#fff',
                    boxShadow: 24,
                    outline: 'none',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* Left Section - Image */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <img src={concert?.image} alt={`Concert ${concert?.id}`} style={{ width: 'auto', height: '250px', borderRadius: 10 }} />
                </Box>

                {/* Right Section - Concert Information */}
                <Box sx={{ flex: 2, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', ml: 2 }}>
                    <Box>
                        <Typography variant="h6" sx={{ width: "100%", fontWeight: 'bold', mb: 1,  overflowWrap: 'break-word' }}>
                            {concert?.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: '5px' }}>
                            {concert?.date}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: '5px' }}>
                            {concert?.place}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: '5px'}}>
                            {concert?.price}
                        </Typography>
                    </Box>
                    <Box sx={{m: '20px 10px 0px'}}>
                        {!isPurchased ? (
                            <>
                        <Button onClick={handlePurchaseConfirmation} variant="contained" color="primary" sx={{ mr: 2, backgroundColor: '#000' }}>
                            예매
                        </Button>
                        <Button onClick={onClose} variant="contained" sx={{backgroundColor: '#000'}}>
                            취소
                        </Button>
                        </>) : (
                            <IconButton onClick={onClose} sx={{ position: 'absolute', top: 15, right: 15 }}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </Box>
        </Modal>
         <AlertMessage alertOpen={isAlertOpen} alertMessage="티켓이 발급되었습니다." />
        </>
    );
};

export default TicketModal;
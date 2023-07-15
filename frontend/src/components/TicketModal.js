import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const TicketModal = ({ open, onClose, concert }) => {
    const handlePurchaseConfirmation = (concert) => {
        alert('예매 완료!');
    };

    return (
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
                        <Button onClick={() => handlePurchaseConfirmation(concert)} variant="contained" color="primary" sx={{ mr: 2, backgroundColor: '#000' }}>
                            예매
                        </Button>
                        <Button onClick={onClose} variant="contained" sx={{backgroundColor: '#000'}}>
                            취소
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default TicketModal;
import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import './Tickets.css';
import { Button, Typography, Grid, Stack } from '@mui/material';
import AllTickets from '../components/AllTickets';
import MyTickets from '../components/MyTickets';
import star from '../images/starry-night-sky.jpg';

const Tickets = () => {
    const [activeContent, setActiveContent] = useState(1);

    return (
        <>
            <Header />
            <div className='ticket-back'></div>
        <div className="tickets-container" >
            <Stack spacing={2} direction="row" sx={{p: 3, justifyContent: 'center'}}>
                <Button
                    variant="text"
                    className={`content-button ${activeContent === 1 ? 'active' : ''}`}
                    onClick={() => setActiveContent(1)}
                    sx={{color: activeContent === 1 ? 'white' : 'gray', borderBottom: activeContent === 1 ?  '2px solid white' : 0, borderRadius: 0}}
                >
                    현재 판매 티켓
                </Button>
                <Button
                    variant="text"
                    className={`content-button ${activeContent === 2 ? 'active' : ''}`}
                    onClick={() => setActiveContent(2)}
                    sx={{color: activeContent === 2 ? 'white' : 'gray', borderBottom: activeContent === 2 ?  '2px solid white' : 0,  borderRadius: 0}}
                >
                    나의 티켓
                </Button>
            </Stack>
            {activeContent === 1 ? <AllTickets /> : <MyTickets />}
        </div>
      </>
    );
};

export default Tickets;
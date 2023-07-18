import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import concert2 from '../images/concert2.jpeg';
import concert4 from '../images/concert4.jpeg';
import mainTicket from '../images/ticket1.png';
import myTicket1 from '../images/ticket2.png';
import myTicket2 from '../images/ticket3.png';

import mainconcert from '../images/mainconcert.png';
import backImage from '../images/back_ticket.png';
import './AllTickets.css';
import { Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TicketModal from './TicketModal';
import Grow from '@mui/material/Grow';
import config from '../config/config';


const MyTickets = () => {
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConcert, setSelectedConcert] = useState(null);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        // Use a timer to show cards after 500ms delay
        const timer = setTimeout(() => {
          setShowCards(true);
        }, 500);
      
        // Clear the timer on unmount to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);
      
    const [ticketImage, setTicketImage] = useState('');
    const [ownerAddress, setOwnerAddress] = useState('');

      const slides = [
          { id: 1, image: myTicket2, title: 'BTS SUGA 단독 콘서트', date: '2023.7.23', place: '서울 고척스카이돔', price: '스페셜석 : 0.001 ETH'},
          { id: 2, image: myTicket1, title: 'LE SSERAFIM 단독 콘서트', date: '2023.7.31', place: '서울 올림픽공원 체조경기장', price: '스페셜석 : 0.001 ETH' },
          { id: 3, image: ticketImage, title: '우주대스타 넙죽이 단독 콘서트', date: '2023.7.28', place: '카이스트 N1', price: '스페셜석 : 0.001 ETH' },
      ];

      // 함수로 이미지를 가져오기
    const fetchTicketImage = async (tokenId) => {
      const IP_ADDRESS = '172.10.5.130';
      const PORT = 80;
      const ROUTER_PATH = '/meta-stage-web3/api/v1';
      const API_URL = `http://${IP_ADDRESS}:${PORT}${ROUTER_PATH}/nft-info?ownerAddress=${tokenId}`;

      try {
        const response = await fetch(API_URL);
        console.log('response', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('ticketUri', data.ticketUri);

        return data.ticketUri;
      } catch (error) {
        console.error('Error fetching ticket image:', error);
        return null;
      }
    };

    useEffect(() => {
      setOwnerAddress(localStorage.getItem('ownerAddress'));
    }, []); 

    useEffect(() => {
      fetchTicketImage(ownerAddress).then((ticketUri) => {
          setTicketImage(ticketUri);
          console.log(ticketUri);
      });
    }, [ownerAddress]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };
  
    const handleCardFlip = (index) => {
      const activeCard = document.querySelector('.carousel-item.active');
    
      if (activeCard && activeCard.classList.contains('flipped')) {
        activeCard.classList.remove('flipped');
      } else {
        activeCard.classList.add('flipped');
      }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        handleCardFlip(index);
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const slideWidth = carouselItems[0].offsetWidth;
        const centerIndex = Math.floor(slides.length / 2);

        if (carousel) {
          const shift = currentSlide - centerIndex;
          carousel.style.transform = `translateX(${-shift * slideWidth}px)`;
        }
    }, [currentSlide, slides.length]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
      <>
        <div className="carousel-container">
          <div className="carousel" ref={carouselRef}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    style={{ animationDelay: `${index * 0.5}s` }}
                >
                    <div className="card">
                    <div className="front">
                        <div className="image-wrapper">
                        <img src={slide.image} alt={`Concert ${slide.id}`} />
                        </div>
                    </div>
                    <div className="back">
                        <div className='back-content'>
                                <img src={backImage} alt={`Concert ${slide.id}`}/> 
                            </div>
                        </div>
                    </div>
                </div>
            ))}
          </div>
          <div className="navigator">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <Button className="prevButton" onClick={prevSlide} startIcon={<ArrowBackIosIcon />}  sx={{left: 0, color: '#fff', zIndex: 3, position: 'absolute', top: '50%' , fontWeight: '900'}}></Button>
          <Button className="nextButton" onClick={nextSlide} endIcon={<ArrowForwardIosIcon />} sx={{right: 0, color: '#fff', zIndex: 3,  position: 'absolute', top: '50%', fontWeight: '900' }}></Button>
        </div>
        <TicketModal
          open={isModalOpen}
          onClose={handleCloseModal}
          concert={selectedConcert}
          
        />
      </>
  );
};

export default MyTickets;

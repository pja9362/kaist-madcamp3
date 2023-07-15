import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import concert1 from '../images/concert1.jpeg';
import concert2 from '../images/concert2.jpeg';
import concert3 from '../images/concert3.jpeg';
import concert4 from '../images/concert4.jpeg';
import concert5 from '../images/concert5.jpeg';
import concert6 from '../images/concert6.jpeg';
import concert7 from '../images/concert7.png';
import mainconcert from '../images/mainconcert.png';
import backImage from '../images/back_ticket.png';
import './Tickets.css';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TicketModal from '../components/TicketModal';

const Tickets = () => {
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConcert, setSelectedConcert] = useState(null);

    const slides = [
        { id: 4, image: concert4, title: 'BTS SUGA 단독 콘서트', date: '2023.7.23', place: '서울 고척스카이돔', price: '스페셜석 : 100,000원'},
        { id: 2, image: concert2, title: 'LE SSERAFIM 단독 콘서트', date: '2023.7.31', place: '서울 올림픽공원 체조경기장', price: '스페셜석 : 100,000원' },
        { id: 7, image: concert7, title: 'BLACKPINK 단독 콘서트', date: '2023.7.30', place: '서울 올림픽공원 체조경기장', price: '스페셜석 : 100,000원'},
        { id: 8, image: mainconcert, title: '우주대스타 넙죽이 단독 콘서트', date: '2023.7.28', place: '카이스트 N1', price: '스페셜석 : 100,000원' },
        { id: 6, image: concert6, title: 'ITZY 월드투어', date: '2023.8.8', place: '서울 올림픽공원 체조경기장', price: '스페셜석 : 100,000원'},
        { id: 1, image: concert1, title: 'IM HERO 임영웅 콘서트', date: '2023.8.10', place: '대전컨벤션센터 제2전시장', price: '스페셜석 : 100,000원' },
        { id: 3, image: concert3, title: '세븐틴 월드투어 BE THE SUN', date: '2023.7.31', place: '서울 고척스카이돔', price: '스페셜석 : 100,000원'  },
        { id: 5, image: concert5, title: 'WINNER 단독 콘서트', date: '2023.7.30', place: '서울 올림픽공원 체조경기장', price: '스페셜석 : 100,000원' },
    ];

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

    const handlePurchaseClick = (concert) => {
        setSelectedConcert(concert);
        console.log(concert.id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

  return (
    <>
      <Header />
      <div className="carousel-container">
        <div className="carousel" ref={carouselRef}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <div className="card">
                <div className="front">
                  <div className="image-wrapper">
                    <img src={slide.image} alt={`Concert ${slide.id}`} />
                  </div>
                </div>
                <div className="back">
                    <div className='back-content'>
                          <Button onClick={() => handlePurchaseClick(slide)} variant="outlined" sx={{color: 'white', border: '1px solid #fff'}} className="buy-button">
                              티켓 구매
                          </Button>
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

export default Tickets;

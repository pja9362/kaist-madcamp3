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

import './Tickets.css';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Tickets = () => {
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { id: 4, image: concert4, title: 'Concert 4' },
        { id: 2, image: concert2, title: 'Concert 2' },
        { id: 7, image: concert7, title: 'Concert 7' },
        { id: 8, image: mainconcert, title: 'Main Concert'},
        { id: 6, image: concert6, title: 'Concert 6' },
        { id: 1, image: concert1, title: 'Concert 1' },
        { id: 3, image: concert3, title: 'Concert 3' },
        { id: 5, image: concert5, title: 'Concert 5' },
    ];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    const handleCardFlip = (index) => {
    
    }

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
              <div className="image-wrapper">
                <img src={slide.image} alt={`Concert ${slide.id}`} />
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
        <Button className="prev-button" onClick={prevSlide} startIcon={<ArrowBackIosIcon />}>
          Prev
        </Button>
        <Button className="next-button" onClick={nextSlide} endIcon={<ArrowForwardIosIcon />}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Tickets;

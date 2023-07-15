import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import nft1 from '../images/nft1.png';
import nft2 from '../images/nft2.png';
import nft3 from '../images/nft3.png';
import nft4 from '../images/nft4.png';
import nft5 from '../images/nft5.jpeg';

import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Root = styled.div({
  width: '100vw',
  height: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontFamily: 'Noto Sans KR, sans-serif'
});

const FadeIn = styled.div(props => ({
  opacity: 0,
  animation: `fade-in-animation 0.5s ease-in-out forwards ${props.delay || ''}`,
  '@keyframes fade-in-animation': {
    '0%': {
      opacity: 0,
      transform: 'translateY(30px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}));


const EnlargedButton = styled(Button)({
  color: 'black',
  backgroundColor: 'white',
  padding: '7px 25px',
  transition: 'transform 0.3s, background-color 0.3s',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.05)',
    backgroundColor: '#97FEED', 
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  }
});

const GradientText = styled(Typography)({
  background: 'linear-gradient(to bottom right , #C0C0C0, #FFFFFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
});

const SplashPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  const handleClick = () => {
    navigate('/about');
  };

  return (
    <Root>
      {isLoaded && (
        <>
          <FadeIn as={GradientText} sx={{fontWeight: 900}} variant="h3" delay="0s">
            Welcome MetaStage
          </FadeIn>
          <div>
            <FadeIn as={GradientText} sx={{p: '10px 0 30px'}} variant="h5" delay="0.5s">
              Stage 너머의 Stage
            </FadeIn>
            
            <FadeIn className="nftImg" as="img" src={nft1} alt="nft1-img" style={{ width: '128px', height: '128px', position: 'absolute', top: '15%', left: '15%', borderRadius: '50%', transform: 'rotate(30deg)' }} delay="1s" />
            <FadeIn className="nftImg" as="img" src={nft5} alt="nft5-img" style={{ width: '128px', height: '128px', position: 'absolute', top: '70%', left: '30%',  borderRadius: '50%', transform: 'rotate(-30deg)' }} delay="1.5s" />
            <FadeIn className="nftImg" as="img" src={nft3} alt="nft3-img" style={{ width: '88px', height: '88px', position: 'absolute', top: '50%', left: '8%',  borderRadius: '50%', transform: 'rotate(-30deg)' }} delay="2s" />
            <FadeIn className="nftImg" as="img" src={nft4} alt="nft4-img" style={{ width: '128px', height: '128px', position: 'absolute', top: '9%', right: '20%',  borderRadius: '50%', transform: 'rotate(30deg)' }} delay="2.5s" />
            <FadeIn className="nftImg" as="img" src={nft2} alt="nft5-img" style={{ width: '128px', height: '128px', position: 'absolute', top: '60%', right: '10%',  borderRadius: '50%', transform: 'rotate(-30deg)' }} delay="3s" />
          </div>
          <FadeIn as={EnlargedButton} variant="contained" onClick={handleClick} delay="3.3s">
            시작하기
          </FadeIn>
        </>
      )}
    </Root>
  );
};

export default SplashPage;
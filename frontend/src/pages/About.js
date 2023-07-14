import React from 'react';
import vector from '../images/icon_light.svg';
import light from '../images/light.png';
import backgroundImg from '../images/home_background.jpg';
import Header from '../components/Header';

const About = () => {

  return (
    <>
    <Header />
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <style>
        {`
         @keyframes shake {
          0% { transform: skewX(-10deg); }
          5% { transform: skewX(10deg); }
          10% { transform: skewX(-10deg); }
          15% { transform: skewX(10deg); }
          20% { transform: skewX(0deg); }
          100% { transform: skewX(0deg); }  
          }
          
          .background-gradient {
            width: 60%;
            height: 100%;
            position: absolute;
            right: 0;
            background: linear-gradient(to left, rgba(0, 0, 0, 0.7), black), url(${backgroundImg}) center/cover;
            animation: gradient-animation 10s infinite;
          }
          .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-image: linear-gradient(90deg, silver, white);
          }
        `}
      </style>
      <div className="background-gradient"></div>
      <div style={{ left: '63%', top: '30%', position: 'absolute', color: 'white', fontSize: 70, fontWeight: '700', wordWrap: 'break-word' }}>
        <span className="text-gradient">Stage</span> <span style={{ fontSize: 55 }}>너머의</span> <br/> Stage
      </div>
      <div style={{ left: 60, top: 39, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
        <div style={{ width: 20, height: 0, transform: 'rotate(90deg)', transformOrigin: '0 0', border: '2px #FF0060 solid' }}></div>
        <div style={{ width: 16, height: 0, transform: 'rotate(90deg)', transformOrigin: '0 0', border: '2px #F6FA70 solid' }}></div>
        <div style={{ width: 12, height: 0, transform: 'rotate(90deg)', transformOrigin: '0 0', border: '2px #97FEED solid' }}></div>
      </div>
      <div style={{ width: 300, height: 60, paddingLeft: 33, paddingRight: 33, paddingTop: 5, paddingBottom: 5, left: '63%', top: 496, position: 'absolute', background: 'white', borderRadius: 30, border: '0.50px black solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
        <div style={{ textAlign: 'center', color: 'black', fontSize: 16, fontWeight: '400', wordWrap: 'break-word' }}>Enjoy Your Stage</div>
      </div>
      <div style={{ width: 235, height: 0, left: '67.5%', top: 736, position: 'absolute', border: '1px white solid' }}></div>
      <div style={{ width: 117, height: 0, left: '67.5%', top: 736, position: 'absolute', border: '1px #9A9EA5 solid' }}></div>
      <div style={{ animation: 'shake 3s infinite' }}>
        <img
          src={light}
          alt={'light-img'}
          style={{
            width: 672,
            height: 440,
            left: 54.50,
            top: 360,
            position: 'absolute',
            animationDelay: '0s', // 애니메이션 지연 시간 설정
          }}
        ></img>
        <img
          src={vector}
          alt={'vector-img'}
          style={{
            width: 241.14,
            height: 241.14,
            left: 285.19,
            top: 130,
            position: 'absolute',
            transformOrigin: '0 0',
            animationDelay: '0s', // 애니메이션 지연 시간 설정
          }}
        ></img>
        <div
          style={{ 
            width: 144, 
            height: 0, 
            left: 412, 
            top: 0, 
            position: 'absolute', 
            transformOrigin: '0 0',
            animationDelay: '0s', // 애니메이션 지연 시간 설정
            border: '5px white solid' ,
            transform: 'rotate(90deg)', 
          }}
        ></div>
      </div>
    </div>
    </>
  );
};

export default About;


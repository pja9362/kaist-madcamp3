import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 구글 폰트를 동적으로 로드하는 코드
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500;900&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);


// 스타일을 추가하여 전체 화면에 검정색 배경을 설정합니다.
document.body.style.backgroundColor = 'black';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.documentElement.style.height = '100vh'; // root 요소에 높이를 100vh로 설정합니다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
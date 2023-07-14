import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
// import Home from './pages/Home';
import SplashPage from './pages/SplashPage'
import About from './pages/About';
import Tickets from './pages/Tickets';
import Community from './pages/Community';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div style={{ height: '100vh', width: '100vw'}}>
        <Routes>
          <Route path="/" element={<SplashPage/>} />
          <Route path="/about" element={<About />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
};

export default App;

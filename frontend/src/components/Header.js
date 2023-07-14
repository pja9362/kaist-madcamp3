import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import PersonIcon  from '@mui/icons-material/Person';
import OpenseaIcon from '../images/icon_opensea.png';

const Header = () => {
    const handleOpenseaClick = () => {
        window.open('https://opensea.io', '_blank');
    };

    return (
        <AppBar position="static">
        <Toolbar style={{ justifyContent: 'center', backgroundColor: '#fff', color: '#000', textAlign: 'center' }}>
            <Typography variant="h6" component="div" sx={{ left: '20' }}>
            Logo
            </Typography>

            <nav style={{ flexGrow: 1 }}>
            <Button component={Link} to="/about" color="inherit">About</Button>
            <Button component={Link} to="/tickets" color="inherit">Tickets</Button>
            <Button component={Link} to="/community" color="inherit">Community</Button>
            </nav>

            <div className="right-section" style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit" onClick={handleOpenseaClick}>
                    <img width={30} height={30} src={OpenseaIcon} alt="Opensea Logo" />
                </IconButton>
                <IconButton color="inherit">
                    <PersonIcon />
                </IconButton>
            </div>
        </Toolbar>
        </AppBar>
    );
};

export default Header;
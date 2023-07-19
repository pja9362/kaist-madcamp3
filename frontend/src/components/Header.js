import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import OpenseaIcon from '../images/icon_opensea.png';
import EtherscanIcon from '../images/etherscan.png';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import logo from '../images/logo_black.png';
import data from '../abi/data.json';
import config from '../config/config';
import { fetchTicketImage } from '../services/api';
import AlertMessage from './AlertMessage';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [walletBalance, setWalletBalance] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [profile, setProfile] = useState(null);
    const [ownerAddress, setOwnerAddress] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const contractAddress = config.contractAddress;
    
    const handleOpenseaClick = () => {
        window.open('https://testnets.opensea.io/collection/metastage-official', '_blank');
    };

    const handleEtherscanClick = () => {
        window.open(`https://sepolia.etherscan.io/address/${contractAddress}`, '_blank');
    };

    // Function to handle Metamask login
    const handleLoginWithMetamask = async () => {
        try {
            // Check if Metamask is available
            if (typeof window.ethereum !== 'undefined') {
                // Request account access from the user
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                // If the user approves the login request, set the user's address
                setAddress(accounts[0]);
                // Set login state to true
                setIsLogin(true);
                localStorage.setItem('ownerAddress', accounts[0]);
            } else {
                // Metamask is not available
                alert('Please install and connect Metamask to login.');
            }
        } catch (err) {
            // Handle error (e.g., user rejects the login request)
            console.error(err);
            alert('Failed to login with Metamask.');
        }
    };

    // Check if Metamask is already connected on initial load
    useEffect(() => {
        const checkMetamaskConnection = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setAddress(accounts[0]);
                        setIsLogin(true);
                        localStorage.setItem('ownerAddress', accounts[0]);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };

        checkMetamaskConnection();
    }, []);


    const handleConvertTicket = async () => {
        // 메타마스크와 연동하는 코드 추가
        try {
            // Web3 인스턴스 생성
            const web3 = new Web3(window.ethereum);
            // 스마트 컨트랙트 인스턴스 생성
            const contract = new web3.eth.Contract(data, contractAddress);
            
            // 사용자의 지갑 주소 가져오기
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            // 스마트 컨트랙트의 함수 호출
            const receipt = await contract.methods.transformToPhoto()
            .send({ from: account });
           // 트랜잭션이 성공적으로 마이닝된 경우에만 처리
            if (receipt.status) {
                setIsAlertOpen(true);
                setAlertMessage('포토카드로 변환되었습니다 📸');
            }

            // NFT 개수 업데이트
        } catch (error) {
            console.error(error);
        }
    };
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const getWalletBalance = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const address = accounts[0];
                setAddress(address);

                // Fetch the balance using the 'eth_getBalance' method
                const balance = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [address, 'latest'], // 'latest' means fetch the latest balance
                });

                // Convert balance from Wei to Ether (assuming 18 decimal places)
                const web3 = new Web3(window.ethereum);
                const balanceInEther = web3.utils.fromWei(balance, 'ether');
                setWalletBalance(balanceInEther);
            } catch (err) {
                console.error(err);
            }
        } else {
            // Metamask is not available
            alert('Please install and connect Metamask to fetch wallet balance.');
        }
    };

    // Fetch the wallet balance on initial load
    useEffect(() => {
        if (isLogin) {
            getWalletBalance();
        }
    }, [isLogin]);


    useEffect(() => {
        setOwnerAddress(localStorage.getItem('ownerAddress'));
    }, []); 

    useEffect(() => {
        fetchTicketImage(ownerAddress).then((data) => {
            const photoUri = data?.photoUri; 
            if (photoUri !== '') {
                setProfile(photoUri);
            }
        });
    }, [ownerAddress]);

    const sideList = () => (
        <div
        role="presentation"
        onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose}
        style={{
            width: 365,
            height: '100%',
            textAlign: 'center',
            overflowY: 'hidden'
        }}
        >
        <List sx={{ height: '100%', padding: '10%', }}>
            {/* 프로필 사진 */}
            <ListItem sx={{height: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center', m: '70px 0 30px'}}>
                <Avatar src={profile} alt="프로필 사진" sx={{ width: '160px', height: '160px', mb: '20px'}} />
            </ListItem>

            {/* 지갑 주소 */}
            <ListItem button sx={{display: 'block'}}>
                <Box sx={{width: '100%', display: 'flex'}}>
                    <AccountBalanceWalletIcon sx={{width: '35px', height: '35px', mr: '15px', mb: '5px'}}/>
                    <ListItemText primary="지갑 주소" />
                </Box>
                <Typography sx={{fontSize: '12px'}}>{address}</Typography>
            </ListItem>

            {/* 지갑 잔고 */}
            <ListItem button sx={{display: 'block', mt: '10px'}}>
                <Box sx={{width: '100%', display: 'flex'}}>
                    <AttachMoneyIcon sx={{width: '35px', height: '35px', mr: '15px'}}/>
                    <ListItemText primary="지갑 잔고" />
                </Box>
                <Typography sx={{fontSize: '12px'}}>{walletBalance} <span style={{fontWeight: '900', marginLeft: '5px' }}>ETH</span></Typography>
            </ListItem>

            {/* 프로필 수정 */}
            {address === '0x40a3371a6d710bde54a2e0003c741838d142896b' ? (
                <Button variant="contained" sx={{mt: '30%'}} onClick={handleConvertTicket}>
                    <Typography>포토카드 변환</Typography>
                </Button>
            ) : null }
        </List>
        </div>
    );


    return (
        <>
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'center', backgroundColor: '#fff', color: '#000', textAlign: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto', marginLeft: '15px' }} />

            <nav style={{ flexGrow: 1 }}>
                <Button component={Link} to="/about" color="inherit">About</Button>
                <Button component={Link} to="/tickets" color="inherit">Tickets</Button>
                <Button component={Link} to="/community" color="inherit">Community</Button>
            </nav>

            <div className="right-section" style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit" onClick={handleEtherscanClick}>
                <img width={30} height={30} src={EtherscanIcon} alt="Etherscan Logo" />
                </IconButton>
                <IconButton color="inherit" onClick={handleOpenseaClick}>
                <img width={30} height={30} src={OpenseaIcon} alt="Opensea Logo" />
                </IconButton>
                {isLogin ? (
                <IconButton color="inherit" onClick={handleDrawerOpen}>
                    <PersonIcon />
                    </IconButton>
                ) : (
                    <Button color="inherit" onClick={handleLoginWithMetamask} sx={{fontWeight: 900}}>
                        Login
                    </Button>
                )}
            </div>
            </Toolbar>
        </AppBar>

        <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose} >
            {sideList()}
        </Drawer>
        <AlertMessage alertOpen={isAlertOpen} alertMessage={alertMessage} />
        </>
    );
};

export default Header;

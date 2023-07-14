import React from 'react';
import Header from '../components/Header';
import { Grid,  Box, Paper, Container } from '@mui/material';
import nft1 from '../images/nft1.png';

const Tickets = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Container sx={{  m: '10%', textAlign: 'center', justifyContent: 'center', display: 'flex' }}>
          <Box sx={{ width: 'wrapContent',  justifyContent: 'center', display: 'flex' }}>
            <Grid container>
              <Grid item xs={4} >
                <Paper elevation={12} sx={{mb: '30px'}} component="img" src={nft1} width={256} height={256} alt="Image 1" ></Paper>
                <Paper elevation={12} component="img" src={nft1} width={256} height={256} alt="Image 1" ></Paper>
              </Grid>
              <Grid item xs={4} >
                <Paper elevation={12} component="img" src={nft1} width={300} height={542} alt="Image 1"  ></Paper>
              </Grid>
              <Grid item xs={4} >
                <Paper elevation={12} sx={{mb: '30px'}} component="img" src={nft1} width={256} height={256} alt="Image 1" ></Paper>
                <Paper elevation={12} component="img" src={nft1} width={256} height={256} alt="Image 1" ></Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Tickets;

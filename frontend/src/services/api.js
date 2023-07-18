import { useState, useEffect } from 'react';


const fetchUpdatedTicketCount = async () => {
    const IP_ADDRESS = '172.10.5.130';
    const PORT = 80;
    const ROUTER_PATH = '/meta-stage-web3/api/v1';
  
    const API_URL = `http://${IP_ADDRESS}:${PORT}${ROUTER_PATH}`;
    console.log("API_URL", API_URL);
  
    try {
      const response = await fetch(`${API_URL}/nft-count`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const { nftCount } = data;
      console.log('nftCount:', data);
      return nftCount; // 함수에서 값을 반환하도록 수정합니다.
    } catch (error) {
      console.error('Error fetching nftCount:', error);
      return null; // 에러가 발생했을 때는 null을 반환합니다.
    }
};
  
export { fetchUpdatedTicketCount };
  
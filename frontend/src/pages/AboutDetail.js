import React from 'react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, Container, Typography} from '@mui/material';
import banner from '../images/banner.png';

const AboutDetail = () => {
  return (
    <>
      <Header />
      <div className='container'style={{ width: '100vw', height: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden' }}>
        <div className="back-right"></div>
        <div className="back-top"></div>
        <div style={{ margin: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 5, width: '100%', height: '80%', }}>
          <div style={{ maxWidth: '300px', width: '30%', height: '100%', backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20px 0 0 20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}></div>
          <Card sx={{  p: 5.5, width: '60%', borderRadius: "0 20px 20px 0" }}>
            <CardHeader title="Stage 너머의 Stage" />
            <CardContent >
                <Typography variant="body1">
                    Stage는 dynamic NFT (Non Fungible Token)을 활용한 콘서트 티켓팅 + 팬 커뮤니티 서비스입니다.
                </Typography>
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    🎬 Stage:
                </Typography>
                <Typography variant="body1">
                    - 당신이 가장 사랑하는 스타의 콘서트를 가장 공정하고 안전한 NFT로 예매하세요!
                    <br/>- NFT티켓은 변경, 조작, 중복구매, 매크로, 도용이 불가능하고 암표 거래도 불가능한 유일하고 이상적인 콘서트 티켓입니다.
                    <br/>- NFT티켓의 가치는 단순한 티켓을 뛰어넘어 유일한 존재가치를 가집니다.
                </Typography>
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    🎬 Over the Stage:
                </Typography>
                <Typography variant="body1">
                    - 콘서트가 끝난 후에 NFT는 다이나믹하게 스타의 포토카드로 변경됩니다! 변경된 포토카드는 스타와 함께하는 프라이빗 팬 커뮤니티에 등록할 수 있는 입장권이 됩니다.
                    <br/>- 포토카드는 거래가 가능하고, 원한다면 다른 사람에게 포토카드를 판매하여 팬 커뮤니티 참여 권한을 위임할 수 있습니다.
                    (탈덕했더라도 걱정하지 마세요..!)
                    <br/>- 게다가 NFT는 굉장히 귀여운 스타의 캐릭터 이미지로 등록되어 있습니다! 
                </Typography>
                
                <Typography variant='h6' sx={{textAlign: 'center', mt: 10, p: 2, backgroundColor: '#e0ffff', borderRadius: 5 }}>"유일한 당신의 NFT를 획득해보세요."</Typography>
            </CardContent>
        </Card>
        </div>
    </div>
    </>
  );
};

export default AboutDetail;

// import React from 'react';
// import Header from '../components/Header';
// import { Card, CardContent, CardHeader, Container, Typography} from '@mui/material';
// import banner from '../images/banner.png';

// const AboutDetail = () => {
//   return (
//     <>
//       <Header />
//       <div className='container'style={{ width: '100vw', height: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden' }}>
//         <div className="back-right"></div>
//         <div className="back-top"></div>
//         <div style={{ display: 'flex', flexDirection: 'row',zIndex: 5, width: '50%' }}>
//           <div style={{ maxWidth: '500px',  padding: '20px', width: '100%', height: '100%', backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px 0 0 10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}></div>
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, width: '100%' }}>
//         <Card sx={{ maxWidth: '500px', padding: '20px', p: 6 }}>
//             <CardHeader title="About Project Stage 너머의 Stage" />

//             <CardContent >
//                 <Typography variant="body1">
//                     Stage는 dynamic NFT (Non Fungible Token)을 활용한 콘서트 티켓팅 + 팬 커뮤니티 서비스입니다.
//                 </Typography>
//                 <Typography variant="h6" style={{ marginTop: '20px' }}>
//                     🎬 Stage:
//                 </Typography>
//                 <Typography variant="body1">
//                     당신이 가장 사랑하는 스타의 콘서트를 가장 공정하고 안전한 NFT로 예매하세요!
//                     NFT티켓은 변경, 조작, 중복구매, 매크로, 도용이 불가능하고 암표 거래도 불가능한 유일하고 이상적인 콘서트 티켓입니다.
//                     NFT티켓의 가치는 단순한 티켓을 뛰어넘어 유일한 존재가치를 가집니다.
//                 </Typography>
//                 <Typography variant="h6" style={{ marginTop: '20px' }}>
//                     🎬 Over the Stage:
//                 </Typography>
//                 <Typography variant="body1">
//                     콘서트가 끝난 후에 NFT는 다이나믹하게 스타의 포토카드로 변경됩니다! 변경된 포토카드는 스타와 함께하는 프라이빗 팬 커뮤니티에 등록할 수 있는 입장권이 됩니다.
//                     포토카드는 거래가 가능하고, 원한다면 다른 사람에게 포토카드를 판매하여 팬 커뮤니티 참여 권한을 위임할 수 있습니다.
//                     (탈덕했더라도 걱정하지 마세요..!)
//                     게다가 NFT는 굉장히 귀여운 스타의 캐릭터 이미지로 등록되어 있습니다! 유일한 당신의 NFT를 획득해보세요.
//                 </Typography>
//             </CardContent>
//         </Card>
//         </div>
//     </div>
//     </>
//   );
// };

// export default AboutDetail;

import { CssBaseline,  Alert } from '@mui/material';
import { useState, useEffect } from 'react';

const AlertMessage = ({ alertOpen, alertMessage }) => {
    const [open, setOpen] = useState(alertOpen);
    
    useEffect(() => {
        setOpen(alertOpen);
      }, [alertOpen]);

    useEffect(() => {
        if(alertOpen){
        const timer = setTimeout(() => {
          setOpen(false);
        }, 1800);
    
        return () => clearTimeout(timer);
        }
      }, [alertOpen]);

    return(
          <>
            <CssBaseline />
            <div style={{ position: 'relative', zIndex:'6' }}>
            {open && (
                <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '120px',
                  transform: 'translate(-50%, -50%)',
                  zIndex: '5',
                  textAlign:'center'
                }}
              >
                <Alert style={{width: `100%`, color:'black', backgroundColor:'white', borderRadius:'0px', boxShadow: '0px 5px 10px rgba(0,0,0,0.5)' }} icon={false}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}>
                        <div style={{textAlign: 'center', padding:'5px 10px'}}>{alertMessage}</div>
                    </div> 
                </Alert>
              </div>
            )}
            </div>
          </>
    )
}

export default AlertMessage;
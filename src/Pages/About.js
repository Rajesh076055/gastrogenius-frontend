import React from 'react';
import "../styles/About.css"
import { Modal, Box, Typography, FormControl, Button } from '@mui/material';
import { styleModalBox, useStyles, style } from '../styles/Style';
const About = ({props}) => {
    const {isOpen, setIsOpen} = props;
    const classes = useStyles();
    return (
        <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={{...styleModalBox, width:700}}>
                <h1 style={{color:"#103557", fontSize:30}}>About Us</h1>
                <p>
                    GastroGenius is a real-time polyps detection software. It is a web-based
                    application designed for screening polyps in real time using a highly
                    trained deep learning model. Our software offers a range of features,
                    including a feedback mechanism, real-time session control, and the
                    ability to download findings from recorded footage. This prototype
                    version is a powerful tool for detecting both small and large-sized
                    polyps.
                </p>
                <p>
                    At GastroGenius, we are dedicated to providing innovative solutions for
                    medical professionals to enhance their ability to detect and diagnose
                    gastrointestinal issues. Our focus on real-time detection and user
                    feedback sets us apart, making GastroGenius a valuable asset in
                    healthcare.
                </p>
                <Button sx={[style.root,{marginTop:3}]} className={`${classes.inputField}`}
                variant="contained" onClick={()=>setIsOpen(false)}>Close</Button>
            </Box>
        </Modal>
    );
}

export default About;

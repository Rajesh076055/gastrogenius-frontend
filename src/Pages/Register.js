import React, { useEffect } from 'react'
import { TextField, Input, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import io from 'socket.io-client';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const useStyles = makeStyles(() => ({
  inputField: {
    width: '30%',
  },
}));

const style = {
  root: {
    backgroundColor: "#92400E",
    marginTop: 4,
    ':hover': {
      backgroundColor: "#92400E",
      boxShadow: "default"
    },
    boxShadow: 'none',
  }
}

const styleBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 540,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 0,
  p: 0,
};

function Register() {

  const canvasRef = React.useRef(null);
  const diagnosisTypes = ["Endoscopy", "Colonoscopy"];
  const [diagnosis, setDiagnosis] = React.useState('');
  const [name, setName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [goodToGo, setGoodToGo] = React.useState(false);
  const [filename, setFilename] = React.useState('');
  const [currentFrameIndex, setCurrentFrameIndex] = React.useState(0);
  const [goodToStart, setGoodToStart] = React.useState(false);
  const [socket, setSocket] = React.useState(null);

  const handleChange = (e) => {
    setDiagnosis(e.target.value);
  };

  const handleClose = () => {

    window.location.assign('/register-service');
  }


  const handleVideoInput = async (e) => {

    const videoFile = e.target.files[0];

    const formData = new FormData();
    formData.append("file", videoFile);


    try {
      const response = await axios.post("http://localhost:8000/send-videos", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });


      if (response.data.ack) {
        setGoodToStart(true);
      }

      setGoodToGo(response.data.ack);
      setFilename(response.data.filepath);

      console.log("We have received acknowledgement from fastapi app: ", response.data.ack);
      console.log("We have received filepath from fastapi app: ", response.data.filepath);

    } catch (error) {
      console.log("Error uploading video!", error);
    }
  }

  const startSession = () => {
    setOpen(true);
    if (!socket) {
      const newSocket = new WebSocket('ws://localhost:8000/ws');
      setSocket(newSocket);

      newSocket.onopen = function (event) {
        console.log("WebSocket connected");
        newSocket.send(filename);
      };
      console.log("going to return");

      return () => {
        newSocket.close();
        console.log("returned");
      };
    }
  };
  useEffect(() => {

    console.log("trying to enter");
    if (socket) {
      console.log("entered");
      socket.onmessage = function (event) {
        const frame = event.data;

        console.log(typeof (frame))


        const canvas = canvasRef.current;
        console.log('canvas: ', typeof(canvas))
        if (canvas) {
          console.log("entered into canvas")
          const ctx = canvas.getContext('2d');

          // const renderFrames = async() => {

          const img = new Image();
          img.src = `data:image/jpeg;base64,${frame}`;
          console.log(typeof(img))
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setCurrentFrameIndex((prevIndex) => prevIndex + 1);
            //requestAnimationFrame(renderFrames);
          };
        }
      }




      // renderFrames();    
      // }
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };


  }, [socket]);





  const classes = useStyles();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className='mb-10 font-semibold text-4xl'>Please enter the details</h1>
      <TextField id="outlined-basic"
        label="Your Full Name"
        variant="outlined"
        className={classes.inputField}
        InputProps={{
          inputProps: {
            autoCapitalize: 'words',
          },
        }}
        onChange={(e) => { setName(e.target.value) }}
      />

      <FormControl className={`${classes.inputField} mt-6`}>
        <InputLabel id="demo-simple-select-label" className='mt-6'>Diagnosis Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={diagnosis}
          label="Diagnosis Type"
          onChange={handleChange}
          className='mt-6'
        >

          <MenuItem value={diagnosisTypes[0]}>Endoscopy</MenuItem>
          <MenuItem value={diagnosisTypes[1]}>Colonoscopy</MenuItem>

        </Select>
      </FormControl>



      <Input type="file" accept="video/*,image/*" onChange={handleVideoInput} sx={{ marginTop: 3 }} ></Input>
      <FormGroup className='mt-7'>
        <FormControlLabel control={<Checkbox disabled={name ? (diagnosis ? false : true) : true} />} label="I want the system to save the footages of findings" />
      </FormGroup>
      <Button sx={style.root} className={`${classes.inputField}`} disabled={!goodToStart} variant="contained" onClick={startSession}>Start the session</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={styleBox}>
          <canvas ref={canvasRef} width={540} height={350}></canvas>
        </Box>

      </Modal>


    </div>
  )
}

export default Register

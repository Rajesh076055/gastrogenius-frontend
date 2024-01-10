import React from 'react'
import { TextField, Input, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../Contexts/AppContext';
import '../styles/Register.css';
import {startSession, postVideo} from '../APIs/HTTPCalls';
import { useStyles, style } from '../styles/Style';
import { useCanvasSize } from '../Contexts/AppContext';

function Register() {

  const classes = useStyles();
  const navigate = useNavigate();
  const socket_with_ai = useSocket();
  const { setCanvasSize } = useCanvasSize();

  const diagnosisTypes = ["Endoscopy", "Colonoscopy"];
  const [diagnosis, setDiagnosis] = React.useState('');
  const [name, setName] = React.useState('');
  const [filename, setFilename] = React.useState('');
  const [goodToStart, setGoodToStart] = React.useState(false);

 
  const handleChange = (e) => {
    setDiagnosis(e.target.value);
  };

  const handleVideoInput = async (e) => {

    const videoFile = e.target.files[0];

    const response = await postVideo(videoFile);

    if (response.data.ack) {
      setGoodToStart(true);
      setFilename(response?.data?.filepath);
      
    }

  }

  const initiateSession = async() => {

    const response = await startSession(filename);

    if (response.data.ACK)
    {
      const { width, height } = response.data.size;
      setCanvasSize({ width, height });
      navigate('/session');

    }
    
  };

  React.useEffect(()=>{

    socket_with_ai.emit('stop_thread');
    socket_with_ai.emit('Unpause');

  },[socket_with_ai]);


  return (
    <div className='__registerBody__'>
      <div className='__registerBodyTitle__'>

        <h1>Gastro<span style={{color:'#3b94e5'}}>Genius</span></h1>
        <span className='__registerBodyDot__'></span>

      </div>
      <div className="__registerBodyForm__">
        <h1 className='font-semibold text-2xl'>Please enter the details</h1>

        <TextField id="outlined-basic"
          label="Your Full Name"
          variant="outlined"
          className={classes.inputField}
          onChange={(e) => { setName(e.target.value)}}
        />

        <FormControl className={`${classes.inputField}`}>
          <InputLabel id="demo-simple-select-label">Diagnosis Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={diagnosis}
            label="Diagnosis Type"
            onChange={handleChange}
          >
            <MenuItem value={diagnosisTypes[0]}>Endoscopy</MenuItem>
            <MenuItem value={diagnosisTypes[1]}>Colonoscopy</MenuItem>
          </Select>
        </FormControl>

        <Input type="file" accept="video/*,image/*" onChange={handleVideoInput}></Input>

        <FormGroup>
          <FormControlLabel control={<Checkbox disabled={name ? (diagnosis ? false : true) : true} />} 
          label="I want to download the results of detection" />
        </FormGroup>

        <Button sx={style.root} className={`${classes.inputField}`} disabled={!goodToStart} 
        variant="contained" onClick={initiateSession}>Start the session</Button>

      </div>
    </div>
    
  )
}

export default Register

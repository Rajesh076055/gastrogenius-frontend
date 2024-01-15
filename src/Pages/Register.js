import React, {useEffect, useState} from 'react';
import { TextField, Input, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../Contexts/AppContext';
import { useName } from '../Contexts/AppContext';
import '../styles/Register.css';
import { postVideo, downloadZip} from '../APIs/HTTPCalls';
import { useStyles, style } from '../styles/Style';
import { useCanvasSize } from '../Contexts/AppContext';

function Register() {

  const classes = useStyles();
  const navigate = useNavigate();
  const socket_with_ai = useSocket();
  const { setCanvasSize } = useCanvasSize();
  const [check, setCheck] = useState(false);
  const { setName, diagnosis, setDiagnosis } = useName();
  const [diagnosis_, setDiagnosis_] = useState('');
  const diagnosisTypes = ["Endoscopy", "Colonoscopy"];
  const [name_, setName_] = useState('');
  const [filename, setFilename] = useState('');


  const handleChange = (e) => {
    setDiagnosis_(e.target.value);
    setDiagnosis(e.target.value);
  };

  const handleCheckBox=(e)=> {
    setCheck((prev)=>!prev);
  }

  const handleVideoInput = async (e) => {

    if (name_ === "")
    {
      alert("Enter Name first");
      return
    }
    
    setName(name_);

    socket_with_ai.emit('join', name_);
    
    const videoFile = e.target.files[0];

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('name', name_);

    const response = await postVideo(formData);
    if (response?.data?.ack)
    {
      setFilename(response?.data?.filepath);
      const { width, height } = response?.data?.size;
      setCanvasSize({ width, height });
    }
  }


  const initiateSession = async() => {

    const data = {
      "name":name_,
      "diagnosis":diagnosis_,
      "save_value":check,
      "video_path":filename
    }
    
    socket_with_ai.emit('start-session', data);

    navigate('/session');
   
  };

  useEffect(()=>{
    
    socket_with_ai.on("end",async(data)=>{
      
      try 
       {
        
        await downloadZip(data, socket_with_ai);
 
       } catch (error) {
           console.log("Error in download_zip function:", error);
       }
    })

    return ()=> {
      socket_with_ai.off("end");
    }

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
          onChange={(e) => { setName_(e.target.value)}}
        />

        <FormControl className={`${classes.inputField}`}>
          <InputLabel id="demo-simple-select-label">Diagnosis Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={diagnosis_}
            label="Diagnosis Type"
            onChange={handleChange}
          >
            <MenuItem value={diagnosisTypes[0]}>Endoscopy</MenuItem>
            <MenuItem value={diagnosisTypes[1]}>Colonoscopy</MenuItem>
          </Select>
        </FormControl>

        <Input type="file" accept="video/*,image/*" onChange={handleVideoInput}></Input>

        <FormGroup>
          <FormControlLabel control={<Checkbox disabled={name_ ? (diagnosis_ ? false : true) : true} onChange={(e)=>handleCheckBox(e)} />} 
          label="I want to download the results of detection" />
        </FormGroup>

        <Button sx={style.root} className={`${classes.inputField}`} disabled={name_ ? (diagnosis_ ? (filename ? false: true) : true) : true} 
        variant="contained" onClick={initiateSession}>Start the session</Button>

      </div>
    </div>
    
  )
}

export default Register

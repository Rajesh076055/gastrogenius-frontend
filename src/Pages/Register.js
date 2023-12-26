import React from 'react'
import { TextField, Input, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../Contexts/SocketContext';

const useStyles = makeStyles(() => ({
  inputField: {
    width: '80%',
    height:'8%'
  },
}));

const style = {
  root: {
    backgroundColor: "#103557",
    ':hover': {
      backgroundColor: "#103552",
      boxShadow: "default"
    },
    boxShadow: 'none',
  }
}



const socket_with_ai = io('http://localhost:8000');

socket_with_ai.emit("connect_with_frontend");

function Register() {

  
  const diagnosisTypes = ["Endoscopy", "Colonoscopy"];
  const [diagnosis, setDiagnosis] = React.useState('');
  const [name, setName] = React.useState('');
  //const [open, setOpen] = React.useState(false);
  //const [goodToGo, setGoodToGo] = React.useState(false);
  const [filename, setFilename] = React.useState('');
  //const [currentFrameIndex, setCurrentFrameIndex] = React.useState(0);
  const [goodToStart, setGoodToStart] = React.useState(false);
  const navigate = useNavigate();
  const socket_with_ai = useSocket();
  
  const handleChange = (e) => {
    setDiagnosis(e.target.value);
  };



  //This function triggers just when the user selects a footage
  const handleVideoInput = async (e) => {

    const videoFile = e.target.files[0];

    const formData = new FormData();
    formData.append("file", videoFile);


    //The below code is used to provide video file to the ai server just when user uploads
    //The response is acknowledgement and the filepath
    try {
      const response = await axios.post("http://localhost:8000/send-videos", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });


      if (response.data.ack) {
        setGoodToStart(true);
      }

      setFilename(response.data.filepath);
      

    } catch (error) {
      console.log("Error uploading video!", error);
    }
  }

  //The below code has the web socket configuration which setups a bidirectional connection with the ai server
  const startSession = async() => {

    try {

        const response = await axios.post('http://localhost:8000/start-session', filename,{
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.ACK)
        {
          navigate('/session');
        }
        else
        {
          alert("There is something wrong!")
        }
    } catch (error) {
      console.log("Error sending the start session request.", error) 
    }
  };

  React.useEffect(()=>{
    socket_with_ai.emit('stop_thread');
  },[])


  const classes = useStyles();
  return (
    <div style={{backgroundColor:'#103557',height:'100vh',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      <div style={{marginTop:'26%',display:'flex',alignItems:'baseline'}}>
        <h1 style={{color:'#fff',fontSize:'80px',fontWeight:700}}>Gastro<span style={{color:'#3b94e5'}}>Genius</span></h1>
        <span style={{width:"12px",height:'12px',backgroundColor:"#3b94e5",borderRadius:'50%'}}></span>
      </div>
      <div style={{backgroundColor:'#fff',width:'450px', padding:'13px', height:'500px',justifyContent:'space-around'}} className="flex flex-col items-center">
        <h1 className='font-semibold text-2xl'>Please enter the details</h1>
        <TextField id="outlined-basic"
          label="Your Full Name"
          variant="outlined"
          className={classes.inputField}
          onChange={(e) => { setName(e.target.value) }}
        />

        <FormControl className={`${classes.inputField}`}>
          <InputLabel id="demo-simple-select-label" className='mt-0'>Diagnosis Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={diagnosis}
            label="Diagnosis Type"
            onChange={handleChange}
            className='mt-0'
          >

            <MenuItem value={diagnosisTypes[0]}>Endoscopy</MenuItem>
            <MenuItem value={diagnosisTypes[1]}>Colonoscopy</MenuItem>

          </Select>
        </FormControl>

        <Input type="file" accept="video/*,image/*" onChange={handleVideoInput} sx={{ marginTop: 0 }} ></Input>
        <FormGroup className=''>
          <FormControlLabel control={<Checkbox disabled={name ? (diagnosis ? false : true) : true} />} label="I want the system to save the footages of findings" />
        </FormGroup>
        <Button sx={style.root} className={`${classes.inputField}`} disabled={!goodToStart} variant="contained" onClick={startSession}>Start the session</Button>

      </div>
    </div>
    
  )
}

export default Register

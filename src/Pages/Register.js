import React from 'react'
import { TextField, Select,MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const useStyles = makeStyles(() => ({
  inputField: {
    width: '30%', 
  },
}));

const style = {
  root:{
    backgroundColor:"#92400E",
    marginTop:4,
    ':hover':{
      backgroundColor:"#92400E",
      boxShadow:"default"
    },
    boxShadow:'none',
  }
 }


function Register() {

  const diagnosisTypes = ["Endoscopy","Colonoscopy"];
  const [diagnosis, setDiagnosis] = React.useState('');
  const [name, setName] = React.useState('');

  const handleChange = (e) => {
    setDiagnosis(e.target.value);
  };


  const classes = useStyles();
  return (
    <div className = "flex flex-col items-center justify-center h-screen">
      <h1 className='mb-10 font-semibold text-4xl'>Please enter the details</h1>
      <TextField  id="outlined-basic"
        label="Your Full Name" 
        variant="outlined" 
        className={classes.inputField} 
        InputProps={{
          inputProps: {
            autocapitalize: 'words',
          },
          }}
        onChange={(e)=>{setName(e.target.value)}}
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

    <FormGroup className='mt-7'>
      <FormControlLabel control={<Checkbox disabled={name?(diagnosis?false:true):true}/>} label="I want the system to save the footages of findings" />
    </FormGroup>

    <Button sx = {style.root} className={`${classes.inputField}`}disabled = {name?(diagnosis?false:true):true} variant = "contained" onClick={{}}>Start the session</Button>
   
    </div>
  )
}

export default Register

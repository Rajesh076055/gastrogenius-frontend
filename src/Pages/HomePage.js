import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
function HomePage() {

    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/register-service');
      }
      

    const style = {
      root:{
        backgroundColor:"#92400E",
        ':hover':{
          backgroundColor:"#92400E",
          boxShadow:"default"
        },
        boxShadow:'none',
      }
     }
    
      
    return (
        <div className="flex flex-col items-center justify-center fixed inset-0 lg:flex-row lg:justify-around">
          <header className="flex flex-col items-center justify-center mb-20 lg:mb-0">
            <h1 className='text-5xl font-bold text-amber-800 lg:text-8xl'>GastroGenius</h1>
            <h4 className='text-center  lg:text-3xl lg:font-bold'>A real-time polyps localizing software</h4>
          </header>
    
          <div className ="">
            <Button sx = {style.root}  variant = "contained" onClick={handleStart}>Start the session</Button>
          </div>
          
        </div>


      );
}

export default HomePage

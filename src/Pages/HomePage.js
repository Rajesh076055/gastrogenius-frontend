import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import "../styles/HomePage.css"
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
      <div>
        <div className='__navbar__'>
          <div className='__headTitle__'>
            <span>Gastro</span><span style={{color:'#3B94E5'}}>Genius</span>
          </div>

          <div className='__headList__'>
            <ul>
              <li>About</li>
              <li>Developers</li>
              <li>Contact Us</li>
            </ul>
          </div>

        </div>
        <div className='__body__'>
          <div className='__bodyTitle__'>
            <h1>
              Where Innovation <br></br> meets Health!
            </h1>
            <p>AI that detects polyps in real time.</p>

            <div className='__bodyButtons__'>
              <button className='__bodyButton1__' onClick={handleStart}>Start</button>
              <button className='__bodyButton2__'>Read More</button>
            </div>
          </div>
          <div className='__bodyImage__'>
            <img src={require('../Images/Laptop.png')}/>
          </div>
        </div>
        <div className='__footer__'>

          <div className='__footerContent__'>
            <h1>Upload Your Footage</h1>
            <p>Select the video or pictures of colonoscopy or <br></br>
            endoscopy that you have. Our model will screen<br></br>
            for any polyps in the footage for you.</p>
          </div>

          <div className='__footerContent__'>
            <h1>Detect in Real Time</h1>
            <p>The application looks for any possible polyps in<br></br>
              the footage you provide. Stop anytime to further<br></br>
               analyze the findings.</p>
          </div>
          
          <div className='__footerContent__'>
            <h1>Save the Results in Your Device</h1>
            <p>You can save findings from the footages after <br></br>
            the session. Download the results in your<br></br>
            local device if you need.</p>
          </div>
        </div>
      </div>


      );
}

export default HomePage

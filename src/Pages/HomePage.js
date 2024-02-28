import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/HomePage.css"
import {motion} from 'framer-motion'
import About from './About'
function HomePage() {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const handleStart = () => {
        navigate('/register-service');
      }
            
    return (
      <div>
        <motion.div className='__navbar__'
        initial={{opacity:0}}
        animate={{opacity:1}}
        >
          <div className='__headTitle__' onClick={()=>{navigate('/')}}>
            <span>Gastro</span>
            <span style={{color:'#3B94E5'}}>Genius</span>
            {/* <span style={{fontSize:10}}>BETA</span> */}
          </div>

          <div className='__headList__'>
            <ul>
              <li onClick={()=>setIsOpen(true)}>About</li>
              <li onClick={()=>navigate('/developers')}>Developers</li>
              <li>Contact Us</li>
            </ul>
          </div>

        </motion.div>
        <motion.div className='__body__'
        initial={{opacity:0}}
        animate ={{opacity:1}}
        transition={{duration:0.4,ease:'easeOut'}}
        >
          <div className='__bodyTitle__'>
            <div>
              <motion.h1
              initial={{opacity:0,marginRight:'30px'}}
              animate={{opacity:1,marginRight:0}}
              transition={{duration:0.6, ease:'easeOut'}}
              >
                Where Innovation <br></br> meets Health!
              </motion.h1> 
            </div>
            <p>AI that detects polyps in real time.</p>

            <div className='__bodyButtons__'>
              <button className='__bodyButton1__' onClick={handleStart}>Start</button>
              <button className='__bodyButton2__' onClick={()=>setIsOpen(true)}>Read More</button>
            </div>
          </div>
          <motion.div className='__bodyImage__'
          initial={{scale:0, opacity:0}}
          animate={{scale:1, opacity:1}}
          transition={{duration:0.5,ease:'easeOut'}}
          >
            <img src={require('../Images/Laptop.png')} alt='LaptopImage'/>
          </motion.div>
        </motion.div>
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
              the footage you provide in real time. Stop anytime to<br></br>
              further analyze the findings.</p>
          </div>
          
          <div className='__footerContent__'>
            <h1>Save the Results in Your Device</h1>
            <p>You can save findings from the footages after <br></br>
            the session. Download the results in your<br></br>
            local device if you need.</p>
          </div>
        </div>

        <About props={{isOpen, setIsOpen}}/>
      </div>


      );
}

export default HomePage

import React, {useRef, useEffect, useState} from 'react';
import '../styles/Session.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useSocket } from '../Contexts/AppContext';

const Session = () => {
    
    const socket_with_ai = useSocket();
    const pauseRef = useRef(false);
    const framesRef = useRef([]);
    const indexRef = useRef(0);
    const img = new Image();
    const canvasRef = useRef(null);
    const [PauseOrPlay, setPauseOrPlay] = useState("Pause");

    socket_with_ai.emit("connect_with_frontend");

     // This function is called everytime we need to render frames on the screen.
     const renderFrame = (frame)=> {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        img.src = `data:image/jpeg;base64,${frame}`;

        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

      }
    }

    const handleCancel =()=> {
      

      socket_with_ai.emit('Unpause');
      socket_with_ai.emit('stop_thread');

      window.location.assign('/');
    }

    // This function is called everytime the spacebar is pressed.
    const handleKeyPress = ({ keyCode }) => {
      const isSpaceBar = keyCode === 32;
      const isLeftArrow = keyCode === 37;
      const isRightArrow = keyCode === 39;
    
      if (isSpaceBar) {
        if (pauseRef.current) {
          
          // This function starts rendering the frames
          // from the location where the user is currently. When user
          // backwards the player, and plays, the application should
          // start rendering from that particular frame

          // function processFrames() {
            
          //   // if (indexRef.current !== framesRef.current.length - 1)
          //   // {
          //   //   indexRef.current += 1;
          //   //   renderFrame(framesRef.current[indexRef.current]);

          //   //   setTimeout(processFrames, 50);
          //   // }
          //   // else
            
            
          // }

          pauseRef.current = false;
          setPauseOrPlay("Play");
          socket_with_ai.emit("Unpause");
          
          //processFrames();
        }
        
        else
        {
          pauseRef.current = true;
          setPauseOrPlay("Pause");
          socket_with_ai.emit("Pause");
          
        } 
        
        return;
      }
      
      if (pauseRef.current) {

        if (isLeftArrow && indexRef.current > 0) {
          indexRef.current -= 1;
          renderFrame(framesRef.current[indexRef.current]);
        }
      
        if (isRightArrow && indexRef.current !== framesRef.current.length - 1) {
          indexRef.current += 1;
          renderFrame(framesRef.current[indexRef.current]);
        }
      }
      
    };
    

    useEffect(()=>{
        socket_with_ai.on("Processed_Frame",(frame)=>{
          indexRef.current += 1;
          framesRef.current.push(frame);
          renderFrame(frame);
      })
    
        return ()=> {
          socket_with_ai.off("Processed_Frame");
        }
        
    },[socket_with_ai]);

    // We need to check if the user presses any keys during the session
    useEffect(() => {
      
      document.addEventListener('keydown', handleKeyPress);
  
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    

    return (
        <div className='__sessionPage__'>
            <div className='__sessionBody__'>
                <canvas ref={canvasRef} width={660} height={450}></canvas>
            </div>
            <div className='__sessionFooter__'>
              <div className='__sessionFooterContent__'>
                <div className='__sessionControlInfo__'>
                  <h1 id="header">Keyboard Controls</h1>
                  <ul>
                    <li>
                      Press <strong>Space </strong>key to <strong>Pause.</strong>
                    </li>
                    <li>
                      Press <strong>Left Arrow </strong>key to <strong>Back.</strong>
                    </li>
                    <li>
                      Press <strong>Right Arrow </strong>key to <strong>Forward.</strong>
                    </li>
                  </ul>
                </div>
                <div className='__sessionButtons__'>
                  <div>
                  <button id="button" onClick={() => handleKeyPress({ keyCode: 37 })}>Back</button>
                  <button id="button" onClick={() => handleKeyPress({ keyCode: 32 })}>{PauseOrPlay==="Pause"?<PlayArrowIcon/>:<PauseIcon/>}</button>
                  <button id="button" onClick={() => handleKeyPress({ keyCode: 39 })}>Forward</button>
                  </div>
                  <div>
                    <button id="button_">Feedback</button>
                    <button id="button_c" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
                <div className='__sessionDisclaimer__'>
                  <h1 id="header">Description</h1>
                  <h1 id="description">
                    The application is currently running in real time.<br></br>
                    The detection by the AI may differ from actual.<br></br>
                  </h1>
                </div>
              </div>
              <p>&copy; The Deep Learners. All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Session;

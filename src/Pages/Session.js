import React, {useRef, useEffect, useState} from 'react';
import '../styles/Session.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useSocket } from '../Contexts/AppContext';
import FeedbackBox from '../Components/FeedbackBox';
import { confirmSelection } from '../APIs/HTTPCalls';
import { useCanvasSize } from '../Contexts/AppContext';

const Session = () => {
    
    const socket_with_ai = useSocket();
    const { canvasSize } = useCanvasSize();
    const frameRef = useRef(null);
    const [boxes, setBoxes] = useState([]);
    const sessionColorRef = useRef("#000");
    const pauseRef = useRef(false);
    const buttonRefBack = useRef(null);
    const buttonRefForward = useRef(null);
    const buttonRefPlay = useRef(null);
    const [isFeedbackActive, setIsFeedbackActive] = useState(false);
    const img = new Image();
    const canvasRef = useRef(null);
    const canvasHeightPercent = 0.7;
    const [size, setSize] = useState({height: canvasHeightPercent * window.screen.availHeight,
       width:canvasSize.width * (canvasHeightPercent * window.screen.availHeight) / canvasSize.height});



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
      frameRef.current = frame;
    } 


    const handleFeedback =()=> {
      sessionColorRef.current = "#333";
      setIsFeedbackActive(true);
      socket_with_ai.emit("Pause");

    }


    const handleResetFeedback =()=> {
      sessionColorRef.current = '#000';
      setBoxes([]);
      setIsFeedbackActive(false);
      socket_with_ai.emit("Unpause");
    }


    const handleResize =()=> {
      setSize({
        height:canvasHeightPercent * window.screen.availHeight,
        width: canvasSize.width * (canvasHeightPercent * window.screen.availHeight) / canvasSize.height
      })

    }


    const handleSelections = async()=> {

      if (boxes.length === 0) 
      {
        alert("No boxes drawn.")
        return
      }

      const response = await confirmSelection(boxes);

      if (response.status === 200)
      {
        setBoxes([]);
        setIsFeedbackActive(false);
        pauseRef.current = false;
        sessionColorRef.current = '#000';
        socket_with_ai.emit("Unpause");
      }

    }

    const handleCancel =()=> {
      
      socket_with_ai.emit('Unpause');
      socket_with_ai.emit('stop_thread');

      window.location.assign('/register-service');
    }

    // This function is called everytime the spacebar is pressed.
    const handleKeyPress = ({ keyCode }) => {

      const isSpaceBar = keyCode === 32;
      const isLeftArrow = keyCode === 37;
      const isRightArrow = keyCode === 39;
    
      if (isSpaceBar) {
        if (pauseRef.current) {
          
          pauseRef.current = false;
          //setPauseOrPlay("Play");
          socket_with_ai.emit("Unpause");
        }
        
        else
        {
          pauseRef.current = true;
          //setPauseOrPlay("Pause");
          socket_with_ai.emit("Pause");
          
        } 
        
        return;
      }
      
       
      if (isLeftArrow) {
        pauseRef.current = true;
        //setPauseOrPlay("Pause");
        socket_with_ai.emit("Reverse");
      }
    
      if (isRightArrow) {
        pauseRef.current = true;
        //setPauseOrPlay("Pause");
        socket_with_ai.emit("Forward");
      }
      
      
    };


    useEffect(()=>{
        socket_with_ai.on("Processed_Frame",(frame)=>{
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
    }, [pauseRef.current, isFeedbackActive]);


    useEffect(()=>{
      
      window.addEventListener("resize", handleResize);

      return ()=> {
        window.removeEventListener("resize", handleResize);
      }

    },[window.screen.availHeight, size])
    

    return (
      <div className='__sessionPage__' style={{backgroundColor:sessionColorRef.current}}>
          <FeedbackBox isActive={isFeedbackActive} boundingBox={boxes} setBoundingBox={setBoxes} size={size}/>
          <div className='__sessionFooter__'>
            <div className='__sessionFooterContent__'>
              <div className='__sessionControlInfo__'>
                <h1 id="header">Keyboard Controls</h1>
                <ul>
                  <li>
                    1. Press <strong>Space </strong>key to <strong>Pause.</strong>
                  </li>
                  <li>
                    2. Press <strong>Left Arrow </strong>key to <strong>Back.</strong>
                  </li>
                  <li>
                   3. Press <strong>Right Arrow </strong>key to <strong>Forward.</strong><br></br>
                  </li>
                </ul>
              </div>
              <div className='__sessionButtons__'>
                <div>
                  {!isFeedbackActive && <button id="button_" onClick={handleFeedback}>Feedback</button>}
                  {isFeedbackActive && <button id="button_" onClick={handleSelections}>Confirm Selections</button>}
                  {isFeedbackActive && <button id="button_c" onClick={handleResetFeedback}>Cancel Feedback</button>}
                 {!isFeedbackActive && <button id="button_c" onClick={handleCancel}>Cancel Session</button>}
                </div>
              </div>
            </div>
          </div>

          <div className='__sessionBody__'>
              <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
          </div>

          <p style={{position:'fixed', color: '#fff', bottom:0, fontSize:12}}>&copy;The Deep Learners. All Rights Reserved.</p>
      </div>
    );
}

export default Session;

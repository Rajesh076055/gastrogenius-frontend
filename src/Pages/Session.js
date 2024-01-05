import React, {useRef, useEffect, useState} from 'react';
import '../styles/Session.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useSocket } from '../Contexts/AppContext';
import FeedbackBox from '../Components/FeedbackBox';
import { confirmSelection } from '../APIs/HTTPCalls';

const Session = () => {
    
    const socket_with_ai = useSocket();
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
    const [size, setSize] = useState({height:502,width:820});
    const [PauseOrPlay, setPauseOrPlay] = useState("Pause");


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

    }

    const handleResetFeedback =()=> {
      sessionColorRef.current = '#000';
      setBoxes([]);
      setIsFeedbackActive(false);
    }

    const handleSelections = async()=> {

      const response = await confirmSelection(boxes);

      if (response.status === 200)
      {
        setBoxes([]);
        setIsFeedbackActive(false);
        sessionColorRef.current = '#000';
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
        buttonRefPlay.current.blur();
        if (pauseRef.current) {
          
          pauseRef.current = false;
          setPauseOrPlay("Play");
          socket_with_ai.emit("Unpause");
        }
        
        else
        {
          pauseRef.current = true;
          setPauseOrPlay("Pause");
          socket_with_ai.emit("Pause");
          
        } 
        
        return;
      }
      
       
      if (isLeftArrow) {
        buttonRefBack.current.blur();
        pauseRef.current = true;
        setPauseOrPlay("Pause");
        socket_with_ai.emit("Reverse");
      }
    
      if (isRightArrow) {
        buttonRefForward.current.blur();
        pauseRef.current = true;
        setPauseOrPlay("Pause");
        socket_with_ai.emit("Forward");
      }
      
      
    };

    useEffect(()=>{
      socket_with_ai.on("size",(size)=> {

       setSize({
        height:502,
        width:size['width'] * 502 / size["height"]
       })
        

      })
    },[socket_with_ai])


    useEffect(()=>{
      renderFrame(frameRef.current);
    },[size])
    

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
    }, [PauseOrPlay]);

    

    return (
      <div className='__sessionPage__'>
          <FeedbackBox isActive={isFeedbackActive} boundingBox={boxes} setBoundingBox={setBoxes} size={size}/>
          <div className='__sessionBody__' style={{backgroundColor:sessionColorRef.current}}>
              <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
          </div>
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
                  <button id="button" onClick={() => handleKeyPress({ keyCode: 37 })} ref = {buttonRefBack}><SkipPreviousIcon/></button>
                  <button id="button" onClick={() => handleKeyPress({ keyCode: 32 })} ref = {buttonRefPlay}>
                  {PauseOrPlay==="Pause"?<PlayArrowIcon/>:<PauseIcon/>}</button>
                  <button id="button" onClick={() => handleKeyPress({ keyCode: 39 })} ref = {buttonRefForward}><SkipNextIcon/></button>
                </div>
                <div>
                  {!isFeedbackActive && <button id="button_" onClick={handleFeedback}>Feedback</button>}
                  {isFeedbackActive && <button id="button_" onClick={handleSelections}>Confirm Selections</button>}
                  {isFeedbackActive && <button id="button_c" onClick={handleResetFeedback}>Cancel Feedback</button>}
                 {!isFeedbackActive && <button id="button_c" onClick={handleCancel}>Cancel Session</button>}
                </div>
              </div>
              <div className='__sessionDisclaimer__'>
                <h1 id="header">Description</h1>
                {/* <h1 id="description">
                  The application is currently running in real time.<br></br>
                  The detection by the AI may differ from actual.<br></br>
                  Make sure to pause the session before you give a feedback. <br></br>
                  While under feedback, click anywhere within the canvas <br></br>to draw bounding box.
                </h1> */}
              </div>
            </div>
            <p>&copy; The Deep Learners. All Rights Reserved.</p>
          </div>
      </div>
    );
}

export default Session;

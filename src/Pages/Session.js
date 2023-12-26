import React, {useEffect} from 'react';
import '../styles/Session.css';
import { useSocket } from '../Contexts/SocketContext';

const Session = () => {
    
    const socket_with_ai = useSocket();
    socket_with_ai.emit("connect_with_frontend");

    const canvasRef = React.useRef(null);

    useEffect(()=>{
        socket_with_ai.on("Processed_Frame",(frame)=>{
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = `data:image/jpeg;base64,${frame}`;
    
            img.onload = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
             //sole.log("Frame has been applied at: ", currentTimeInSeconds);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
    
          }
      })
    
        return ()=> {
          //socket_with_ai.emit('stop_thread');  
          socket_with_ai.off("Processed_Frame");
        }
        
    },[socket_with_ai]);

    return (
        <div className='__sessionPage__'>
            <div className='__sessionBody__'>
                <canvas ref={canvasRef} width={660} height={450}></canvas>
            </div>
            <div className='__sessionFooter__'></div>
        </div>
    );
}

export default Session;

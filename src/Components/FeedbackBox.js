import React, { useEffect, useRef, useState } from 'react';
import LabelModal from './LabelModal';

const FeedbackBox = ({isActive, boundingBox, setBoundingBox, size}) => {

    const [box, setBox] = useState({
        x:0,
        y:0,
        width:0,
        height:0,
        display:"None",
        label:""
    })

    const [showModal, setShowModal] = useState(false);
    const [label, setLabel] = useState("");
    const [drawing, setDrawing] = useState(0);
    var adjustment_min = (960 - ((size['width'] * 502 / size['height']) / 2) - 200);
    var adjustment_max = adjustment_min + size['width'] * 502 / size['height'];
    const [mouseCord, setMouseCord] = useState({x:0,y:0});

    const handleEraseCurrent=(event)=> {
        if (event.key === "Escape")
        {
            setBox({
                x:0,
                y:0,
                width:0,
                height:0,
                display:'None',
                label:''
            })
            setDrawing(0);
        }
    }


    const handleBoxErase =(index)=> {
       
        if (index >= 0 && index < boundingBox.length) {
            const updatedboundingBox = [...boundingBox];
            updatedboundingBox.splice(index, 1); // Remove 1 element at the specified index
            setBoundingBox(updatedboundingBox);
            setDrawing(0);
            
        }

    }

    const handleClose=()=> {

        setShowModal(false);

    }


    const handleMouseDown=(event)=> {

        if(showModal) return;

        if (event.target.classList.contains('eraseButton')) {
            return;
        }

        if (!(event.clientX > adjustment_min
            && event.clientX < adjustment_max
            && event.clientY < 502
            )) return;

        if (!isActive) return;
        
        if (!drawing)
        {
            setDrawing((prev)=>prev+1);

            setBox({
                x:event.clientX,
                y:event.clientY,
                width:0,
                height:0,
                display:"block",
                label:''
            })
        }
       
        else if (drawing > 0 && drawing < 2)
        {

            setDrawing(0);
            setShowModal(true);
           
        }
    }

    const handleTypeConfirm =(type)=> {
        
        setBox((prev) => {
            const updatedBox = { ...prev, label: type };
            setBoundingBox((prev) => [...prev, updatedBox]);
    
            return {
                x: 0,
                y: 0,
                height: 0,
                width: 0,
                display: "None",
                label: "",
            };
        });
        setShowModal(false);
    }

    const handleCoordinates = (event) => {
        
        var width = event.clientX - box.x;
        var height = event.clientY - box.y;

        setMouseCord({x:event.clientX, y:event.clientY});

        if (drawing == 1) {


            if (event.clientX >= adjustment_max && event.clientY < 502) 
            {
                width = adjustment_max  - box.x;

            }

            else if (event.clientY >= 502 && event.clientX < adjustment_max)
            {
                height = 502 - box.y;
            }
           
            else if (event.clientX >= adjustment_max && event.clientY >= 502)
            {
                width = adjustment_max - box.x;
                height = 502 - box.y;
            }

            else 
            {
                width = event.clientX - box.x;
                height = event.clientY - box.y;
            }

            setBox({
                x:box.x,
                y:box.y,
                width:width,
                height:height,
                display:"block",
            })  
        }
    };
    
    useEffect(()=>{

        document.addEventListener("mousemove", handleCoordinates);
        document.addEventListener("mousedown", handleMouseDown );
        document.addEventListener("keydown", handleEraseCurrent);

        return () => {
            document.removeEventListener('mousemove', handleCoordinates);
            document.removeEventListener("mousedown", handleMouseDown );
            document.removeEventListener("keydown", handleEraseCurrent);
          };

    },[drawing, box, boundingBox, isActive]);


    return (
        <div>
        <LabelModal isOpen = {showModal} onConfirm={handleTypeConfirm} onClose={handleClose}/>
        {isActive && <div className='__feedbackCoordinateLine__' style={
            {   
                position:'absolute',
                border:'0.5px solid white',
                right:0,
                top:mouseCord.y,
                left:0,
                opacity:0.5
            }}>
        </div>}
        {isActive && <div className='__feedbackCoordinateLine__' style={
            {   
                position:'absolute',
                border:'0.5px solid white',
                top:0,
                bottom:0,
                left:mouseCord.x,
                opacity:0.5
            }}>
        </div>}
        {isActive && <div className='__feedBack__' style={
                {   
                    position:"absolute",
                    display:box.display,
                    left:box.x,
                    top:box.y,
                    width:box.width,
                    height:box.height,
                    border:"3px solid #3be56e"
                    
                }}>  
            </div>}
        {isActive && boundingBox.map((box_, index)=>{
                return (
                    <div key={index} className='__feedBack__' style={
                        {   
                            position:"absolute",
                            display:box_.display,
                            left:box_.x,
                            top:box_.y,
                            width:box_.width,
                            height:box_.height,
                            border:"3px solid #3be56e"
                            
                        }}>  
                          <div className='eraseButton' style={
                            {
                                borderRadius:50,
                                width:25,
                                height:"auto",
                                textAlign:'center',
                                backgroundColor:'#3c3f42',
                                color:"#fff",
                                opacity:0.8,
                                position:'absolute',
                                left:-12.5,
                                top:-12.5,
                                cursor:'pointer'
    
                            }}
                            onClick={()=>handleBoxErase(index)}
                            >
                            X
                        </div>
                        <div className='label' style={
                            {
                            backgroundColor:"#3be56e",
                            }}>{box_.label}</div>
                    </div>
                )
            })}
        </div>
    )

    
   
}

export default FeedbackBox;

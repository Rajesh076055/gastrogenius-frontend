import React from 'react';
import '../styles/Developers.css'
import {motion} from 'framer-motion'
const Developers = () => {
    return (
        <div className='__developerContent__'>
            <div className='__imageContent__'>
                <motion.div className='__imageContainer__'
                    initial={{scale:0, opacity:0}}
                    animate={{scale:1, opacity:1}}
                    transition={{duration:0.3,ease:'easeOut'}}
                    >
                        <img src={require('../Images/prat.jpg')}/>
                        <div className='__imageDescription__'>
                            <h1>Pratik Dahal</h1>
                            <h3>Computer Engineer</h3>
                        </div>
                </motion.div>
                <motion.div className='__imageContainer__'
                    initial={{scale:0, opacity:0}}
                    animate={{scale:1, opacity:1}}
                    transition={{duration:0.5,ease:'easeOut'}}
                    >
                        <img src={require('../Images/rahul.jpg')}/>
                        <div className='__imageDescription__'>
                            <h1>Rahul Kumar Jha</h1>
                            <h3>Computer Engineer</h3>
                        </div>
                </motion.div>
                <motion.div className='__imageContainer__'
                    initial={{scale:0, opacity:0}}
                    animate={{scale:1, opacity:1}}
                    transition={{duration:0.7,ease:'easeOut'}}
                    >
                        <img src={require('../Images/rajesh.jpg')}/>
                        <div className='__imageDescription__'>
                            <h1>Rajesh Neupane</h1>
                            <h3>Computer Engineer</h3>
                        </div>
                </motion.div>
            </div>
        </div>
    );
};



export default Developers;

import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const SocketProvider = ({ children, value }) => {
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

const NameContext = createContext();

export const NameProvider = ({children})=> {
  const [name, setName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  return <NameContext.Provider value={{name, setName, diagnosis, setDiagnosis}}>{children}</NameContext.Provider>
}

const CanvasSizeContext = createContext();

export const CanvasSizeProvider = ({ children }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  return (
    <CanvasSizeContext.Provider value={{ canvasSize, setCanvasSize }}>
      {children}
    </CanvasSizeContext.Provider>
  );
};


export const useCanvasSize = () => {
  return useContext(CanvasSizeContext);
};

export const useName =()=> {
  return useContext(NameContext);
}

export const useSocket = () => {
  return useContext(SocketContext);
};


import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const SocketProvider = ({ children, value }) => {
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};


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

export const useSocket = () => {
  return useContext(SocketContext);
};


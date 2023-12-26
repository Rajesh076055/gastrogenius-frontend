import React, { createContext, useContext } from 'react';

const SocketContext = createContext();

export const SocketProvider = ({ children, value }) => {
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  return useContext(SocketContext);
};

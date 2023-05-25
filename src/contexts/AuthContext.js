import React, { createContext, useContext } from 'react';
import Proptypes from 'prop-types';
import usePersistedState from './usePersistedState'
import io from 'socket.io-client'
import { endpoint } from '../api/api';

const socket = io.connect(endpoint);
  
const AppContext = createContext();
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw Error('useAppContext must be used in AppContextProvider')
    return context;
};
  
export const AppContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = usePersistedState('isLoggedIn', false);
    const [user, setUser] = usePersistedState('user', {});
    const [room, setRoom] = usePersistedState('currentRoom', '');

    return (
        <AppContext.Provider value={{ socket, isLoggedIn, setIsLoggedIn, user, setUser, room, setRoom }}>
            {children}
        </AppContext.Provider>
    );
};
  
AppContextProvider.propTypes = {
    children: Proptypes.node.isRequired,
};
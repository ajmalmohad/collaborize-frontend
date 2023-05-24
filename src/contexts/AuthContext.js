import React, { createContext, useContext } from 'react';
import Proptypes from 'prop-types';
import usePersistedState from './usePersistedState'
  
const AppContext = createContext();
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw Error('useAppContext must be used in AppContextProvider')
    return context;
};
  
export const AppContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = usePersistedState('isLoggedIn', false);
    const [user, setUser] = usePersistedState('user', {});

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};
  
AppContextProvider.propTypes = {
    children: Proptypes.node.isRequired,
};
import React from 'react';

//donne la forme du context mais pas les informations
export default React.createContext({
    isAutenticated: false,
    setIsAuthenticated: (value) => {}
});
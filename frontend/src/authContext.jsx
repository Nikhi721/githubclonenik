import { useState, useEffect,useContext, createContext } from 'react';
import PropTypes from 'prop-types';
const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setCurrentUser(userId);
        }
    }, []);

    const value = {
        currentUser, setCurrentUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [userValidated, setUserValidated] = useState(true);
    const [loading, setLoading] = useState(true);

    const login = async ({ email, password }) => {
        try {
            const response = await api.post('/sessions', { email, password });

            const { user } = response.data;

            localStorage.setItem('@athena:user', JSON.stringify(user));
            setData({ user }); 
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('@athena:user'); 
        setData({});
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('@athena:user');

        async function validateUser() {
            await api.get('/users/validate').catch(error => {
                if (error.response?.status === 401) {
                    console.log("Usuário inválido");
                    setUserValidated(false);
                    logout();
                }
            });
            setLoading(false);
        }

        if (storedUser) {
            validateUser(); 
        } else {
            setLoading(false); 
        }

        if (storedUser && userValidated) {
            setData({ user: JSON.parse(storedUser) });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user: data.user,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

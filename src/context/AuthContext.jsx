import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState({}); // Armazena os dados do usuário
    const [userValidated, setUserValidated] = useState(true); // Estado para validar o usuário
    const [loading, setLoading] = useState(true); // Estado para verificar se a autenticação foi carregada

    // Função de login
    const login = async ({ email, password }) => {
        try {
            const response = await api.post('/sessions', { email, password });
            const { user } = response.data;

            localStorage.setItem('user', JSON.stringify(user)); // Armazena o usuário no localStorage
            setData({ user }); // Atualiza o estado com os dados do usuário
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    // Função de logout
    const logout = () => {
        localStorage.removeItem('user'); // Remove o usuário do localStorage
        setData({}); // Limpa os dados do usuário no estado
    };

    // Verifica se o usuário está logado quando a página recarrega
    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        async function validateUser() {
            await api.get('/users/validate').catch(error => {
                if (error.response?.status === 401) {
                    console.log("Usuário inválido");
                    setUserValidated(false);
                    logout(); // Logout se o usuário não for válido
                }
            });
            setLoading(false); // Indica que a validação foi concluída
        }

        if (storedUser) {
            validateUser(); // Valida o usuário armazenado
        } else {
            setLoading(false); // Se não houver usuário, a validação ainda é concluída
        }

        if (storedUser && userValidated) {
            setData({ user: JSON.parse(storedUser) }); // Restaura o usuário salvo
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

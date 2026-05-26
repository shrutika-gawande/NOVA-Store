import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.user, token: action.token, loading: false };
    case 'LOGOUT':   return { user: null, token: null, loading: false };
    case 'LOADING':  return { ...state, loading: true };
    default: return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null, token: localStorage.getItem('nova_token'), loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('nova_token');
    if (!token) { dispatch({ type: 'LOGOUT' }); return; }
    axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => dispatch({ type: 'SET_USER', user: data.user, token }))
      .catch(() => { localStorage.removeItem('nova_token'); dispatch({ type: 'LOGOUT' }); });
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('nova_token', data.token);
    dispatch({ type: 'SET_USER', user: data.user, token: data.token });
    return data.user;
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password });
    localStorage.setItem('nova_token', data.token);
    dispatch({ type: 'SET_USER', user: data.user, token: data.token });
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('nova_token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

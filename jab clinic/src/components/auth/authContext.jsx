import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
 
 
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (user) => setLoggedInUser(user);
  const logout = () => setLoggedInUser(null);

  return (
  <AuthContext.Provider value={{ loggedInUser, login, logout }}>
    {children}
  </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

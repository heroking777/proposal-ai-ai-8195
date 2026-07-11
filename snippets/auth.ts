import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any; // Adjust the type based on your user data structure
}

const useAuth = (): [AuthState, (token: string) => void, () => void] => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthState({
        isAuthenticated: true,
        token,
        user: jwtDecode(token),
      });
    }
  }, []);

  const login = (token: string): void => {
    localStorage.setItem('jwtToken', token);
    setAuthState({
      isAuthenticated: true,
      token,
      user: jwtDecode(token),
    });
  };

  const logout = (): void => {
    localStorage.removeItem('jwtToken');
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  };

  return [authState, login, logout];
};

export default useAuth;
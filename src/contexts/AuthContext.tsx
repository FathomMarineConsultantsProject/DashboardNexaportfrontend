import { createContext, useState, type ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Try to fetch user from refresh token on mount
  // 📄 Is tarah se update karo AuthContext.tsx ka useEffect block:
useEffect(() => {
  const fetchUser = async () => {
    try {
      // 🛠️ FIX: validateStatus property add karo taaki 401 ko browser red error na banaye
      const res = await axios.post(
        '/api/auth/refresh-token', 
        {}, 
        { 
          withCredentials: true,
          validateStatus: (status) => {
            // Agar status 200 (logged in) ya 401 (guest) hai toh dono ko normal handle karo
            return status === 200 || status === 401; 
          }
        }
      );

      // Agar status 401 aaya hai toh chupchaap guest treat karo, red log nahi banega
      if (res.status === 401) {
        setUser(null);
        setToken(null);
        return;
      }

      // Agar 200 aaya toh user login state restore karo
      setUser(res.data.user);
      setToken(res.data.token);
      
      if (res.data.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
    } catch {
      // Kisi bhi anya real server down (500) error ke liye fallback
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };
  
  fetchUser();
}, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
    setUser(res.data.user);
    setToken(res.data.token);
    
    // Set dynamic authentication headers
    if (res.data.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    }

    // Redirect user dynamically based on context schema role
    if (res.data.user.role === 'INSPECTOR') navigate('/inspector/dashboard');
    else if (res.data.user.role === 'SHIPOWNER') navigate('/shipowner/dashboard');
    else navigate('/');
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout request failure:", err);
    } finally {
      setUser(null);
      setToken(null);
      delete axios.defaults.headers.common['Authorization'];
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

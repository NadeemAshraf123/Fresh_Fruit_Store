import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface Props {
  loggedUser: any;
  onLogout: () => void;
}
const LoginButton: React.FC<{ loggedUser: any; onLogout: () => void }> = ({ loggedUser, onLogout  }) => {
  const navigate = useNavigate();

  return loggedUser ? (
    <button
    style={{backgroundColor:'transparent',border:'none',fontSize:'14px',fontWeight:'bold',marginBottom:'9px',cursor:'pointer'}}
      onClick={() => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('isAuthenticated');
        onLogout();
        navigate('/login');                      
      }}
    >
      Logout
    </button>
  ) : (
    
    <Link to="/login">
      <button style={{background:'transparent', border:'none', fontSize:'14px',fontWeight:'bold',cursor:'pointer'}}>
        Login
      </button>
    </Link>
  );
};

export default LoginButton;

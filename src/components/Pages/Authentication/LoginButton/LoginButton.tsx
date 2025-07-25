import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface Props {
  loggedUser: any;
}

const LoginButton: React.FC<Props> = ({ loggedUser }) => {
  const navigate = useNavigate();

  return loggedUser ? (
    <button
    style={{backgroundColor:'transparent',border:'none',fontSize:'14px',fontWeight:'bold',marginBottom:'9px'}}
      onClick={() => {
        localStorage.removeItem('loggedInUser');
        navigate('/loginpage');                      
      }}
    >
      Logout
    </button>
  ) : (
    
    <Link to="/loginpage">
      <button style={{background:'transparent', border:'none', fontSize:'14px',fontWeight:'bold'}}>Login</button>
    </Link>
  );
};

export default LoginButton;

import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Authentication.module.css'


const LoginButton = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/LoginPage');
    };

  return (

    <button 
    onClick={handleLoginClick}
    className={styles.L_button}
    >
        Login
    </button>
    
  )
}

export default LoginButton
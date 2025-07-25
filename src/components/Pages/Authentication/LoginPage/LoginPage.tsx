import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
// import main from '../../assets/fruits/main.jpg';
import './LoginPage.css';

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null >(null);

  const navigate = useNavigate();
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const emailResponse = await fetch(`http://localhost:3000/users?email=${email}`);
      const matchedUsers = await emailResponse.json();

      if (matchedUsers.length === 0) {

        setMessage("Email not found. Please sign up first..");
        setMessageType('error');

        setTimeout(() => {
          navigate("/signuppage");
        }, 1500);
        return;
      }

      const user = matchedUsers[0];
       if (user.password !== password) {
        setMessage("Invalid password...");
        setMessageType("error");
        return;
       }
       setMessage("Login successful!");
       setMessageType("success");

       localStorage.setItem("loggedInUser" , JSON.stringify(user));

       setTimeout(() => {
        navigate("/");
       }, 1000);
  } catch (error) {
    setMessage("Login failed. Please try again...");
    setMessageType('error');
    console.log("Login error:", error);
  }
  };



  return (
    <div className="login-container">
      <div 
        className="background-blur"
        style={{ 
        //   backgroundImage: `url(${main})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      <div className="content-overlay">
        <div className="login-card">
          <h2 className="login-title">Login</h2>

          {message && (
            <p className={`message ${messageType === 'error' ? 'error' : "success"}`}>
              {message}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button" >
              LogIn
            </button>
          </form>

          <div className="login-footer">
            <p className="signup-text">
              Don't have an account? <Link to="/signuppage" className="signup-link"> Sign up </Link>
            </p>
            <p> <Link to='/' className="home-button-navigation">  Home  </Link> </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
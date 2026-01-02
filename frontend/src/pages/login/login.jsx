import React,{useState} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../util/authContext';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user, pwd:password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token via context
        login(data.token);
        console.log('Login successful!');
        navigate('/', { replace: true });
      } else {
        console.log(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="loginContainer">
      <div className="username">
        <input type="text" placeholder='username' onChange={(e)=>setUser(e.target.value)}/>
      </div>
      
      <div className="pwd">
        <input type="password"  placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        <div className="forgetPwd"><a href='#'>forgot password?</a></div>
        
      </div>
      

      <div className="btnContainer">
        <button className="primary" onClick={handleLogin} disabled={loading}>
        {loading ? 'Authenticating...' : 'Sign In Now'}
      </button>
        <button className="register" onClick={() => navigate('/register')}>sign up</button>
      </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import './register.css'
import { useAuth } from '../../util/authContext';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async ()=>{
        setLoading(true);
        try {
            // Call the register endpoint
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: user, pwd:password }),
            });
            const data = await response.json();

            if(response.ok){
                // If the API returns a token on registration, use it
                if (data.token) {
                  login(data.token);
                  navigate('/', { replace: true });
                } else {
                  // Otherwise try to login immediately
                  const loginRes = await fetch('http://localhost:5000/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user: user, pwd:password }),
                  });
                  const loginData = await loginRes.json();
                  if (loginRes.ok && loginData.token) {
                    login(loginData.token);
                    navigate('/', { replace: true });
                  } else {
                    console.log('Registration succeeded but automatic login failed.');
                  }
                }

                console.log('sign up successful!');
            }else{
                console.log(data.message || "sign up failed");
            }
        } catch (error) {
            console.error('Error signing up:', error);
        } finally {
          setLoading(false);
        };
    }


    return (
        <div className="registerContainer">
          <div className="username">
            <input type="text" placeholder='username' onChange={(e)=>setUser(e.target.value)}/>
          </div>
          <div className="pwd">
            <input type="password"  placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          <div className="btnContainer">
            <button className="primary" onClick={handleRegister} disabled={loading}>
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
            <button onClick={()=>navigate('/login')}>Back to Login</button>
          </div>
        </div>
    )
}

export default Register
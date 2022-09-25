import './register.css'
import {Link} from 'react-router-dom'
import register from '../../images/register.jpg'
import { useState } from 'react'
import axios from 'axios'

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login")
    } catch (err) {
      setError(true);
    }
  }
  return (
    <div className='register'>
      <div className="left">
        <div className="registerImage">
            <img src={register} alt="" className="registerPageImage" />
        </div>
        <div className="secondImage"></div>
      </div>
      <div className="right">
        <div className="registerRightArea">
        <Link className='link' to='/login'>
        <div className="loginPageButton">Login</div>
        </Link>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder='Enter your name'
            onChange={e => setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" placeholder='Enter your email'
            onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input type="password" placeholder='Enter your password'
              onChange={e => setPassword(e.target.value)}
            />
            <button className="registerPageButton" type='submit'>Register</button>
            {error && <p>User Already in use</p>}
        </form>
        </div>
      </div>
    </div>
  )
}

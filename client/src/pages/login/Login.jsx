import './login.css'
import {Link} from 'react-router-dom'
import login from '../../images/login.jpg'
import { useRef } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import {LoginSuccess, LoginStart, LoginFailure } from '../../context/Actions'
import axios from 'axios'
export default function Login() {

  const userRef = useRef()
  const passwordRef = useRef()

  const {dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch(LoginStart())
    try {
      const res = await axios.post("/auth/login", {username: userRef.current.value, password: passwordRef.current.value})
      dispatch(LoginSuccess(res.data))
    } catch (err) {
      dispatch(LoginFailure())
    }
  }
  return (
    <div className='login'>
      <div className="left">
        <div className="loginImage">
            <img src={login} alt="" className="loginPageImage" />
        </div>
        <div className="secondImage"></div>
      </div>
      <div className="right">
        <div className="rightArea">
        <Link className='link' to='/register'>
        <div className="registerButton">Register</div>
        </Link>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder='Enter your username' ref={userRef}/>
            <label>Password</label>
            <input type="password" placeholder='Enter your password' ref={passwordRef}/>
            <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
            <p>Don't have an account? Register</p>
        </form>
        </div>
      </div>
    </div>
  )
}

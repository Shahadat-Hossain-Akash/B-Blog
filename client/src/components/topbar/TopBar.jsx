import './topbar.css'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { Context } from '../../context/Context'
import { LogOut } from '../../context/Actions';
import person from '../../images/User.png'

export default function TopBar() {
    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/image/"

    const handleLogOut = () =>{
        dispatch(LogOut())
    }

    return (
        <div className='top'>
            <div className="topLeft">
                <Link className='link' to='/'>
                    <p>B Blog</p>
                </Link>
            </div>

            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className='link' to='/'>Home</Link>
                    </li>
                    <li className="topListItem">
                        <Link to='/about' className='link'>About</Link>
                    </li>
                    <li className="topListItem">
                        <Link to='/contact' className='link'>Contact</Link>
                    </li>
                    <li className="topListItem">
                        <Link to='/write' className='link'>Post</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogOut}>{user && "Logout"}</li>
                </ul>
            </div>
            <div className="topRight">
                <form className='searchBox' id='demo-2'><input type="text" placeholder='search'/>
                    <button className="submit">Search</button>
                </form>
                
                {

                    user
                        ? ( <Link to='/settings'>
                            <img
                                className='profile'
                                src={user.profilePicture === "" ? person : PF+user.profilePicture}
                                alt=""/>
                                </Link>
                        )
                        : (
                            <ul className='topList'>
                                <Link
                                    to='/login'
                                    className='link'
                                    style={{
                                        margin: "0px 40px"
                                    }}>
                                    <li className='topListItem'>Login</li>
                                </Link>
                                <Link to='/register' className='link'>
                                    <li className='topListItem'>Register</li>
                                </Link>
                            </ul>
                        )
                }
            </div>
        </div>
    )
}

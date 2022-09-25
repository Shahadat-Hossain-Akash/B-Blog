import './settings.css'
import {Context} from '../../context/Context'
import {useContext, useState} from 'react'
import del from '../../images/Delete.png'
import person from '../../images/User.png'
import axios from 'axios'
import {LoginFailure, LoginStart, UpdateFailure, UpdateStart, UpdateSuccess} from '../../context/Actions'

export default function Settings() {
    const PF = "http://localhost:5000/image/"
    const {user, dispatch} = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file
                .name
                data
                .append("name", filename)
            data.append("file", file)
            updatedUser.profilePicture = filename
            try {
                await axios.post("/upload", data)

            } catch (err) {}
        }
        try {

            await axios.put("/users/" + user._id, updatedUser)
            setSuccess(true)
        } catch (err) {}
    }
    const handleDelete = async (e) => {
        dispatch(LoginStart())
        try {

            await axios.delete("/users/" + user._id, {
                data: {
                    userId: user._id
                }
            })
            dispatch(LoginFailure())
        } catch (err) {}
    }
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="updateTitle">
                        <b>Update account</b>
                    </span>
                    <span className="deleteAccount">
                        Delete account
                        <img src={del} alt="" className="deleteIcon" onClick={handleDelete}/>
                    </span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <div className="labelPicture">
                        <label>Profile picture</label>
                        <div className="settingsPP">
                            <img
                                src={file
                                    ? URL.createObjectURL(file)
                                    : (
                                        user.profilePicture === ""
                                            ? person
                                            : PF + user.profilePicture
                                    )}
                                alt=""
                                className="profileImage"/>
                            <label htmlFor="fileInput">
                                <div className="userArea">
                                    <img src={person} alt="" className="userImage"/>
                                </div>
                            </label>
                            <input
                                type="file"
                                id='fileInput'
                                className="user"
                                style={{
                                    display: 'none'
                                }}
                                onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                    </div>
                    <label >Username</label>
                    <input
                        className='name'
                        type="text"
                        placeholder={user.username}
                        onChange={e => setUsername(e.target.value)}/>
                    <label >Email</label>
                    <input
                        className='name'
                        type="text"
                        placeholder={user.email}
                        onChange={e => setEmail(e.target.value)}/>
                    <label >Password</label>
                    <input
                        className='name'
                        type="password"
                        placeholder='****'
                        onChange={e => setPassword(e.target.value)}/>
                    <button className="settingsSubmit" type='submit'>Update</button>
                    {success && (<span className='updated'>Profile has been updated</span>)}
                </form>
            </div>
        </div>
    )
}

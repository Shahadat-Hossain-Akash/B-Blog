import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import './singlepost.css'
import edit from '../../images/Edit.png'
import del from '../../images/Delete.png'
import { Context } from '../../context/Context'

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/image/"
    const {user}  = useContext(Context)
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const handleDelete =async (e) => {
        try {
            
            await axios.delete(`/posts/${post._id}`,{ data:{username:user.username}})
            window.location.replace("/")
        } catch (err) {
            
        }
    }
    
    useEffect(() => {
        const getPost = async () =>{
            const res = await axios.get(`/posts/${path}`)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    }, [path])

    const handleUpdate = async () => {
        try {
        await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
        });
        setUpdateMode(false)
        } catch (err) {}
    };

    return (
        <div className='singlePost'>
            <div className="singleImage">
            {post.photo && (
                <img
                    src= {PF +post.photo}
                    alt=""
                    className="coverImage"/>
                    )}
            </div>
            <div className="wrapper">
                <div className="singleTitle">
                {updateMode ? <input className='singleTitleInput' type="text" value={title} autoFocus onChange={(e) => setTitle(e.target.value)}/>: (
                    <h1 className='textTitle'>{post.title}
                    {post.username === user?.username && (
                    <div className="singleButton">
                        <button className="modify" onClick={() => setUpdateMode(true)}><img
                            className='modifyImage'
                            src={edit}
                            alt=""/></button>
                        <button className="modify" onClick={handleDelete}><img
                            className='modifyImage'
                            src={del}
                            alt=""/></button>
                    </div>
                    )}
                    </h1>
                    )}
                </div>
                <div className="singleInfo">
                    <span className="info">Author:
                    <Link className='link' to={`/?user=${post.username}`}>
                        <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="info">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <textarea className='singleDetailsInput' value={desc} onChange={(e) => setDesc(e.target.value)}/> : (
                <p className="singleDetails">
                    {post.desc}
                </p>
                )}
                {updateMode && (
                <button className='updateButton' onClick={handleUpdate}>Update</button>
                )}
            </div>
        </div>
    )
}

import Footer from '../../components/footer/Footer'
import './writePost.css'
import add from '../../images/add.png'
import { useContext, useState } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context'

export default function WritePost() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const {user}  = useContext(Context)
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const newPost = {
            username: user.username,
            title,
            desc,
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename
        try {
            await axios.post("/upload", data)
        } catch (err) {
            
        }
    }
    try {
        
        const res = await axios.post("/posts", newPost)
        window.location.replace("/post/" + res.data._id)
    } catch (err) {
        
    }
    }
    return (
        <div className='writePost'>
            <div className="sideText">
                <p className="textLine">
                    ☆ New Day ☆ New Blog ☆ New Day ☆ New Blog ☆ New Day ☆ New Blog ☆ New Day ☆ New
                    Blog ☆ New Day ☆ New Blog ☆ New Day ☆ New Blog ☆ New Day ☆ New Blog ☆ New Day ☆
                    New Blog ☆ New Day ☆ New Blog ☆ New Day ☆ New Blog ☆ New Day ☆ New Blog ☆ New
                    Day ☆ New Blog ☆ New Day ☆ New Blog ☆ New Day ☆ New Blog ☆ New Day ☆ New Blog ☆
                    New Day ☆ New Blog ☆
                </p>
            </div>
            {file && (
            <img src={URL.createObjectURL(file)} alt="" className="writePostImage"/>)}
            <form className="writePostForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <input type="text" placeholder='Title' className='writeTitle' autoFocus={true} onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="fileInput" className='label'>
                        <img src={add} alt="" className='formImage'/>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{
                            display: 'none'
                        }}
                            onChange={(e) => setFile(e.target.files[0])}
                        /> 
                </div>
                <div className="formGroup">
                    <textarea type='text' placeholder='Write your story' className="formArea" onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <button className="writeSubmit" type='submit' >Publish</button>
            </form>
            <Footer/>
        </div>
    )
}

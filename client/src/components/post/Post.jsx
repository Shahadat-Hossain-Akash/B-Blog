import './post.css'
import {Link} from 'react-router-dom'

export default function Post({post}) {
    const PF = "http://localhost:5000/image/"
    return (
        <div className='post'>
            {post.photo && (<img className='postImage' src={PF + post.photo} alt=""/>)}
            <div className="postInfo">
                <div className="postCategory">
                    {
                        post
                            .categories
                            .map((c) => (<span className="category">{c.name}</span>))
                    }
                </div>
                <Link className='link' to={`/post/${post._id}`}>
                    <span className="postTitle">{post.title}</span>
                </Link>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                <span className="postDetails">{post.desc}</span>
            </div>
        </div>

    )
}

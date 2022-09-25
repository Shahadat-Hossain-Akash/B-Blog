import './home.css'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Footer from '../../components/footer/Footer'
import HomeSidebar from '../../components/homeSidebar/HomeSidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
        const fetchPosts = async () =>{
            const res = await axios.get("/posts"+ search)
            setPosts(res.data)
        }
        fetchPosts()
    }, [search])
    return (
        <> < Header /> <div className='home'>
            <Posts posts={posts}/>
            <HomeSidebar/>
        </div>
        <div className="footerPage">
            <Footer/>
        </div>
    </>
    )
}

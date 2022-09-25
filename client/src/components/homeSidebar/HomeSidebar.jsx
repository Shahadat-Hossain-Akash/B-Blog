import './homeSidebar.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import about from '../../images/about.jpg'
import { Link } from 'react-router-dom'

export default function HomeSidebar() {
    const [cat, setCat] = useState([])

    useEffect(() => {
        const getCat = async () => {
            const res = await axios.get("/categories")
            setCat(res.data)
        }
        getCat()
    }, [])
    return (
        <div className='homeSidebar'>
            <div className="secondSidebar">
                <div className="sidebarItem">
                    <span className="sidebarTitle">ABOUT ME</span>
                    <img
                        className='about'
                        src={about}
                        alt=""/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla pretium
                        sit feugiat. Eros, arcu urna lacus, quis non vel a, consequat blandit. Nullam
                        sit mauris viverra placerat tempor, aenean cras egestas volutpat. Sapien
                        phasellus.</p>
                </div>
                <div className="sidebarItem">
                    <span className="sidebarTitle">Categories</span>
                    <ul className="sidebarList">
                        {cat.map(c => (
                            <Link className='link' to={`/?cat=${c.name}`}>
                            <li className="sidebarListItem" key={c._id}>{c.name}</li>
                            </Link>
                            ))}
                            
                    </ul>
                </div>
            </div>
        </div>
    )
}

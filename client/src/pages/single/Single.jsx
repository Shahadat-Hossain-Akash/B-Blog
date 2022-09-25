import Footer from "../../components/footer/Footer"
import Sidebar from "../../components/sidebar/Sidebar"
import SinglePost from "../../components/singlePost/SinglePost"
import "./single.css"

export default function Single() {
  return (
    <div className="single">
        <SinglePost/>
        <Sidebar/>
        <Footer/>
    </div>
  )
}

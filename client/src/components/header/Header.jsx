import './header.css'
import cover from '../../images/covercolor.png'

export default function Header() {
  return (
    <div className='header'>
      <div className="headerTitle">
      <div className="glass"></div>
        <span className="title">B Blog</span>
      </div>
      <div className="image">
      <img className='cover' src={cover} alt="" />
      </div>
    </div>
  )
}

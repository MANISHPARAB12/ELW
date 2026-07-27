import { Link } from 'react-router-dom'
import '../App.css'


export const Navbar = () => {
    return (
            <nav>
                <h2 className='h2logo'>
                    <Link to="/" className='logo'>ELW</Link>
                </h2>
                <ul>
                <li><Link to="/" className='nav-links'>Home</Link></li>
                <li><Link to="/MyBorrow" className='nav-links'>MyBorrow</Link></li>
                <li><Link to="/Login" className='nav-links'>Login</Link></li>
                <li><Link to="/Contact" className='nav-links'>Contact</Link></li>
                </ul>
            </nav>
    )
}
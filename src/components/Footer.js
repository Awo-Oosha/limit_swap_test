import '../assets/css/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer className="Footer">
            <div className='container'>
            <ul className="footer-nav me-auto mb-2 mb-lg-0">
                        <li className="footer-nav-item">
                        <Link to='/ecosystem' className="nav-link">Ecosystem</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to='/community' className="nav-link">Community</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to='/governance' className="nav-link">Governance</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to='/developers' className="nav-link">Developers</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to='/blog' className="nav-link">Blog</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to='/faq' className="nav-link">FAQ</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to='/jobs' className="nav-link">Jobs</Link>
                        </li>
            </ul>
            <ul className='footer-social-icons'>
                <li><ion-icon name="logo-instagram"></ion-icon></li>
                <li><ion-icon name="logo-facebook"></ion-icon></li>
                <li><ion-icon name="logo-linkedin"></ion-icon></li>
                <li><ion-icon name="logo-twitter"></ion-icon></li>
            </ul>
            </div>
        </footer>
    )
}


export default Footer;
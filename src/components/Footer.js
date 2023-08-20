import {Link} from "react-router-dom";


function Footer(){
    return(
        <footer className="Footer">
            <div className='container'>
                <div className="navbar-brand d-lg-none d-md-none">LimitSwap</div>
                <ul className=" footer-nav">
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
                <div className='footer-social-icons d-sm-flex justify-content-center'>
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-facebook"></ion-icon>
                    <ion-icon name="logo-linkedin"></ion-icon>
                    <ion-icon name="logo-twitter"></ion-icon>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
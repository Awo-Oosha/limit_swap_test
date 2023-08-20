import { Link, useLocation } from 'react-router-dom';
import {useEffect, useRef} from "react";

function Header(){
    let HomepageNav = ['Ecosystem', 'Communities', 'Governance', 'Developers', 'Blog', 'FAQ', 'Jobs'];


    //location
    const location = useLocation()
    const locationRef = useRef(null)

    useEffect(() => {
        if (location.pathname === '/launch') {
            locationRef.current.style.position = 'relative'
        } else {
            locationRef.current.style.position = 'fixed'
        }
    }, [location]);


    return(
        <header className='header' ref={locationRef}>
            <nav className="navbar navbar-expand-lg large">

                <div className="container d-sm-flex justify-content-sm-start">

                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <ion-icon name="menu-sharp"></ion-icon>
                    </button>

                    <div className="navbar-brand">LimitSwap</div>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {location.pathname === '/' &&
                            <div className="nav-con">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {HomepageNav.map((nav, index) => (
                                        <li className="nav-item" key={index}>
                                            <Link className='nav-link' to={`/${nav.toLowerCase()}`}>
                                                {nav}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="right-header">
                                    <Link className='launchBtn-link' to='/launch'>
                                        <button className='launchBtn' >Launch App</button>
                                    </Link>
                                </div>
                            </div>
                        }

                    </div>


                </div>
            </nav>
        </header>
    );
}

export default Header;


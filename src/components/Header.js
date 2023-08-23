import { Link, useLocation } from 'react-router-dom';
import { useRef, useContext} from "react";
import { Context } from '../App';
import '../assets/css/Header.css';

import eth_logo from '../assets/images/app/Eth_icon.svg'


function Header(props){

    // ********* Navigation Lists
    let HomepageNav = ['Ecosystem', 'Communities', 'Governance', 'Developers', 'Blog', 'FAQ', 'Jobs'];
    let LaunchAppNav = ['Exchange', 'Documentation', 'Announcements'];

    //location
    const location = useLocation();
    // ************* Navbar-Menu Toggle ************************ //
    
    const navbarMenuToggler = useRef('')
    const navbarMenu = useRef('')
    const navbarClick = () => {
        navbarMenu.current.classList.contains('active') ? navbarMenu.current.classList.remove("active") : navbarMenu.current.classList.add("active")
    }

    // ************** (Global States); ************* //
    const {
      chartToggle,
      isToggled,
      
      openModalWalletClick,
      accountAddress,
        isConnected,
    } = useContext(Context);

    return(
        <header className='header'>
            <nav className="mynavbar">
                <div className="container">
                    {location.pathname === '/' && (
                        <div className='NavWraper'>
                            <div className='d-flex'>
                                <div className='iconAndBrandname d-flex'>
                                    <div className='hamburger' ref={navbarMenuToggler} onClick={navbarClick}><ion-icon name="menu-sharp"></ion-icon></div>
                                    <div className="mynavbar-brand">LimitSwap</div>
                                </div>
                                {/* 
                                    *****Mobile Device Launch Button
                                */}
                                <div className='PhonelaunchBtn-con '>
                                    <Link to='/launch' className='launchLink'>
                                        <button className='launchBtn'>
                                            Launch App
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className='mynavbarcontainer' ref={navbarMenu}>

                                <div className='mynavbar-links'>
                                    <ul className="mynavbar-nav navbar-nav">
                                        {HomepageNav.map((nav, index) => (
                                            <li className="nav-item" key={index}>
                                                <Link className='nav-link' to={`/${nav.toLowerCase()}`}>
                                                    {nav}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className='NavActionButtons'>
                                    <div className='launchBtn-con '>
                                        <Link to='/launch' className='launchLink'>
                                            <button className='launchBtn'>
                                                Launch App
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )}

                    {location.pathname === '/launch' && 
                        <div className='NavWraper'>
                            <div className='d-flex'>
                                <div className='iconAndBrandname d-flex'>
                                    <div className='hamburger' ref={navbarMenuToggler} onClick={navbarClick}><ion-icon name="menu-sharp"></ion-icon></div>
                                    <div className="mynavbar-brand">LimitSwap</div>
                                </div>
                                {/* 
                                    *****Mobile Device Launch Button
                                */}
                                <div className='MobileNavActions'>
                                    <div className="chartToggler" id="chart-toggle">
                                        <div className="toggleName d-none">Chart: </div>
                                        <div className={`toggle ${isToggled ? 'active' : ''}`} id="toggle" onClick={chartToggle}></div>
                                    </div>
                                    <div className='chainConnectSelect'>
                                        <img src={eth_logo} alt='chainLogo'/>
                                        <div className='selectChainIcon'>
                                            <ion-icon name="chevron-down-sharp"></ion-icon>
                                        </div>
                                    </div>
                                    <div className='PhoneConnectBtn-con' onClick={openModalWalletClick}>
                                        <button className='launchBtn'>
                                            <ion-icon name="wallet-outline"></ion-icon>
                                        </button>
                                    </div>
                                    <div className='themeToggler'>
                                        <ion-icon name="moon-sharp"></ion-icon>
                                    </div>
                                </div>
                            </div>
                            <div className='mynavbarcontainer' ref={navbarMenu}>

                                <div className='mynavbar-links'>
                                    <ul className="mynavbar-nav navbar-nav">
                                        {LaunchAppNav.map((nav, index) => (
                                            <li className="nav-item" key={index}>
                                                <Link className='nav-link' to={`/${nav.toLowerCase()}`}>
                                                    {nav}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className='NavActionButtons'>

                                    <div className="chart_toggle d-flex justify-content-evenly align-items-center" id="chart-toggle">
                                        <div className="toggle-name">Chart: </div>
                                        <div className={`toggle ${isToggled ? 'active' : ''}`} id="toggle" onClick={chartToggle}></div>
                                    </div>

                                    <div className='chainConnectSelect'>
                                        <img src={eth_logo} alt='chainLogo'/>
                                        <div className='chainName'>Ethereum</div>
                                        <div className='selectChainIcon'>
                                            <ion-icon name="chevron-down-sharp"></ion-icon>
                                        </div>
                                    </div>

                                    <div className='launchBtn-con' onClick={openModalWalletClick}>
                                        <button className='launchBtn d-flex' style={{width:'160px'}}>
                                            <ion-icon name="wallet-outline"></ion-icon>
                                            <div>{ isConnected ? (accountAddress.slice(0,4) + "...." + accountAddress.slice(38)) : "Connect Wallet"}</div>
                                        </button>
                                    </div>

                                    
                                    


                                    <div className='themeToggler'>
                                        <ion-icon name="moon-sharp"></ion-icon>
                                    </div>

                                </div>
                                
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </header>
    );
}

export default Header;


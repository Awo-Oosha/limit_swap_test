import '../assets/css/Homepage.css';
import mainBG from '../assets/img/main-sectionBG.svg';
import services_bit from '../assets/img/services_btcwallet_icon.svg';
import services_mine from '../assets/img/services_mining_icon.svg';
import services_safe from '../assets/img/services_safe_icon.svg';
import about_image from '../assets/img/about_image.svg';

import { Link } from 'react-router-dom';
const Homepage = () => {
    const main_background = `url(${mainBG})`;
    return (
        <div className="homepage">
            <header className='header'>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <div className="navbar-brand">LimitSwap</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span><ion-icon name="grid-outline"></ion-icon></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link to='/ecosystem' className="nav-link">Ecosystem</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/community' className="nav-link">Community</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/governance' className="nav-link">Governance</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/developers' className="nav-link">Developers</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/blog' className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/faq' className="nav-link">FAQ</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/jobs' className="nav-link">Jobs</Link>
                        </li>
                    </ul>
                    <button className='LaunchBtn'>
                        <Link to='/app' className='nav-link'>
                        Launch App
                        </Link>
                    </button>
                    </div>
                </div>
            </nav>
            </header>
            <main className='main'>
                <section className='main-section' style={{backgroundImage: main_background}}>
                    <div className='container'>
                        <div className='main-section-head'>Limit<span id='swap'>Swap</span><br></br> protocol</div>
                        <p className='main-section-desc'>LimitSwap, earn, and build on the leading decentralized crypto trading protocol.</p>
                    </div>
                </section>

                <section className='services'>
                    <div className='container'>
                        <div className='services-head'>
                            Our <span id='services'>Services</span>
                        </div>
                        <p className='services-desc'>
                            Explore our range of cryptocurrency services and take advantage of the benefits of the digital currrency revolution.
                        </p>

                        <div className='card-container'>
                            <div class="card">
                                <img src= {services_bit} class="card-img-top" alt="..."></img>
                                <div class="card-body">
                                    <h5 class="card-title">Build Defi apps</h5>
                                    <p class="card-text">
                                    Our secure cryptocurrency wallet is
                                    designed to prioritize user security &
                                    privacy. with easy-to-use features & a
                                    streamlined interface, users can access
                                    their digital assets quickly & securely
                                    from anywahere in the world.
                                    </p>
                                </div>
                            </div>
                            <div class="card">
                                <img src={services_safe} class="card-img-top" alt="..."></img>
                                <div class="card-body">
                                    <h5 class="card-title">V3 Whitepaper</h5>
                                    <p class="card-text">
                                    Our safe and secure cryptocurrency is
                                    designed with user security in mind.
                                    With advanced authenticcation & multi-factor verification processes, user
                                    can enjoy complete control over their
                                    digital assets without compromising.
                                    </p>
                                </div>
                            </div>
                            <div class="card">
                                <img src={services_mine} class="card-img-top" alt=""></img>
                                <div class="card-body">
                                    <h5 class="card-title">Limitswap Governance</h5>
                                    <p class="card-text">
                                    Our cryptocurrency mining services are
                                    designed to maximize profitability while
                                    minimizing costs. With low electricity
                                    rates & advanced mining algorithms,
                                    users can. earn more cryptocurrency with less energy consumption & equipmwnt.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='about'>
                    <div className='wrap'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-6 col-sm-12 col-md-12'>
                                    <div className='about-image'>
                                        <img src={about_image} alt='about_image.svg'></img>
                                    </div>
                                </div>
                                <div className='col-lg-6 col-sm-12 col-md-12'>
                                    <div className='about-info'>
                                    <div className='about-head'>
                                    Trusted <span id='platform'>Platform</span>
                                    <span id='anytime'> anytime</span> & anywhere.
                                    </div>
                                    <p className='about-desc'>
                                    Our safe and secure cryptocurrency is designed with user security in mind.
                                    <br></br>
                                    <br></br>
                                    With advanced authenticcation & multi-factor verification processes, user can enjoy complete control over their
                                    digital assets without compromising.
                                    </p>
                                    <button className='read-more-btn'>
                                        <Link to='/about' className='read-more-btn-link'>
                                            Read More
                                        </Link>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div> 
            </div>
        </div>
    );
};

export default Homepage;
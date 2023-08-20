import bitwallet_icon from '../assets/images/services_btcwallet_icon.svg'
import safe_icon from '../assets/images/services_safe_icon.svg'
import mining_icon from '../assets/images/services_mining_icon.svg'
import Header from "./Header";
import about_image from '../assets/images/about_image.svg'
import {Link} from "react-router-dom";
// import about_image from '../assets/images/about_image.svg'

const Homepage = () => {


    return(

        <div className='homepage'>
            <Header />
            <main className='main'>
                <section className='section_1'>
                    <div className='container'>
                        <div className='section_1-header'>
                            <p className= 'header-title'>
                                LIMIT<span>SWAP</span> <br/>
                                PROTOCOL
                            </p>
                            <p className='header-desc'>
                                LimitSwap, earn, and build on the leading decentralized crypto <br /> trading protocol.
                            </p>
                        </div>
                    </div>
                </section>

                <section className='section_2'>
                    <div className='container'>
                        <div className='section_2-header'>
                            <p className= 'header-title'>
                                Our <span>Services</span>
                            </p>
                            <p className='header-desc'>
                                Explore our range of cryptocurrency services and take advantage of the benefits of the <br /> digital currrency revolution.                            </p>
                        </div>

                        <div className='section_2-body'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-4 col-md-4'>
                                    <div className='card'>
                                        <img src={bitwallet_icon} className="card-img-top" alt="..."></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Build Defi apps</h5>
                                            <p className="card-text">
                                                Our secure cryptocurrency wallet is
                                                designed to prioritize user security &
                                                privacy. with easy-to-use features & a
                                                streamlined interface, users can access
                                                their digital assets quickly & securely
                                                from anywahere in the world.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12 col-lg-4 col-md-4'>
                                    <div className='card'>
                                        <img src={safe_icon} alt="safe_icon.svg" />
                                        <div className="card-body">
                                            <h5 className="card-title">V3 Whitepaper</h5>
                                            <p className="card-text">
                                                Our safe and secure cryptocurrency is
                                                designed with user security in mind.
                                                With advanced authentication & multi-factor verification processes, user
                                                can enjoy complete control over their
                                                digital assets without compromising.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12 col-lg-4 col-md-4'>
                                    <div className='card'>
                                        <img src={mining_icon} alt="mining_icon.svg" />
                                        <div className="card-body">
                                            <h5 className="card-title">Limitswap Governance</h5>
                                            <p className="card-text">
                                                Our cryptocurrency mining services are
                                                designed to maximize profitability while
                                                minimizing costs. With low electricity
                                                rates & advanced mining algorithms,
                                                users can. earn more cryptocurrency with less energy consumption &
                                                equipment.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='section_3'>
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

                <section className="d-lg-none d-md-none section_3-small">

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
                    <button className='read-more-btn d-none'>
                        <Link to='/about' className='read-more-btn-link'>
                            Read More
                        </Link>
                    </button>

                    <div className="about-image">

                    </div>

                </section>
            </main>
        </div>
    );
};

export default Homepage;
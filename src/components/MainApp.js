import '../assets/css/MainApp.css';
import pair_icon from '../assets/img/app/eth_dai_pair.svg';
import chart from '../assets/img/app/charts.svg';
import swap from '../assets/img/app/card_plug_icon.svg';
import filter from '../assets/img/app/card_filter_icon.svg';
import add from '../assets/img/app/card_add_icon.svg';
import reload from '../assets/img/app/card_reload_icon.svg';
import eth_logo from '../assets/img/app/Eth_icon.svg';
import dai_logo from '../assets/img/app/dai_icon.svg';
import arrow from '../assets/img/app/down_arrow.svg';
import hypen from '../assets/img/app/hyphen.svg';
import inch from '../assets/img/app/1inch.svg';
import wallet from '../assets/img/app/wallet.svg';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CustomModal from './Modal';

export default function MainApp() {
  // Image Variables
  const eth_dai_pair = pair_icon;
  const eth_icon = eth_logo;
  const dai_icon = dai_logo;
  const chartPlaceholder = chart;
  let activitiesIcons = [swap, reload, add, filter];

  // Hooks

  const [activeButton, setActiveButton] = useState('Swap');
  const [swapRouteActions, setSwapRouteActions] = useState('Max Return');
  const [intervalButton, setintervalButton] = useState('1D')
  const [isToggled, setIsToggled] = useState(false);

  const Chart = useRef('');
  const Chart_activities = useRef('');
  const Chart_transactions =useRef('');

  useEffect(() => {
    if (isToggled) {
      Chart.current.classList.add('active');
      Chart_activities.current.classList.remove('col-lg-12');
      Chart_activities.current.classList.add('col-lg-4');
      Chart_transactions.current.style.display = 'flex';
    } else {
      Chart.current.classList.remove('active');
      Chart_activities.current.classList.remove('col-lg-4');
      Chart_activities.current.classList.add('col-lg-12');
      Chart_transactions.current.style.display = 'none';

    }
  }, [isToggled]);
  


  // *******MODAL HOOK***** //

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Functions 

  const handleOnClick = (event) => {
    const buttonText = event.target.textContent;
    setActiveButton(buttonText);
  };

  const activeIntervalClick = (event) => {
    const activeInterval = event.target.textContent;
    setintervalButton(activeInterval);
  };

  const swapRouteActionsClick = (event) => {
    const swapRouteActions = event.target.textContent;
    setSwapRouteActions(swapRouteActions);
  }

  const chartToggle = () => {
      setIsToggled((prevState) => !prevState);
  };


  const [chart_transactions, setChart_transactions] = useState('Active Orders');
  const chart_transactionsClick = (event) => {
    const setChartTransactions = event.target.textContent;
    setChart_transactions(setChartTransactions);
  };


  return (
    <div className="MainApp">
        <header className='header'>
            <nav className='app-nav'>
              <div className='container'>
              <div className='navbar-brand'>Limitswap</div>

              <div className='mynav-menu'>
                <div>
                <ul className='navbar-nav'>
                  <li className='nav-item'><Link to='/exchange' className='nav-link'>Exchange</Link></li>
                  <li className='nav-item'><Link to='/documentations' className='nav-link'>Documentations</Link></li>
                  <li className='nav-item'><Link to='/announcement' className='nav-link'>Announcement</Link></li>
                </ul>
                </div>

                <div className='actionButtons'>
                <div className="chart_toggle d-flex justify-content-evenly align-items-center" id="chart-toggle">
                  <div className="toggle-name">Chart: </div>
                  <div className={`toggle ${isToggled ? 'active' : ''}`} id="toggle" onClick={chartToggle}></div>
                </div>

                <div className="token-select mx-3">
                        <button className="select">
                             <img src={eth_icon} alt="token_select"></img>
                             <select name="token-select" id="token-select">
                                <option value="eth">Ethereum</option>
                             </select>
                        </button>
                </div>

                <div className='connect'>
                  <button className='connectBTN'>
                    <img src={wallet} alt='wallet.svg'></img>
                    Connect Wallet
                  </button>
                </div>
              </div>

              </div>
              
             

              
              </div>
            </nav>
        </header>



      <div className="mainapp mt-2">
          <div className='container'>
            <div className="row mainapp-row">


              {/* ******* CHART ******** */}

              <div className= "col-lg-8" ref={Chart}>
                <div className="chart container card">
                  <div className="chart-heading">

                    {/* ******* PAIR AND PRICE */}
                    <div className="pair_price">
                      <div className="pair">
                        <img src={eth_dai_pair} alt='pair_icon'></img>
                        <form action="#">
                          <select name="pair_name" id="pair_name" className="bg-dark">
                            <option value="ETH/DAI">ETH / DAI</option>
                          </select>
                        </form>
                      </div>
                      <div className='price'>
                        <p>1,872.06124 <sub> 2.76% <span> <ion-icon name="caret-down-outline"></ion-icon></span></sub></p>
                      </div>
                    </div>

                    {/* *******Chart Button */}
                    <div className='chart-buttons-container'>
                      <div className='buttons'>
                      <button className={intervalButton === '5M' ? 'active' : ''} onClick={activeIntervalClick}>5M</button>
                      <button className={intervalButton === '15M' ? 'active' : ''} onClick={activeIntervalClick}>15M</button>
                      <button className={intervalButton === '1H' ? 'active' : ''} onClick={activeIntervalClick}>1H</button>
                      <button className={intervalButton === '4H' ? 'active' : ''} onClick={activeIntervalClick}>4H</button>
                      <button className={intervalButton === '1D' ? 'active' : ''} onClick={activeIntervalClick}>1D</button>
                      <button className={intervalButton === '1W' ? 'active' : ''} onClick={activeIntervalClick}>1W</button>
                      </div>
                      
                      <div className='expand-btn'>
                        <i className="fas fa-expand-alt"></i>
                      </div>
                    </div>


                  </div>
                  <div className='chart-body'>
                    <img src={chartPlaceholder} alt='chart PlaceHolder.svg'></img>
                  </div>
                </div>
              </div>

              {/* **********CHART ACTIVITIES CARD */}


              <div className="col-lg-4 " ref={Chart_activities}>
                <div className='chart-activities container card'>
                  <div className='inner-card'>

                    {/* ****ACTIVITIES NAV******* */}

                    <nav className='activities-nav'>
                    <div className='activities-1 d-flex'>
                        <div className={activeButton === 'Swap' ? 'active' : ''} onClick={handleOnClick}>
                          Swap
                        </div>
                        <div
                          className={activeButton === 'Limit' ? 'active' : ''}
                          onClick={handleOnClick}
                        >
                          Limit
                        </div>
                        <div
                          className={activeButton === 'DCA' ? 'active' : ''}
                          onClick={handleOnClick}
                        >
                          DCA
                        </div>
                    </div>
                    <div className='activities-2'>
                        <img src={activitiesIcons[0]} alt='swap_route.svg' onClick={handleOpenModal}></img>
                          {/* ******SWAP ROUTE MODAL */}
                        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
                          <div className='modal-swapRoute-container'>
                          <div className='swaproute-header'>
                            <div className='swaproute-header-icon'>
                              <img src={activitiesIcons[0]} alt='swap-router.svg'></img>
                              <div className='swaproute-header-title'>
                                Swap Routes
                              </div>
                            </div>
                            <div className='swaproute-close-btn' onClick={handleCloseModal}>
                              <ion-icon name="close-outline"></ion-icon>
                            </div>
                          </div>
                          
                          <div className='swaproute-body'>
                            <div className='swaproute-action-btn'>
                              <button className={swapRouteActions === 'Max Return' ? 'active' : '' } onClick={swapRouteActionsClick}>Max Return</button>
                              <button className={swapRouteActions === 'Lowest gas fee' ? 'active' : '' } onClick={swapRouteActionsClick}>Lowest gas fee</button>
                            </div>
                            <div className='swaproute-action-container'>
                                {swapRouteActions === 'Max Return' && (
                                <div id='max-return'>
                                  <div className='card'>
                                    <div className='route-container route-1 active'>
                                      <div className='route-header'>
                                        <div className='route-interval'> 
                                        <ion-icon name="time"></ion-icon> ~3 mins <span> | </span>
                                        
                                        <div className='gas'>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M10.5192 2.82L10.5292 2.81L8.04586 0.333344L7.3392 1.04L8.74586 2.44666C8.1192 2.68666 7.67252 3.29 7.67252 4C7.67252 4.92 8.41917 5.66666 9.33917 5.66666C9.57583 5.66666 9.80252 5.61666 10.0058 5.52666L10.0058 10.3333C10.0059 10.7 9.70586 11 9.3392 11C8.97255 11 8.67255 10.7 8.67255 10.3333L8.67255 7.33334C8.67255 6.59669 8.07589 6 7.3392 6L6.67255 6L6.67255 1.33334C6.67252 0.596656 6.07586 0 5.3392 0L1.3392 0C0.602516 0 0.00585938 0.596656 0.00585938 1.33334L0.00585938 12L6.67252 12L6.67252 7L7.67252 7L7.67252 10.3333C7.67252 11.2533 8.41917 12 9.33917 12C10.2592 12 11.0058 11.2533 11.0058 10.3333L11.0058 4C11.0059 3.54 10.8192 3.12334 10.5192 2.82ZM5.3392 4.66666L1.3392 4.66666L1.3392 1.33334L5.3392 1.33334L5.3392 4.66666ZM9.3392 4.66666C8.97255 4.66666 8.67255 4.36666 8.67255 4C8.67255 3.63334 8.97255 3.33334 9.3392 3.33334C9.70586 3.33334 10.0059 3.63334 10.0059 4C10.0059 4.36666 9.70586 4.66666 9.3392 4.66666Z" fill="white"/>
                                          </svg> $25.76 
                                        </div>
                                        </div>
                                        
                                        <div className='selected'>
                                          <ion-icon name="checkmark-circle"></ion-icon>
                                        </div>
                                      </div>
                                    <div className='route-body'>
                                        <div className='swaprouteFrm'>
                                          1ETH <span id='location'>on Ethereum</span>
                                        </div>
                                        <div className='passtru'>
                                          <div className='icon'>
                                            <img src={hypen} alt='hypen.svg'></img>
                                          </div>
                                          <div className='passtru_name'>hypen</div>
                                        </div>
                                        <div className='passtru'>
                                        <div className='icon'>
                                            <img src={inch} alt='hypen.svg'></img>
                                          </div>
                                          <div className='passtru_name'>1Inch</div>
                                        </div>
                                        <div className='swaprouteto'>
                                          2098.444 DAI <span id='location'>on Avalanche</span>
                                        </div>
                                    </div>
                                    </div>
                                  </div>

                                  <div className='card'>
                                    <div className='route-container route-2'>
                                      <div className='route-header'>
                                        <div className='route-interval'> 
                                        <ion-icon name="time"></ion-icon> ~2 mins <span> | </span>
                                        
                                        <div className='gas'>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M10.5192 2.82L10.5292 2.81L8.04586 0.333344L7.3392 1.04L8.74586 2.44666C8.1192 2.68666 7.67252 3.29 7.67252 4C7.67252 4.92 8.41917 5.66666 9.33917 5.66666C9.57583 5.66666 9.80252 5.61666 10.0058 5.52666L10.0058 10.3333C10.0059 10.7 9.70586 11 9.3392 11C8.97255 11 8.67255 10.7 8.67255 10.3333L8.67255 7.33334C8.67255 6.59669 8.07589 6 7.3392 6L6.67255 6L6.67255 1.33334C6.67252 0.596656 6.07586 0 5.3392 0L1.3392 0C0.602516 0 0.00585938 0.596656 0.00585938 1.33334L0.00585938 12L6.67252 12L6.67252 7L7.67252 7L7.67252 10.3333C7.67252 11.2533 8.41917 12 9.33917 12C10.2592 12 11.0058 11.2533 11.0058 10.3333L11.0058 4C11.0059 3.54 10.8192 3.12334 10.5192 2.82ZM5.3392 4.66666L1.3392 4.66666L1.3392 1.33334L5.3392 1.33334L5.3392 4.66666ZM9.3392 4.66666C8.97255 4.66666 8.67255 4.36666 8.67255 4C8.67255 3.63334 8.97255 3.33334 9.3392 3.33334C9.70586 3.33334 10.0059 3.63334 10.0059 4C10.0059 4.36666 9.70586 4.66666 9.3392 4.66666Z" fill="white"/>
                                          </svg> $25.76 
                                        </div>
                                        </div>
                                        
                                        <div className='selected'>
                                          <ion-icon name="checkmark-circle"></ion-icon>
                                        </div>
                                      </div>
                                    <div className='route-body'>
                                        <div className='swaprouteFrm'>
                                          1ETH <span id='location'>on Ethereum</span>
                                        </div>
                                        <div className='passtru'>
                                          <div className='icon'>
                                            <img src={hypen} alt='hypen.svg'></img>
                                          </div>
                                          <div className='passtru_name'>hypen</div>
                                        </div>
                                        <div className='passtru'>
                                        <div className='icon'>
                                            <img src={inch} alt='hypen.svg'></img>
                                          </div>
                                          <div className='passtru_name'>1Inch</div>
                                        </div>
                                        <div className='swaprouteto'>
                                          2098.444 DAI <span id='location'>on Avalanche</span>
                                        </div>
                                    </div>
                                    </div>
                                  </div>
                                  <div className='save_route-btn'>
                                    <button>Save Route</button>
                                  </div>
                                </div>
                                )}

                                {swapRouteActions === 'Lowest gas fee' && (
                                  <div id='lowest-gas-fee'>
                                    <div className='card'>
                                    <ion-icon name="warning-outline"></ion-icon>
                                    </div>
                                  </div>
                                )}
                                
                            </div>
                          </div>
                          </div>
                        </CustomModal>

                        <img src={activitiesIcons[1]} alt='swap'></img>
                        <img src={activitiesIcons[2]} alt='swap'></img>
                        <img src={activitiesIcons[3]} alt='swap'></img>
                    </div>
                    </nav>
                        {/* *********SWAP******** */}
                      {activeButton === 'Swap' && (
                        <div className='swap'>
                        <div className='first_pair'>
                          <div className='card'>
                            
                            {/* *****Pair info****** */}
                            <div className='pair_info'>
                              
                              <div className= 'pair_option'>
                                <div className='pair_icon'>
                                    <img src={eth_icon} alt='eth_icon'></img>
                                </div>
                                <div className='pair_select'>
                                    <form>
                                      <select id="pair_abbr" name="pair_abbr">
                                        <option value="ETH">ETH</option>
                                      </select>
                                    </form>
                                    <p className='pair_name'>
                                      Ethereum
                                    </p>
                                </div>
                              </div>
                              <div className='balance'>
                                balance: <span id='balance'>1024.32 ETH</span>
                              </div>

                            </div>

                            {/* ****COIN PRICE*** */}

                            <p className="coin_price">20.5 <sub> ~574.90</sub></p>

                            <div className="pair_buttons">
                                <button className="pair-btn">25%</button>
                                <button className="pair-btn">50%</button>
                                <button className="pair-btn">75%</button>
                                <button className="pair-btn">100%</button>
                              </div>
                          </div>
                        </div>

                        <div className='arrow'>
                        <img src={arrow} alt='arrow.svg'></img>
                        </div>

                        <div className='second_pair'>
                          <div className='card'>
                            {/* *****Pair info****** */}
                            <div className='pair_info'>
                              
                              <div className= 'pair_option'>
                                <div className='pair_icon'>
                                    <img src={dai_icon} alt='dai_logo'></img>
                                </div>
                                <div className='pair_select'>
                                    <form>
                                      <select id="pair_abbr" name="pair_abbr">
                                        <option value="dai">DAI</option>
                                      </select>
                                    </form>
                                    <p className='pair_name'>
                                      Dai Stablecoin
                                    </p>
                                </div>
                              </div>
                              <div className='balance'>
                                balance: <span id='balance'>1024.32 DAI</span>
                              </div>

                            </div>

                            {/* ****COIN PRICE*** */}

                            <p className="coin_price">38,323.64834 <sub> ~38,217.00</sub></p>
                          </div>
                        </div>
                        <div className='eth_to_dai_convert_amount'>
                          <span id='one_eth'>1</span> ETH = <span id='dai_amount'>1913.326535</span> DAI <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                                                            <ellipse cx="8.51273" cy="8" rx="8.01761" ry="8" fill="#34363E"/>
                                                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.63588 10.3934C6.79303 10.5585 6.79303 10.8259 6.63588 10.9909C6.47886 11.156 6.22401 11.156 6.06699 10.9909L4.19414 9.02398C4.11713 8.94325 4.07628 8.83514 4.07628 8.72511C4.07628 8.67079 4.08623 8.61577 4.10692 8.56351C4.16913 8.40561 4.3158 8.30273 4.47858 8.30273L11.9883 8.30273C12.2106 8.30273 12.3906 8.49185 12.3906 8.72525C12.3906 8.95865 12.2106 9.14777 11.9883 9.14777L5.44978 9.14777L6.63588 10.3934ZM12.2726 6.55751C12.3877 6.67813 12.4225 6.85995 12.3598 7.01798C12.2976 7.17588 12.1509 7.27876 11.9881 7.27875L4.47838 7.27875C4.25614 7.27875 4.07607 7.08964 4.07607 6.85624C4.07607 6.62284 4.25614 6.43372 4.47838 6.43372L11.0169 6.43372L9.83082 5.18804C9.67367 5.023 9.67367 4.75563 9.83082 4.59058C9.98784 4.42554 10.2427 4.42554 10.3997 4.59058L12.2726 6.55751Z" fill="#B6F509"/>
                                                                                                          </svg>
                        </div>

                        <div className='swap-connect-btn'>
                          <button className='connect'>Connect Wallet</button>
                        </div>

                        <div className='others'>
                          <div className=' card spillage'>
                            <div className='spillage-percent'>
                              0.5%
                            </div>
                            <p>Spillage Tolerance</p>
                          </div>
                          <div className=' card savings'>
                            <div className='savings-price'>
                              $339.8
                            </div>
                            <p>You’re Saving</p>
                          </div>
                          <div className=' card fee'>
                            <div className='fee-percent'>
                              38.26653 <span id='dai-fee'>DAI</span>
                            </div>
                            <p>Service Fee</p>
                          </div>
                        </div>

                        <div className='eth2usdt'>
                          1 ETH = 1950.83 USDT 
                          <span id='amount'> $(1950.20) | 
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M12.7369 3.27661L12.7486 3.26499L9.84498 0.387319L9.01874 1.2084L10.6634 2.84282C9.93074 3.12168 9.40846 3.82271 9.40846 4.64768C9.40846 5.71664 10.2815 6.5842 11.3572 6.5842C11.6339 6.5842 11.8989 6.5261 12.1366 6.42153V12.0065C12.1367 12.4325 11.7859 12.7811 11.3572 12.7811C10.9285 12.7811 10.5777 12.4325 10.5777 12.0065V8.52075C10.5777 7.66482 9.8801 6.97152 9.01874 6.97152H8.23926V1.54924C8.23922 0.693266 7.54159 0 6.68027 0H2.00333C1.14197 0 0.444336 0.693266 0.444336 1.54924V13.943H8.23922V8.13343H9.40846V12.0065C9.40846 13.0755 10.2815 13.943 11.3572 13.943C12.4329 13.943 13.3059 13.0755 13.3059 12.0065V4.64768C13.3059 4.11319 13.0877 3.62907 12.7369 3.27661ZM6.68027 5.42228H2.00333V1.54924H6.68027V5.42228ZM11.3572 5.42228C10.9285 5.42228 10.5777 5.0737 10.5777 4.64768C10.5777 4.22165 10.9285 3.87308 11.3572 3.87308C11.7859 3.87308 12.1367 4.22165 12.1367 4.64768C12.1367 5.0737 11.7859 5.42228 11.3572 5.42228Z" fill="#767679"/>
                            </svg> 
                          </span> 1950.83 USDT
                        </div>
                      </div>
                      )}

                        {/* ***********LIMIT******** */}

                      {activeButton === 'Limit' && (
                        <div className='limit swap'>
                        <div className='first_pair'>
                          <div className='card'>
                            
                            {/* *****Pair info****** */}
                            <div className='pair_info'>
                              
                              <div className= 'pair_option'>
                                <div className='pair_icon'>
                                    <img src={eth_icon} alt='eth_icon'></img>
                                </div>
                                <div className='pair_select'>
                                    <form>
                                      <select id="pair_abbr" name="pair_abbr">
                                        <option value="ETH">ETH</option>
                                      </select>
                                    </form>
                                    <p className='pair_name'>
                                      Ethereum
                                    </p>
                                </div>
                              </div>
                              <div className='balance'>
                                balance: <span id='balance'>1024.32 ETH</span>
                              </div>

                            </div>

                            {/* ****COIN PRICE*** */}

                            <p className="coin_price">20.5 <sub> ~574.90</sub></p>

                            <div className="pair_buttons">
                                <button className="pair-btn">25%</button>
                                <button className="pair-btn">50%</button>
                                <button className="pair-btn">75%</button>
                                <button className="pair-btn">100%</button>
                              </div>
                          </div>
                        </div>

                        <div className='arrow'>
                        <img src={arrow} alt='arrow.svg'></img>
                        </div>

                        <div className='second_pair'>
                          <div className='card'>
                            {/* *****Pair info****** */}
                            <div className='pair_info'>
                              
                              <div className= 'pair_option'>
                                <div className='pair_icon'>
                                    <img src={dai_icon} alt='dai_logo'></img>
                                </div>
                                <div className='pair_select'>
                                    <form>
                                      <select id="pair_abbr" name="pair_abbr">
                                        <option value="dai">DAI</option>
                                      </select>
                                    </form>
                                    <p className='pair_name'>
                                      Dai Stablecoin
                                    </p>
                                </div>
                              </div>
                              <div className='balance'>
                                balance: <span id='balance'>1024.32 DAI</span>
                              </div>

                            </div>

                            {/* ****COIN PRICE*** */}

                            <p className="coin_price">38,323.64834 <sub> ~38,217.00</sub></p>
                          </div>
                        </div>

                        <div className='set-at-rate'>
                          <div className='card'>
                            <div className='set-at-rate-head'>
                              <div className='Sell ETH at rate (-0.01%)'>Sell ETH at rate (-0.01%)</div>
                              <div className='Set to Market'>Set to Market <ion-icon name="lock-closed"></ion-icon></div>
                            </div>
                            <div className='rate'>0.000559</div>
                          </div>
                        </div>

                        <div className='expiration'>
                          <div className='card'>
                            <div id='expires'> Expires in</div>
                            <div id='time'> 10 minutes <ion-icon name="chevron-down-outline"></ion-icon></div>
                          </div>
                        </div>

                        <button className='call-to-action'>Review Limit Order</button>

                        <div className='convert-tokens'>
                        <div className='card border-0'>
                            <div className='token1'>
                              <div className='token_name'>DAI buy price</div>
                              <div className='token_price'>0.000535239 ETH</div>
                              <div className='currency'>~$1.00174379</div>
                          </div>
                        </div>
                        <div className='card border-0'>
                            <div className='token2'>
                              <div className='token_name'>ETH Sell price</div>
                              <div className='token_price'>1871.38 DAI</div>
                              <div className='currency'>~$1 871.58</div>
                          </div>
                        </div>
                        </div>
                        </div>
                      )}

                      {activeButton ==='DCA' && (
                          <div className='DCA swap limit'>
                          <div className='first_pair'>
                          <div className='card'>
                            
                            {/* *****Pair info****** */}
                            <div className='pair_info'>
                              
                              <div className= 'pair_option'>
                                <div className='pair_icon'>
                                    <img src={eth_icon} alt='eth_icon'></img>
                                </div>
                                <div className='pair_select'>
                                    <form>
                                      <select id="pair_abbr" name="pair_abbr">
                                        <option value="ETH">ETH</option>
                                      </select>
                                    </form>
                                    <p className='pair_name'>
                                      Ethereum
                                    </p>
                                </div>
                              </div>
                              <div className='balance'>
                                balance: <span id='balance'>1024.32 ETH</span>
                              </div>
                              

                            </div>

                            {/* ****COIN PRICE*** */}

                            <p className="coin_price">20.5 <sub> ~574.90</sub></p>

                            <div className="pair_buttons">
                                <button className="pair-btn">25%</button>
                                <button className="pair-btn">50%</button>
                                <button className="pair-btn">75%</button>
                                <button className="pair-btn">100%</button>
                              </div>
                          </div>
                          </div>

                          <div className='arrow'>
                          <img src={arrow} alt='arrow.svg'></img>
                          </div>

                          <div className='second_pair'>
                            <div className='card'>
                              {/* *****Pair info****** */}
                              <div className='pair_info'>
                                
                                <div className= 'pair_option'>
                                  <div className='pair_icon'>
                                      <img src={dai_icon} alt='dai_logo'></img>
                                  </div>
                                  <div className='pair_select'>
                                      <form>
                                        <select id="pair_abbr" name="pair_abbr">
                                          <option value="dai">DAI</option>
                                        </select>
                                      </form>
                                      <p className='pair_name'>
                                        Dai Stablecoin
                                      </p>
                                  </div>
                                </div>
                                <div className='balance'>
                                  balance: <span id='balance'>1024.32 DAI</span>
                                </div>

                              </div>

                              {/* ****COIN PRICE*** */}

                              <p className="coin_price">38,323.64834 <sub> ~38,217.00</sub></p>
                            </div>
                          </div>

                        <div className='expiration'>
                          <div className='card'>
                            <div id='expires'> Execute every: </div>
                            <div id='time'> 1 Day <ion-icon name="chevron-down-outline"></ion-icon></div>
                          </div>
                        </div>

                        <div className='fee_charges'> Includes 0.3% service fee charge. </div>
                        <button className='call-to-action'>Start DCA </button>
                        </div>
                      )}
                    

                    {/* **********ACTIVITIES NAV ENDS********* */}
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div className='row'>
          <div className="col-lg-12" ref={Chart_transactions}>
                <div className='container'>
                <div className='chart_transactions active'>
                  <div className='chart_transactions-heading'>
                    <div className={`active_orders ${chart_transactions === 'Active Orders' ? ' active' : ''}`} onClick={chart_transactionsClick}>
                      Active Orders
                    </div>

                    <div className= {`order_history ${chart_transactions === 'Order History' ? 'active' : '' }`} onClick={chart_transactionsClick}>
                      Order History
                    </div>

                    <div className='close-btn active'>
                      <ion-icon name="chevron-up"></ion-icon>
                    </div>
                  </div>

                  
                    {chart_transactions === 'Active Orders' && (
                      <div className='chart_transactions-body'>
                        <div className='row'>
                        <div className='col-2'>
                          <h6>You Sell</h6>
                          <div className='row justify-content-center align-items-center'>
                            <div className='col-2'>
                              <img src={eth_icon} alt="eth-icon"></img>
                            </div>
                            <div className='col-10 activities_list'>
                              <div>DAI</div>
                              <p>2300</p>
                            </div>
                          </div>
                        </div>
                        <div className='col-2'>
                          <h6>You Buy</h6>
                          <div className="activities_list">
                              <h6>ETH</h6>
                              <p>5.59082642</p>
                          </div>
                        </div>
                        <div className='col-2'>
                        <h6>Order rates</h6>
                          <div className="activities_list">
                              <div className="row">
                                  <div className="col-12">
                                      <div className="1_ETH"><p>1 ETH = <span id="price">1,788.46456</span> DAI</p></div>
                                  </div>
                                  <div className="col-12">
                                      <div className="1_DAI"><p>1 DAI = <span id="price">0.00055913</span> ETH</p></div>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <div className="col-3">
                        <h6>Created/Expiration Dates</h6>
                        <div className="activities_list">
                            <div className="row">
                                <div className="col-12">
                                    <p>
                                        30 Mar 2023 at 10:00 AM
                                    </p>
                                </div>
                                <div className="col-12">
                                    <p>
                                        30 Mar 2023 at 10:00 AM
                                    </p>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="col-3">
                          <h6>Status</h6>
                          <div className="row">
                              <div className="col-12">
                                  Not enough balance
                              </div>
                          </div>
                      </div>
                      </div>
                      </div>
                    )}
                  
                </div>
                </div>
          </div>
          </div>
      </div>

      <footer className="Footer mt-4">
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
    </div>
  )
}
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from "./components/Homepage";
import AppLaunch from "./components/AppLaunch";
import {Route, Routes} from "react-router-dom";
import { useState, createContext, useEffect } from 'react';
// import CustomModal from './components/CustomModal';
import detectEthereumProvider from '@metamask/detect-provider';


// IMAGES
// import arbitrum from './assets/images/app/Network_icons/Arbitrum.svg'
// import zkSync_Era from './assets/images/app/Network_icons/Zksync-Era.svg'
// import BNB_chain from './assets/images/app/Network_icons/BNB- chain.svg'
// import Polygon from './assets/images/app/Network_icons/Polygon.svg'
// import Avalanche from './assets/images/app/Network_icons/Avalanche.svg'
// import Fantom from './assets/images/app/Network_icons/Fantom.svg'
// import Aurora from './assets/images/app/Network_icons/Aurora.svg'
// import Klatyn from './assets/images/app/Network_icons/Klatyn.svg'


// import inch from './assets/images/app/Wallets/uniswap.svg';
// import trust from './assets/images/app/Wallets/trustwallet.svg'
// import walletconnect from './assets/images/app/Wallets/walletconnect.svg'
// import crypto from './assets/images/app/Wallets/brave.svg'
// import coinbase from './assets/images/app/Wallets/coinbase.svg'
// import eth_logo from './assets/images/app/Eth_icon.svg'

import metamask from "./assets/images/app/Wallets/metamask.svg";




export const Context = createContext()
function App() {

  const [accountAddress, setAccountAddress] = useState("Connect Wallet");
  const [accountBalance, setAccountBalance] = useState(" ETH");
  const [isConnected, setIsConnected] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);

  // const checkBoxRef = useRef(null);
  // const connectBtnRef = useRef(null);
  // const checkBoxContainerRef =useRef(null)

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      console.log(provider);
      setHasProvider(Boolean(provider)); // transform provider to true or false
    };

    getProvider();
  }, []);
    
  const formatBalance = (rawBalance) => {
      const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(3);
      return balance;
  };

  const connectToMetaMask = async () => {
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const balance = formatBalance(
        await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })
      );
      setAccountAddress(accounts[0]);
      setAccountBalance(balance);
      setIsConnected(true);
      setModalWalletConnect(false);
      // checkBoxContainerRef.current.classList.remove("danger");
      console.log(accounts[0]);
      console.log(balance);
    } catch (err) {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    }
  }

  // const connectToMetaMask = async () => {
  //   if(checkBoxRef.current.checked) {
  //     try {
  //       let accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       const balance = formatBalance(
  //         await window.ethereum.request({
  //           method: "eth_getBalance",
  //           params: [accounts[0], "latest"],
  //         })
  //       );
  //       setAccountAddress(accounts[0]);
  //       setAccountBalance(balance);
  //       setIsConnected(true);
  //       setModalWalletConnect(false);
  //       checkBoxContainerRef.current.classList.remove("danger");
  //       console.log(accounts[0]);
  //       console.log(balance);
  //     } catch (err) {
  //       if (err.code === 4001) {
  //         console.log("Please connect to MetaMask.");
  //       } else {
  //         console.error(err);
  //       }
  //     }
  //   } else {
  //     checkBoxContainerRef.current.classList.add("danger");
  //   }
  // };  
  

  const [isToggled, setIsToggled] = useState(false);
  const chartToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const [modalWalletConnect, setModalWalletConnect] = useState(false);

  const openModalWalletClick = () => {
    setModalWalletConnect(true);
  };
  const closeModalWalletClick = () => {
    setModalWalletConnect(false);
  };

  return (
    <Context.Provider
      value={{
        isToggled,
        chartToggle,
        modalWalletConnect,
        openModalWalletClick,
        closeModalWalletClick,
        accountAddress,
        accountBalance,
        isConnected,
        connectToMetaMask,
        metamask,
        hasProvider
      }}
    >
      <>
        {/* ************* Wallet Connect Modal
         ***********************************************
         ***********************************************
         */}
        {/* <CustomModal
          isOpen={modalWalletConnect}
          onClose={closeModalWalletClick}
        >
          <div className="modalContent">
            <div className="connect-header">
              <div className="connect-header-title">Connect Wallet</div>
              <div className="connect-close" onClick={closeModalWalletClick}>
                <ion-icon name="close-outline"></ion-icon>
              </div>
            </div>

            <div className="terms" ref={checkBoxContainerRef}>
              <input type="checkbox" ref={checkBoxRef} />
              <div className="read_understand">
                I read and accept <span> Terms of Services</span> &{" "}
                <span>Privacy Policy</span>
              </div>
            </div>

            <div className="Networks ">
              <div className="Networks-Heading">
                <div className="Networks-Heading-Number">1</div>
                <div className="Networks-Heading-Title">Choose Networks</div>
              </div>
              <div className="ChainNetworks">
                <div className="ethereum">
                  <img src={eth_logo} alt="chainIcon" />
                  <div>Ethereum</div>
                </div>
                <div className="arbitrum">
                  <img src={arbitrum} alt="chainIcon" />
                  <div>Arbitrum</div>
                </div>
                <div className="zksync-era">
                  <img src={zkSync_Era} alt="chainIcon" />
                  <div>ZkSync Era</div>
                </div>
                <div className="BNB">
                  <img src={BNB_chain} alt="chainIcon" />
                  <div>BNB Chain</div>
                </div>
                <div className="polygon">
                  <img src={Polygon} alt="chainIcon" />
                  <div>Polygon</div>
                </div>
                <div className="avalanche">
                  <img src={Avalanche} alt="chainIcon" />
                  <div>Avalanche</div>
                </div>
                <div className="fantom">
                  <img src={Fantom} alt="chainIcon" />
                  <div>Fantom</div>
                </div>
                <div className="aurora">
                  <img src={Aurora} alt="chainIcon" />
                  <div>Aurora</div>
                </div>
                <div className="Klatyn">
                  <img src={Klatyn} alt="chainIcon" />
                  <div>Klaytn</div>
                </div>
              </div>
            </div>

            <div className="wallet-Heading">
              <div className="wallet-Heading-number">2</div>
              <div className="wallet-Heading-title">Choose Wallet</div>
            </div>

            <div className="wallet-container">
              <div className="inch-con">
                <img src={inch} alt={inch} />
                <div className="inch">1INCH</div>
              </div>
              <div className="metamask-con">
                <img src={metamask} alt={metamask} />
                <div className="metamask">MetaMask</div>
              </div>
              <div className="trust-con">
                <img src={trust} alt={trust} />
                <div className="trust">Trust</div>
              </div>
              <div className="wallet-con">
                <img src={walletconnect} alt={walletconnect} />
                <div className="walletconnect">Wallet Connect</div>
              </div>
              <div className="crypto-con">
                <img src={crypto} alt={crypto} />
                <div className="crypto">Crypto.com</div>
              </div>
              <div className="coinbase-con">
                <img src={coinbase} alt={coinbase} />
                <div className="metamask">Coinbase</div>
              </div>
            </div>

            <button
              className="connectActionBtn"
              onClick={hasProvider ? (connectToMetaMask) : ''}
              ref={connectBtnRef}
            >
              Connect to wallet
            </button>
          </div>
        </CustomModal> */}

        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/launch" element={<AppLaunch />} />
          </Routes>
          <Footer />
        </div>
      </>
    </Context.Provider>
  );
}

export default App;

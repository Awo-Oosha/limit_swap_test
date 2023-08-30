import swapRoute_icon from "../assets/images/app/card_plug_icon.svg";
import filter_icon from "../assets/images/app/card_filter_icon.svg";
import add_icon from "../assets/images/app/card_add_icon.svg";
import reload_icon from "../assets/images/app/card_reload_icon.svg";
import hypen from "../assets/images/app/hyphen.svg";
import inch from "../assets/images/app/1inch.svg";
import placeholder from "../assets/images/app/charts.svg";

import { useRef, useState, useEffect, useContext } from "react";
import tokenList from "../tokenList.json";
import CustomModal from "./CustomModal";
import { Context } from "../App";
import axios from "axios";

const App_Launch = () => {
  const { isToggled, isConnected } = useContext(Context);

  const [swapButton, setSwapButton] = useState('Connect Wallet');

  useEffect(() => {
    if (isConnected === true) {
      setSwapButton("Swap")
    }
  }, [isConnected]);

  const [tradeBoxActionButton, setTradeBoxActionButton] = useState("Swap");
  const TradeActionHandleOnClick = (event) => {
    const buttonText = event.target.textContent;
    setTradeBoxActionButton(buttonText);
  };

  const tradeBoxHeaderSettingsIcon = [
    swapRoute_icon,
    filter_icon,
    add_icon,
    reload_icon,
  ];
  const [swapRouteActions, setSwapRouteActions] = useState("Max Return");
  const swapRouteActionsClick = (event) => {
    const swapRouteActions = event.target.textContent;
    setSwapRouteActions(swapRouteActions);
  };

  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [changeToken, setChangeToken] = useState(1);
  const [tokenOneUSDAmount, setTokenOneUSDAmount] = useState("0.00");
  const [tokenTwoUSDAmount, setTokenTwoUSDAmount] = useState("0.00");
  const [conversionRate, setConversionRate] = useState("0.0000");
  const [tokenOne, setTokenOne] = useState(tokenList[1]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[2]);

  // *********************************************************************** //
  // ****************** Logic to Output Current Price ********************** //
  // *********************************************************************** //
  const [prices, setPrices] = useState(null);
  async function fetchPrices(one, two) {
    const res = await axios.get("/.netlify/functions/index/tokenPrice", {
      params: { addressOne: one, addressTwo: two },
    });
    console.log(res.data);
    setPrices(res.data);
    // Conversion Rate
    setConversionRate(prices.ratio.toFixed(6));
  }

  // Balance Logic

  // async function fetchBalances(one, two) {
  //   try {
  //     const response = await axios.get("http://localhost:3001/tokenBalances", {
  //       params: { addressOne: one, addressTwo: two },
  //     });

  //     SetToken_balance(response.data)
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  useEffect(()=>{
    fetchPrices(tokenList[0].address, tokenList[1].address)
  },[])
 const changeAmount = (e) => {
   setTokenOneAmount(e.target.value);

   if (e.target.value && prices) {
     setTokenTwoAmount((e.target.value * prices.ratio).toFixed(3));

     if (prices.tokenOne && prices.tokenTwo) {
       // Calculate the USD amount of tokenOne based on its USD price
       const usdAmountTokenOne = e.target.value * prices.tokenOne;
       setTokenOneUSDAmount(usdAmountTokenOne.toFixed(2));

       // Update tokenTwoUSDAmount using usdAmountTokenTwo
       const usdAmountTokenTwo =
         e.target.value * prices.ratio * prices.tokenTwo;
       setTokenTwoUSDAmount(usdAmountTokenTwo.toFixed(2));

     } else {
       // Handle case when prices.tokenOne or prices.tokenTwo is not available
       setTokenOneUSDAmount(0);
       setTokenTwoUSDAmount(0);
     }
   } else {
     setTokenTwoAmount("");
     setTokenOneUSDAmount(0);
     setTokenTwoUSDAmount(0);
   }
 };


  function switchToken() {
  setPrices(null);
  setTokenOneAmount(null);
  setTokenTwoAmount(null);

  // Store current token values
  const currentTokenOne = tokenOne;
  const currentTokenTwo = tokenTwo;

  // Swap token values
  setTokenOne(currentTokenTwo);
  setTokenTwo(currentTokenOne);

  // Fetch prices based on the swapped tokens
  fetchPrices(currentTokenTwo.address, currentTokenOne.address);
}

 const modifyToken = (i) => {
   setPrices(null);
   setTokenOneAmount(null);
   setTokenTwoAmount(null);
   changeToken === 1 ? setTokenOne(tokenList[i]) : setTokenTwo(tokenList[i]);
   changeToken === 1 ? fetchPrices(tokenList[i].address, tokenTwo.address) : fetchPrices(tokenOne.address, tokenList[i].address)
   setTokenListModalOpen(false);
 };

  // Modal Two
  const modal = useRef(null);
  const modalTwoClick = () => {
    if (modal.current.classList.contains("active")) {
      modal.current.classList.remove("active");
    } else {
      modal.current.classList.add("active");
    }
  };

  // Slippage
  const [slippageState, setSlippageState] = useState(0);
  const handleSlippageChange = (e) => {
    setSlippageState(e.target.value);
  };

  //Chart Funtions
  const [intervalButton, setintervalButton] = useState("1D");
  const activeIntervalClick = (event) => {
    const activeInterval = event.target.textContent;
    setintervalButton(activeInterval);
  };

  // Token History

  const [chart_transactions, setChart_transactions] = useState("Active Orders");
  const chart_transactionsClick = (event) => {
    const setChartTransactions = event.target.textContent;
    setChart_transactions(setChartTransactions);
  };

  // Mobile Chart Buttons

  const [mobileChartIntervals, SetMobileChartIntervals] = useState("1D");
  const mobileChartIntervalRef = useRef();
  const intervalListRef = useRef();
  const mobileChartButtonClick = (e) => {
    SetMobileChartIntervals(e.target.textContent);
    intervalListRef.current.classList.remove("active");
  };
  const intervalListClick = () => {
    if (intervalListRef.current.classList.contains("active")) {
      intervalListRef.current.classList.remove("active");
    } else {
      intervalListRef.current.classList.add("active");
    }
  };
  useEffect(() => {
    if (mobileChartIntervals === mobileChartIntervalRef.current.value) {
      mobileChartIntervalRef.current.classList.add("active");
    } else {
      mobileChartIntervalRef.current.classList.remove("active");
    }
  }, [mobileChartIntervals]);

  // ##################### TOKENLIST MODAL CONTENT
  const [isTokenListModalOpen, setTokenListModalOpen] = useState(false);
  const handleTokenListOpenModal = (asset) => {
    setTokenListModalOpen(true);
    setChangeToken(asset);
  };

  const handleTokenListCloseModal = () => {
    setTokenListModalOpen(false);
  };

  // ########################### SWAPROUTE MODAL ####################
  const [isSwapRouteModalOpen, setIsSwapRouteModalOpen] = useState(false);
  const handleSwapRouteModalOpenClick = () => {
    setIsSwapRouteModalOpen(true);
  };
  const handleSwapRouteModalCloseClick = () => {
    setIsSwapRouteModalOpen(false);
  };

  // ########################### CHART TOGGLING ########################### //
  const Chart = useRef();
  const TradeBox = useRef();
  const HistoryBox = useRef();
  const tokenHistoryRef = useRef();
  const mainWindowRef = useRef();

  useEffect(() => {
    if (isToggled) {
      Chart.current.classList.add("active");
      TradeBox.current.classList.add("active");
      HistoryBox.current.classList.add("active");
      tokenHistoryRef.current.style.display = 'flex';
      mainWindowRef.current.style.height = '100%';

    } else {
      Chart.current.classList.remove("active");
      TradeBox.current.classList.remove("active");
      HistoryBox.current.classList.remove("active");
      tokenHistoryRef.current.style.display = 'none';
      mainWindowRef.current.style.height = '100vh';
    }
  }, [isToggled]);

  return (
    <>
      <CustomModal
        isOpen={isTokenListModalOpen}
        onClose={handleTokenListCloseModal}
        title={"Select A Token"}
      >
        <div className="tokenListModal">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isSwapRouteModalOpen}
        onClose={handleSwapRouteModalCloseClick}
      >
        <div className="swapRouteModal_content">
          <div className="modal-swapRoute-container">
            <div className="swaproute-header">
              <div className="swaproute-header-icon">
                <img
                  src={tradeBoxHeaderSettingsIcon[0]}
                  alt="swap-router.svg"
                ></img>
                <div className="swaproute-header-title">Swap Routes</div>
              </div>
              <div
                className="swaproute-close-btn"
                onClick={handleSwapRouteModalCloseClick}
              >
                <ion-icon name="close-outline"></ion-icon>
              </div>
            </div>

            <div className="swaproute-body">
              <div className="swaproute-action-btn">
                <button
                  className={swapRouteActions === "Max Return" ? "active" : ""}
                  onClick={swapRouteActionsClick}
                >
                  Max Return
                </button>
                <button
                  className={
                    swapRouteActions === "Lowest gas fee" ? "active" : ""
                  }
                  onClick={swapRouteActionsClick}
                >
                  Lowest gas fee
                </button>
              </div>
              <div className="swaproute-action-container">
                {swapRouteActions === "Max Return" && (
                  <div id="max-return">
                    <div className="card">
                      <div className="route-container route-1 active">
                        <div className="route-header">
                          <div className="route-interval">
                            <ion-icon name="time"></ion-icon> ~3 mins{" "}
                            <span> | </span>
                            <div className="gas">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M10.5192 2.82L10.5292 2.81L8.04586 0.333344L7.3392 1.04L8.74586 2.44666C8.1192 2.68666 7.67252 3.29 7.67252 4C7.67252 4.92 8.41917 5.66666 9.33917 5.66666C9.57583 5.66666 9.80252 5.61666 10.0058 5.52666L10.0058 10.3333C10.0059 10.7 9.70586 11 9.3392 11C8.97255 11 8.67255 10.7 8.67255 10.3333L8.67255 7.33334C8.67255 6.59669 8.07589 6 7.3392 6L6.67255 6L6.67255 1.33334C6.67252 0.596656 6.07586 0 5.3392 0L1.3392 0C0.602516 0 0.00585938 0.596656 0.00585938 1.33334L0.00585938 12L6.67252 12L6.67252 7L7.67252 7L7.67252 10.3333C7.67252 11.2533 8.41917 12 9.33917 12C10.2592 12 11.0058 11.2533 11.0058 10.3333L11.0058 4C11.0059 3.54 10.8192 3.12334 10.5192 2.82ZM5.3392 4.66666L1.3392 4.66666L1.3392 1.33334L5.3392 1.33334L5.3392 4.66666ZM9.3392 4.66666C8.97255 4.66666 8.67255 4.36666 8.67255 4C8.67255 3.63334 8.97255 3.33334 9.3392 3.33334C9.70586 3.33334 10.0059 3.63334 10.0059 4C10.0059 4.36666 9.70586 4.66666 9.3392 4.66666Z"
                                  fill="white"
                                />
                              </svg>{" "}
                              $25.76
                            </div>
                          </div>

                          <div className="selected">
                            <ion-icon name="checkmark-circle"></ion-icon>
                          </div>
                        </div>
                        <div className="route-body">
                          <div className="swaprouteFrm">
                            1ETH <span id="location">on Ethereum</span>
                          </div>
                          <div className="passtru">
                            <div className="icon">
                              <img src={hypen} alt="hypen.svg"></img>
                            </div>
                            <div className="passtru_name">hypen</div>
                          </div>
                          <div className="passtru">
                            <div className="icon">
                              <img src={inch} alt="hypen.svg"></img>
                            </div>
                            <div className="passtru_name">1Inch</div>
                          </div>
                          <div className="swaprouteto">
                            2098.444 DAI <span id="location">on Avalanche</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="route-container route-2">
                        <div className="route-header">
                          <div className="route-interval">
                            <ion-icon name="time"></ion-icon> ~2 mins{" "}
                            <span> | </span>
                            <div className="gas">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M10.5192 2.82L10.5292 2.81L8.04586 0.333344L7.3392 1.04L8.74586 2.44666C8.1192 2.68666 7.67252 3.29 7.67252 4C7.67252 4.92 8.41917 5.66666 9.33917 5.66666C9.57583 5.66666 9.80252 5.61666 10.0058 5.52666L10.0058 10.3333C10.0059 10.7 9.70586 11 9.3392 11C8.97255 11 8.67255 10.7 8.67255 10.3333L8.67255 7.33334C8.67255 6.59669 8.07589 6 7.3392 6L6.67255 6L6.67255 1.33334C6.67252 0.596656 6.07586 0 5.3392 0L1.3392 0C0.602516 0 0.00585938 0.596656 0.00585938 1.33334L0.00585938 12L6.67252 12L6.67252 7L7.67252 7L7.67252 10.3333C7.67252 11.2533 8.41917 12 9.33917 12C10.2592 12 11.0058 11.2533 11.0058 10.3333L11.0058 4C11.0059 3.54 10.8192 3.12334 10.5192 2.82ZM5.3392 4.66666L1.3392 4.66666L1.3392 1.33334L5.3392 1.33334L5.3392 4.66666ZM9.3392 4.66666C8.97255 4.66666 8.67255 4.36666 8.67255 4C8.67255 3.63334 8.97255 3.33334 9.3392 3.33334C9.70586 3.33334 10.0059 3.63334 10.0059 4C10.0059 4.36666 9.70586 4.66666 9.3392 4.66666Z"
                                  fill="white"
                                />
                              </svg>{" "}
                              $25.76
                            </div>
                          </div>

                          <div className="selected">
                            <ion-icon name="checkmark-circle"></ion-icon>
                          </div>
                        </div>
                        <div className="route-body">
                          <div className="swaprouteFrm">
                            1ETH <span id="location">on Ethereum</span>
                          </div>
                          <div className="passtru">
                            <div className="icon">
                              <img src={hypen} alt="hypen.svg"></img>
                            </div>
                            <div className="passtru_name">hypen</div>
                          </div>
                          <div className="passtru">
                            <div className="icon">
                              <img src={inch} alt="hypen.svg"></img>
                            </div>
                            <div className="passtru_name">1Inch</div>
                          </div>
                          <div className="swaprouteto">
                            2098.444 DAI <span id="location">on Avalanche</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="save_route-btn">
                      <button>Save Route</button>
                    </div>
                  </div>
                )}

                {swapRouteActions === "Lowest gas fee" && (
                  <div id="lowest-gas-fee">
                    <div className="card">
                      <ion-icon name="warning-outline"></ion-icon>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CustomModal>

      <div className="App_Launch mainWindow" ref={mainWindowRef}>
        <div className="container">
          <div className="row mainWindowRow">
            <div className="col-lg-8 Chart active" ref={Chart}>
              <div className="chartBox">
                <div className="chart container card">
                  <div className="chart-heading">
                    {/* ******* PAIR AND PRICE */}
                    <div className="pair_price ">
                      <div className="pair">
                        <div className="pair_icon">
                          <img
                            className="tokenOne"
                            src={tokenOne.img}
                            alt="pair_icon"
                          ></img>
                          <img
                            className="tokenTwo"
                            src={tokenTwo.img}
                            alt="pair_icon2"
                          ></img>
                        </div>
                        <div className="pair_name">
                          {tokenOne.ticker} / {tokenTwo.ticker}
                        </div>
                      </div>
                      <div className="price">
                        <p>
                          1,872.06124{" "}
                          <sub>
                            {" "}
                            2.76%{" "}
                            <span>
                              {" "}
                              <ion-icon name="caret-down-outline"></ion-icon>
                            </span>
                          </sub>
                        </p>
                      </div>
                    </div>

                    <div className="statistics d-lg-none">
                      <div className="statsHeading">Statistics</div>
                      <div className="statsReadings">
                        <div id="O">
                          O: <span>1259.50</span>
                        </div>
                        <div id="H">
                          H: <span>1270.08</span>
                        </div>
                        <div id="L">
                          L: <span>1257.34</span>
                        </div>
                        <div id="C">
                          C: <span>1257.13</span>
                        </div>
                      </div>
                    </div>

                    {/* *******Mobile ChartButton */}
                    <div className="mobileChartBtns d-lg-none">
                      <div className="selectedBtnContainer">
                        <div
                          className="selectBtn"
                          ref={mobileChartIntervalRef}
                          onClick={intervalListClick}
                        >
                          {mobileChartIntervals}
                        </div>
                        <div className="selectIcon">
                          <ion-icon name="caret-down-sharp"></ion-icon>
                        </div>
                      </div>
                      <div className="intervalList" ref={intervalListRef}>
                        <div
                          className={
                            mobileChartIntervals === "5M" ? "active" : ""
                          }
                          onClick={mobileChartButtonClick}
                          value={"5M"}
                        >
                          5M
                        </div>
                        <div
                          className={
                            mobileChartIntervals === "15M" ? "active" : ""
                          }
                          onClick={mobileChartButtonClick}
                          value={"15M"}
                        >
                          15M
                        </div>
                        <div
                          className={
                            mobileChartIntervals === "1H" ? "active" : ""
                          }
                          onClick={mobileChartButtonClick}
                          value={"1H"}
                        >
                          1H
                        </div>
                        <div
                          className={
                            mobileChartIntervals === "4H" ? "active" : ""
                          }
                          onClick={mobileChartButtonClick}
                          value={"4H"}
                        >
                          4H
                        </div>
                        <div
                          className={
                            mobileChartIntervals === "1D" ? "active" : ""
                          }
                          onClick={mobileChartButtonClick}
                          value={"1D"}
                        >
                          1D
                        </div>
                        <div
                          className={
                            mobileChartIntervals === "1W" ? "active" : ""
                          }
                          onClick={mobileChartButtonClick}
                          value={"1W"}
                        >
                          1W
                        </div>
                      </div>
                    </div>

                    {/* *******Chart Button */}
                    <div className="chart-buttons-container">
                      <div className="buttons">
                        <button
                          className={intervalButton === "5M" ? "active" : ""}
                          onClick={activeIntervalClick}
                        >
                          5M
                        </button>
                        <button
                          className={intervalButton === "15M" ? "active" : ""}
                          onClick={activeIntervalClick}
                        >
                          15M
                        </button>
                        <button
                          className={intervalButton === "1H" ? "active" : ""}
                          onClick={activeIntervalClick}
                        >
                          1H
                        </button>
                        <button
                          className={intervalButton === "4H" ? "active" : ""}
                          onClick={activeIntervalClick}
                        >
                          4H
                        </button>
                        <button
                          className={intervalButton === "1D" ? "active" : ""}
                          onClick={activeIntervalClick}
                        >
                          1D
                        </button>
                        <button
                          className={intervalButton === "1W" ? "active" : ""}
                          onClick={activeIntervalClick}
                        >
                          1W
                        </button>
                      </div>

                      <div className="expand-btn">
                        <i className="fas fa-expand-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div className="chart-body">
                    <img src={placeholder} alt="chart PlaceHolder.svg"></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 TradeBox" ref={TradeBox}>
              <div className="tradeBox-container">
                <div className="tradeBox">
                  <div className="tradeBox-header">
                    <div className="tradeBox-header_actions">
                      <div
                        className={
                          tradeBoxActionButton === "Swap" ? "active" : ""
                        }
                        onClick={TradeActionHandleOnClick}
                      >
                        Swap
                      </div>
                      <div
                        className={
                          tradeBoxActionButton === "Limit" ? "active" : ""
                        }
                        onClick={TradeActionHandleOnClick}
                      >
                        Limit
                      </div>
                      <div
                        className={
                          tradeBoxActionButton === "DCA" ? "active" : ""
                        }
                        onClick={TradeActionHandleOnClick}
                      >
                        DCA
                      </div>
                    </div>

                    <div className="tradeBox-header_settings">
                      <img
                        src={tradeBoxHeaderSettingsIcon[0]}
                        className="actionIcon"
                        alt="swap_route.svg"
                        onClick={handleSwapRouteModalOpenClick}
                      ></img>
                      <div className="myPureModal" ref={modal}>
                        <div className="modal_dialog"></div>
                      </div>

                      <img
                        src={tradeBoxHeaderSettingsIcon[1]}
                        className="actionIcon"
                        alt="swap_route.svg"
                        onClick={modalTwoClick}
                      ></img>
                      <img
                        src={tradeBoxHeaderSettingsIcon[2]}
                        className="actionIcon"
                        alt="swap_route.svg"
                        onClick={modalTwoClick}
                      ></img>
                      <img
                        src={tradeBoxHeaderSettingsIcon[3]}
                        className="actionIcon"
                        alt="swap_route.svg"
                        onClick={modalTwoClick}
                      ></img>
                    </div>
                  </div>
                  {tradeBoxActionButton === "Swap" && (
                    <div className="tradeBox-input">
                      <div className="inputOne mycard">
                        <div className="assetOne">
                          <div className="info">
                            <div className="tokenSelect">
                              <img
                                className="tokenOneImage"
                                src={tokenOne.img}
                                alt={tokenOne.name}
                              />
                              <div
                                className="tokenOneNames"
                                onClick={() => handleTokenListOpenModal(1)}
                              >
                                <div className="tokenTicker">
                                  {tokenOne.ticker}{" "}
                                  <span id="select">
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                  </span>
                                </div>
                                <div className="tokenName">{tokenOne.name}</div>
                              </div>
                            </div>
                            <div className="tokenBalance">
                              Balance: <span id="balance">1024.32 ETH</span>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="tokenOneAmount"
                            placeholder="20.50"
                            value={tokenOneAmount}
                            onChange={changeAmount}
                            disabled={!prices}
                          />{" "}
                          <sub> ~ ${tokenOneUSDAmount}</sub>
                          <div className="spilpageTolerance">
                            <button
                              className={slippageState === "20" ? "active" : ""}
                              value={20}
                              onClick={handleSlippageChange}
                            >
                              25%
                            </button>
                            <button
                              className={slippageState === "50" ? "active" : ""}
                              value={50}
                              onClick={handleSlippageChange}
                            >
                              50%
                            </button>
                            <button
                              className={slippageState === "70" ? "active" : ""}
                              value={70}
                              onClick={handleSlippageChange}
                            >
                              70%
                            </button>
                            <button
                              className={
                                slippageState === "100" ? "active" : ""
                              }
                              value={100}
                              onClick={handleSlippageChange}
                            >
                              100%
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="SwitchBtn" onClick={switchToken}>
                        <ion-icon name="arrow-down-outline"></ion-icon>
                      </div>

                      <div className="inputTwo mycard">
                        <div className="assetTwo">
                          <div className="info">
                            <div className="tokenSelect">
                              <img
                                className="tokenTwoImage"
                                src={tokenTwo.img}
                                alt={tokenTwo.name}
                              />
                              <div
                                className="tokenTwoNames"
                                onClick={() => handleTokenListOpenModal(2)}
                              >
                                <div className="tokenTicker">
                                  {tokenTwo.ticker}{" "}
                                  <span id="select">
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                  </span>
                                </div>
                                <div className="tokenName">{tokenTwo.name}</div>
                              </div>
                            </div>
                            <div className="tokenBalance">
                              Balance: <span id="balance">1024.32 DAI</span>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="tokenTwoAmount"
                            placeholder="38,323.64834"
                            value={tokenTwoAmount}
                            disabled={true}
                          />{" "}
                          <sub> ~ ${tokenTwoUSDAmount}</sub>
                        </div>
                      </div>

                      <div className="TokenConverter">
                        <div className="tokenFrm"> 1 {tokenOne.ticker}</div>
                        <div className="to"> = {conversionRate} </div>
                        <div className="tokenTo"> {tokenTwo.ticker} </div>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <ellipse
                            cx="8.51273"
                            cy="8"
                            rx="8.01761"
                            ry="8"
                            fill="#34363E"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.63588 10.3934C6.79303 10.5585 6.79303 10.8259 6.63588 10.9909C6.47886 11.156 6.22401 11.156 6.06699 10.9909L4.19414 9.02398C4.11713 8.94325 4.07628 8.83514 4.07628 8.72511C4.07628 8.67079 4.08623 8.61577 4.10692 8.56351C4.16913 8.40561 4.3158 8.30273 4.47858 8.30273L11.9883 8.30273C12.2106 8.30273 12.3906 8.49185 12.3906 8.72525C12.3906 8.95865 12.2106 9.14777 11.9883 9.14777L5.44978 9.14777L6.63588 10.3934ZM12.2726 6.55751C12.3877 6.67813 12.4225 6.85995 12.3598 7.01798C12.2976 7.17588 12.1509 7.27876 11.9881 7.27875L4.47838 7.27875C4.25614 7.27875 4.07607 7.08964 4.07607 6.85624C4.07607 6.62284 4.25614 6.43372 4.47838 6.43372L11.0169 6.43372L9.83082 5.18804C9.67367 5.023 9.67367 4.75563 9.83082 4.59058C9.98784 4.42554 10.2427 4.42554 10.3997 4.59058L12.2726 6.55751Z"
                            fill="#B6F509"
                          />
                        </svg>
                      </div>

                      <button className="swapButton" disabled={!tokenOneAmount}>
                        {swapButton}
                      </button>

                      <div className="others">
                        <div className=" card spillage">
                          <div className="spillage-percent">0.5%</div>
                          <p>Spillage Tolerance</p>
                        </div>
                        <div className=" card savings">
                          <div className="savings-price">$339.8</div>
                          <p>You’re Saving</p>
                        </div>
                        <div className=" card fee">
                          <div className="fee-percent">
                            38.26653{" "}
                            <span id="token-fee">{tokenTwo.ticker}</span>
                          </div>
                          <p>Service Fee</p>
                        </div>
                      </div>
                      <div className="tokenSummary">
                        1 {tokenOne.ticker} = 1950.83 {tokenTwo.ticker}
                        <span id="amount">
                          {" "}
                          $(1950.20) |
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M12.7369 3.27661L12.7486 3.26499L9.84498 0.387319L9.01874 1.2084L10.6634 2.84282C9.93074 3.12168 9.40846 3.82271 9.40846 4.64768C9.40846 5.71664 10.2815 6.5842 11.3572 6.5842C11.6339 6.5842 11.8989 6.5261 12.1366 6.42153V12.0065C12.1367 12.4325 11.7859 12.7811 11.3572 12.7811C10.9285 12.7811 10.5777 12.4325 10.5777 12.0065V8.52075C10.5777 7.66482 9.8801 6.97152 9.01874 6.97152H8.23926V1.54924C8.23922 0.693266 7.54159 0 6.68027 0H2.00333C1.14197 0 0.444336 0.693266 0.444336 1.54924V13.943H8.23922V8.13343H9.40846V12.0065C9.40846 13.0755 10.2815 13.943 11.3572 13.943C12.4329 13.943 13.3059 13.0755 13.3059 12.0065V4.64768C13.3059 4.11319 13.0877 3.62907 12.7369 3.27661ZM6.68027 5.42228H2.00333V1.54924H6.68027V5.42228ZM11.3572 5.42228C10.9285 5.42228 10.5777 5.0737 10.5777 4.64768C10.5777 4.22165 10.9285 3.87308 11.3572 3.87308C11.7859 3.87308 12.1367 4.22165 12.1367 4.64768C12.1367 5.0737 11.7859 5.42228 11.3572 5.42228Z"
                              fill="#767679"
                            />
                          </svg>
                        </span>{" "}
                        1950.83 {tokenTwo.ticker}
                      </div>
                    </div>
                  )}
                  {tradeBoxActionButton === "Limit" && (
                    <div className="tradeBox-input">
                      <div className="inputOne mycard">
                        <div className="assetOne">
                          <div className="info">
                            <div className="tokenSelect">
                              <img
                                className="tokenOneImage"
                                src={tokenOne.img}
                                alt=""
                              />
                              <div
                                className="tokenOneNames"
                                onClick={() => handleTokenListOpenModal(1)}
                              >
                                <div className="tokenTicker">
                                  {tokenOne.ticker}{" "}
                                  <span id="select">
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                  </span>
                                </div>
                                <div className="tokenName">{tokenOne.name}</div>
                              </div>
                            </div>
                            <div className="tokenBalance">
                              Balance: <span id="balance">1024.32 ETH</span>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="tokenOneAmount"
                            placeholder="20.50"
                            value={tokenOneAmount}
                            onChange={changeAmount}
                          />{" "}
                          <sub> ~574.90</sub>
                          <div className="spilpageTolerance">
                            <button
                              className={slippageState === "20" ? "active" : ""}
                              value={20}
                              onClick={handleSlippageChange}
                            >
                              25%
                            </button>
                            <button
                              className={slippageState === "50" ? "active" : ""}
                              value={50}
                              onClick={handleSlippageChange}
                            >
                              50%
                            </button>
                            <button
                              className={slippageState === "70" ? "active" : ""}
                              value={70}
                              onClick={handleSlippageChange}
                            >
                              70%
                            </button>
                            <button
                              className={
                                slippageState === "100" ? "active" : ""
                              }
                              value={100}
                              onClick={handleSlippageChange}
                            >
                              100%
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="SwitchBtn" onClick={switchToken}>
                        <ion-icon name="arrow-down-outline"></ion-icon>
                      </div>

                      <div className="inputTwo mycard">
                        <div className="assetTwo">
                          <div className="info">
                            <div className="tokenSelect">
                              <img
                                className="tokenTwoImage"
                                src={tokenTwo.img}
                                alt={tokenTwo.name}
                              />
                              <div
                                className="tokenTwoNames"
                                onClick={() => handleTokenListOpenModal(2)}
                              >
                                <div className="tokenTicker">
                                  {tokenTwo.ticker}{" "}
                                  <span id="select">
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                  </span>
                                </div>
                                <div className="tokenName">{tokenTwo.name}</div>
                              </div>
                            </div>
                            <div className="tokenBalance">
                              Balance: <span id="balance">1024.32 DAI</span>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="tokenTwoAmount"
                            placeholder="38,323.64834"
                            value={tokenTwoAmount}
                            disabled={true}
                          />{" "}
                          <sub> ~38,217.00</sub>
                        </div>
                      </div>

                      <div className="set-at-rate">
                        <div className="card">
                          <div className="set-at-rate-head">
                            <div className="Sellrate">
                              Sell {tokenOne.ticker} at rate (-0.01%)
                            </div>
                            <div className="Set to Market">
                              Set to Market{" "}
                              <ion-icon name="lock-closed"></ion-icon>
                            </div>
                          </div>
                          <div className="rate">0.000559</div>
                        </div>
                      </div>

                      <div className="expiration">
                        <div className="card">
                          <div id="expires"> Expires in</div>
                          <div id="time">
                            {" "}
                            10 minutes{" "}
                            <ion-icon name="chevron-down-outline"></ion-icon>
                          </div>
                        </div>
                      </div>

                      <button className="call-to-action">
                        Review Limit Order
                      </button>

                      <div className="convert-tokens">
                        <div className="card border-0">
                          <div className="token1">
                            <div className="token_name">DAI buy price</div>
                            <div className="token_price">0.000535239 ETH</div>
                            <div className="currency">~$1.00174379</div>
                          </div>
                        </div>
                        <div className="card border-0">
                          <div className="token2">
                            <div className="token_name">ETH Sell price</div>
                            <div className="token_price">1871.38 DAI</div>
                            <div className="currency">~$1 871.58</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {tradeBoxActionButton === "DCA" && (
                    <div className="tradeBox-input">
                      <div className="inputOne mycard">
                        <div className="assetOne">
                          <div className="info">
                            <div className="tokenSelect">
                              <img
                                className="tokenOneImage"
                                src={tokenOne.img}
                                alt={tokenOne.name}
                              />
                              <div
                                className="tokenOneNames"
                                onClick={() => handleTokenListOpenModal(1)}
                              >
                                <div className="tokenTicker">
                                  {tokenOne.ticker}{" "}
                                  <span id="select">
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                  </span>
                                </div>
                                <div className="tokenName">{tokenOne.name}</div>
                              </div>
                            </div>
                            <div className="tokenBalance">
                              Balance: <span id="balance">1024.32 ETH</span>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="tokenOneAmount"
                            placeholder="20.50"
                            value={tokenOneAmount}
                            onChange={changeAmount}
                          />{" "}
                          <sub> ~574.90</sub>
                          <div className="spilpageTolerance">
                            <button
                              className={slippageState === "20" ? "active" : ""}
                              value={20}
                              onClick={handleSlippageChange}
                            >
                              25%
                            </button>
                            <button
                              className={slippageState === "50" ? "active" : ""}
                              value={50}
                              onClick={handleSlippageChange}
                            >
                              50%
                            </button>
                            <button
                              className={slippageState === "70" ? "active" : ""}
                              value={70}
                              onClick={handleSlippageChange}
                            >
                              70%
                            </button>
                            <button
                              className={
                                slippageState === "100" ? "active" : ""
                              }
                              value={100}
                              onClick={handleSlippageChange}
                            >
                              100%
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="SwitchBtn" onClick={switchToken}>
                        <ion-icon name="arrow-down-outline"></ion-icon>
                      </div>

                      <div className="inputTwo mycard">
                        <div className="assetTwo">
                          <div className="info">
                            <div className="tokenSelect">
                              <img
                                className="tokenTwoImage"
                                src={tokenTwo.img}
                                alt={tokenTwo.name}
                              />
                              <div
                                className="tokenTwoNames"
                                onClick={() => handleTokenListOpenModal(2)}
                              >
                                <div className="tokenTicker">
                                  {tokenTwo.ticker}{" "}
                                  <span id="select">
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                  </span>
                                </div>
                                <div className="tokenName">{tokenTwo.name}</div>
                              </div>
                            </div>
                            <div className="tokenBalance">
                              Balance: <span id="balance">1024.32 DAI</span>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="tokenTwoAmount"
                            placeholder="38,323.64834"
                            value={tokenTwoAmount}
                            disabled={true}
                          />{" "}
                          <sub> ~38,217.00</sub>
                        </div>
                      </div>

                      <div className="expiration">
                        <div className="card">
                          <div id="expires"> Execute every: </div>
                          <div id="time">
                            {" "}
                            1 Day{" "}
                            <ion-icon name="chevron-down-outline"></ion-icon>
                          </div>
                        </div>
                      </div>

                      <div className="fee_charges">
                        {" "}
                        Includes 0.3% service fee charge.{" "}
                      </div>
                      <button className="call-to-action">Start DCA </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row token-history" ref={tokenHistoryRef}>
            <div className="col-lg-12" ref={HistoryBox}>
              <div className="container">
                <div className="chart_transactions active">
                  <div className="chart_transactions-heading">
                    <div
                      className={`active_orders ${
                        chart_transactions === "Active Orders" ? " active" : ""
                      }`}
                      onClick={chart_transactionsClick}
                    >
                      Active Orders
                    </div>

                    <div
                      className={`order_history ${
                        chart_transactions === "Order History" ? "active" : ""
                      }`}
                      onClick={chart_transactionsClick}
                    >
                      Order History
                    </div>

                    <div className="close-btn">
                      <ion-icon name="chevron-up"></ion-icon>
                    </div>
                  </div>

                  {chart_transactions === "Active Orders" && (
                    <div className="chart_transactions-body">
                      <div className="row">
                        <div className="col-2">
                          <h6>You Sell</h6>
                          <div className="row justify-content-center align-items-center">
                            <div className="col-2">
                              <img src={tokenOne.img} alt={tokenOne.name}></img>
                            </div>
                            <div className="col-10 activities_list">
                              <div>{tokenOne.ticker}</div>
                              <p>2300</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <h6>You Buy</h6>
                          <div className="activities_list">
                            <h6>{tokenTwo.ticker}</h6>
                            <p>5.59082642</p>
                          </div>
                        </div>
                        <div className="col-2">
                          <h6>Order rates</h6>
                          <div className="activities_list">
                            <div className="row">
                              <div className="col-12">
                                <div className="1_ETH">
                                  <p>
                                    1 ETH = <span id="price">1,788.46456</span>{" "}
                                    DAI
                                  </p>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="1_DAI">
                                  <p>
                                    1 DAI = <span id="price">0.00055913</span>{" "}
                                    ETH
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <h6>Created/Expiration Dates</h6>
                          <div className="activities_list">
                            <div className="row">
                              <div className="col-12">
                                <p>30 Mar 2023 at 10:00 AM</p>
                              </div>
                              <div className="col-12">
                                <p>30 Mar 2023 at 10:00 AM</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <h6>Status</h6>
                          <div className="row">
                            <div className="col-12">Not enough balance</div>
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
      </div>
    </>
  );
};

export default App_Launch;

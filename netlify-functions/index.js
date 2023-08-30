const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());


app.get("/tokenPrice", async (req, res) => {
    const { query } = req

    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressOne
    })
    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressTwo,
    });

    const usdPrices = {
        tokenOne : responseOne.raw.usdPrice,
        tokenTwo : responseTwo.raw.usdPrice,
        ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice
    }

    // console.log(responseOne.raw);
    // console.log(responseTwo.raw);
    return res.status(200).json(usdPrices);
});

app.get("/tokenBalances", async (req, res) => {
  const { query } = req;

  const balanceOne = await Moralis.Web3API.account.getTokenBalances({
    address: query.addressOne,
  });
  const balanceTwo = await Moralis.Web3API.account.getTokenBalances({
    address: query.addressTwo,
  });

  const tokenBalances = {
    tokenOne: balanceOne[0].balance,
    tokenTwo: balanceTwo[0].balance,
  };

  return res.status(200).json(tokenBalances);
});


Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});


module.exports.handler = serverless(app);

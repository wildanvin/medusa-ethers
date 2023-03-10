# Use Medusa with ethers.js

This repo describes the basic workflow to use medusa from scripts using only ethers.js.

The application contract that we will be using is [OnlyFiles.sol](https://github.com/medusa-network/medusa-app/blob/main/src/contracts/OnlyFiles.sol) from the [Live Demo](https://demo.medusanet.xyz/) created by the Medusa team.

In this example we will be working on the Arbitrum Goerli testnet but you can also use the Filecoin Hyperspace testnet

First, install dependencies with `npm install`

The steps are:

1. We encrypt our text by running `node encrypt.mjs`. We have to copy our encrypted text to the `decrypt1.mjs` file.
2. We start to decrypt using `node decrypt0.mjs`. In this script we pay to view the file.
3. Step 2 triggered an event that the front end should listen, that event has the the encrypted key.
4. We copy the values from the event and update the `ciphertext` object, and finally run `decrypt1.mjs`

### [Explaining video](https://youtu.be/qlOqQPZWayo)

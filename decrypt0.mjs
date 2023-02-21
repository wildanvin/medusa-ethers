import dotenv from 'dotenv'
dotenv.config()

import { Medusa } from '@medusa-network/medusa-sdk'
import { ethers } from 'ethers'
import { abi, applicationAddress } from './constants.mjs'

// Hyperspace Testnet Medusa Address = "0xd466a3c66ad402aa296ab7544bce90bbe298f6a0";
// Arbitrum Testnet Medusa Address = "0xf1d5A4481F44fe0818b6E7Ef4A60c0c9b29E3118";

const medusaAddress = '0xf1d5A4481F44fe0818b6E7Ef4A60c0c9b29E3118'
// const provider = new ethers.providers.JsonRpcProvider(
//   'https://api.hyperspace.node.glif.io/rpc/v1'
// )

const provider = new ethers.providers.JsonRpcProvider(
  `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
)

const signer = new ethers.Wallet(process.env.PRIVATE_KEY_2).connect(provider)

const medusa = await Medusa.init(medusaAddress, signer)

//Now we start to decrypt the message
// Prompt a user to sign a message with their wallet and derive their medusa keypair from their (deterministic) signature

const keypair = await medusa.signForKeypair()

let evmPoint = null
const { x, y } = medusa.keypair.pubkey.toEvm()
evmPoint = { x, y }

//To decrypt, you have to pass through the dApp you are building; the smart contract that originally submits a ciphertext is the only account that can request reencryption of that ciphertext.

const onlyFiles = new ethers.Contract(applicationAddress, abi, signer)

const price = ethers.utils.parseEther('0.01')

//
const result = await onlyFiles
  .buyListing(161 /* <------- Change the cipherID here */, evmPoint, {
    value: price,
  })
  .then((transaction) => {
    console.log(transaction)

    // Listen to the 'ListingDecryption' event
    onlyFiles.on('ListingDecryption', (requestId, cipher, event) => {
      console.log(
        `requestId = ${requestId}
    cipher: 
    ${JSON.stringify(cipher)} 
    
    blockNumber = ${event.blockNumber}`
      )
    })
  })
  .catch((error) => {
    console.error(error)
  })

//Now we need to listen to the event, in the event there is the encrypted key

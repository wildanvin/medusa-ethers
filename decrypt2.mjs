import dotenv from 'dotenv'
dotenv.config()

import { Medusa } from '@medusa-network/medusa-sdk'
import { ethers, BigNumber } from 'ethers'
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

//Now we have the ciphertext from the event

const ciphertext = {
  random: {
    x: BigNumber.from(
      '0x34DBF0FB80BC4216686ECB8C46B8D0F1B6D45EECDCA387F579C4AEF20B9C78E'
    ),
    y: BigNumber.from(
      '0x1C986273FEB639A2097DC79C90FBB1BBD2B1508B88FD67A1F6DD68E8EDE81557'
    ),
  },
  cipher: BigNumber.from(
    '0x65FBD46AE46BF33C13C9EA4DBD49EBED6FCA7E2B6C3FDCA3B9157AE884EF48D'
  ),
  random2: {
    x: BigNumber.from(
      '0x34DBF0FB80BC4216686ECB8C46B8D0F1B6D45EECDCA387F579C4AEF20B9C78E'
    ),
    y: BigNumber.from(
      '0x1C986273FEB639A2097DC79C90FBB1BBD2B1508B88FD67A1F6DD68E8EDE81557'
    ),
  },
  dleq: {
    f: BigNumber.from('0x00'),
    e: BigNumber.from('0x00'),
  },
}

const blob = new Uint8Array([
  6, 81, 11, 142, 60, 159, 173, 90, 10, 43, 68, 131, 65, 38, 73, 141, 8, 238,
  93, 116, 208, 15, 251, 198, 19, 95, 249, 224, 141, 198, 8, 24, 108, 56, 13,
  243, 180, 41, 8, 226, 43, 5, 77, 196, 161, 81, 66, 218, 15, 148, 248, 175,
  180, 47, 123, 171, 130, 124, 6, 61, 95, 95,
])

const decryptedBytes = await medusa.decrypt(ciphertext, blob)
const plaintext = new TextDecoder().decode(decryptedBytes)

console.log(`Show me the text: ${plaintext}`)

import dotenv from 'dotenv'
dotenv.config()

import { Medusa } from '@medusa-network/medusa-sdk'
import { ethers, BigNumber } from 'ethers'

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
      '0x2ce01487a632325a27fc1c3056acf3ed03697f3845ebfa94a92614937b43139a'
    ),
    y: BigNumber.from(
      '0x286d9508e0b88a2a9a6a806a8d6aee3a3a69134aec30b3ec11476bec39d25256'
    ),
  },
  cipher: BigNumber.from(
    '0x909811a4516fb709923a44ac1fa1d15ba24446716384d4ac3d459bf9e248973a'
  ),
  random2: {
    x: BigNumber.from(
      '0x2ce01487a632325a27fc1c3056acf3ed03697f3845ebfa94a92614937b43139a'
    ),
    y: BigNumber.from(
      '0x286d9508e0b88a2a9a6a806a8d6aee3a3a69134aec30b3ec11476bec39d25256'
    ),
  },
  dleq: {
    f: BigNumber.from('0x00'),
    e: BigNumber.from('0x00'),
  },
}

const blob = new Uint8Array([
  161, 54, 97, 85, 81, 117, 150, 122, 157, 125, 81, 46, 112, 188, 178, 224, 207,
  99, 149, 239, 122, 85, 170, 235, 21, 3, 151, 101, 63, 41, 24, 98, 29, 197, 21,
  215, 150, 140, 43, 237, 215, 156, 143, 63, 226, 152, 121, 252, 116, 64, 145,
  160, 73, 40, 40, 177, 180, 212, 123, 204, 213, 84, 198, 141, 207,
])

const decryptedBytes = await medusa.decrypt(ciphertext, blob)
const plaintext = new TextDecoder().decode(decryptedBytes)

console.log(`Show me the text: ${plaintext}`)

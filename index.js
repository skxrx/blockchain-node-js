import Blockchain from './src/blockchain'
import Transaction from './src/transaction'
import { createWallet, validateWallet } from './src/wallet'

const BLOCKCHAIN = new Blockchain()

const myWallet = createWallet()
const aliceWallet = createWallet()

console.log(
  'is the myWallet from privateKey equals to publicKey?',
  validateWallet(myWallet.privateKey, myWallet.publicKey)
)

const tx1 = new Transaction(myWallet.publicKey, aliceWallet.publicKey, 60)

tx1.signTransaction(myWallet.keyPair)

BLOCKCHAIN.addTransaction(tx1)

console.log('starting the miner of block 1...')
BLOCKCHAIN.minePendingTransactions(myWallet.publicKey)

const tx2 = new Transaction(myWallet.publicKey, aliceWallet.publicKey, 80)
tx2.signTransaction(myWallet.keyPair)
BLOCKCHAIN.addTransaction(tx2)
console.log('starting the miner of block 2...')
BLOCKCHAIN.minePendingTransactions(myWallet.publicKey)

const tx3 = new Transaction(myWallet.publicKey, aliceWallet.publicKey, 100)
tx3.signTransaction(myWallet.keyPair)
BLOCKCHAIN.addTransaction(tx3)
console.log('starting the miner of block 3...')
BLOCKCHAIN.minePendingTransactions(myWallet.publicKey)

console.log(
  "Balance of Alice's account is: ",
  BLOCKCHAIN.getBalanceOfAddress(aliceWallet.publicKey)
)

console.log('is the chain valid? ' + BLOCKCHAIN.isChainValid())

BLOCKCHAIN.chain[1].transactions[0].amount = 200

console.log('is the chain still valid? ' + BLOCKCHAIN.isChainValid())

console.log(JSON.stringify(BLOCKCHAIN, null, 4))

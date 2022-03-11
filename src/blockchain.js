import Block from './block'
import Transaction from './transaction'

export default class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 3
    this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], '')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  getHeight() {
    return this.chain.length - 1
  }

  getBlock(height) {
    return this.chain[height]
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('transaction must include _from and _to addresses')
    }

    if (!transaction.isValid()) {
      throw new Error('cant add invalid transaction')
    }

    this.pendingTransactions.push(transaction)
  }

  minePendingTransactions(miningRewardAddress) {
    const latesBlock = this.getBlock(this.getHeight())

    let block = new Block(Date.now(), this.pendingTransactions, latesBlock.hash)

    block.mineBlock(this.difficulty)

    console.log('### block mined successfully')
    this.chain.push(block)

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ]
  }

  getBalanceOfAddress(address) {
    let balance = 0
    for (let block of this.chain) {
      for (let transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount
        }
        if (transaction.toAddress === address) {
          balance += transaction.amount
        }
      }
    }
    return balance
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (!currentBlock.hasValidTransactions()) {
        return false
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`hash not equal: ${JSON.stringify(currentBlock)}`)
        return false
      }

      if (currentBlock.previousHash !== previousBlock.calculateHash()) {
        console.log(`previous hash isnt right: ${JSON.stringify(currentBlock)}`)
        return false
      }
    }
    return true
  }
}

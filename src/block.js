const SHA256 = require('crypto-js/sha256')

export default class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp
    this.transactions = transactions
    this.previousHash = previousHash
  }

  calculateHash() {}
}

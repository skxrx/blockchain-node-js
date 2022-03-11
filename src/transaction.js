const SHA256 = require('crypto-js/sha256')
const Elliptic = require('elliptic')

const ec = Elliptic.ec('secp256k1')

export default class transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount)
  }

  signTransaction(signingKey) {
    if (this.fromAddress === null) return true

    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('you can sign txes only for your wallet...')
    }

    this.hash = this.calculateHash()
    const sign = signingKey.sign(this.hash, 'base64')

    this.signature = sign.toDER('hex')

    console.log(`###signature: ${this.signature}`)
  }
}

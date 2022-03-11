const Elliptic = require('elliptic')

const ec = Elliptic.ec('secp256k1')

export function createWallet() {
  const keyPair = ec.genKeyPair()
  const publicKey = keyPair.getPublic('hex')
  const privateKey = keyPair.getPrivate('hex')

  return {
    publicKey,
    privateKey,
    keyPair,
  }
}

export function validateWallet(privateKey, publicKey) {
  const key = ec.keyFromPrivate(privateKey)

  const publicKeyFromPrivate = key.getPublic('hex')

  return publicKeyFromPrivate === publicKey
}

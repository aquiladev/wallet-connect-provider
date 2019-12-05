const crypto = require("crypto")
const {
    convertHexToArrayBuffer,
    convertArrayBufferToBuffer,
    convertUtf8ToBuffer,
    convertBufferToUtf8,
    convertBufferToHex,
    convertHexToBuffer,
    concatBuffers,
    removeHexPrefix
} = require("@walletconnect/utils");

const AES_ALGORITHM = "AES-256-CBC"
const HMAC_ALGORITHM = "SHA256"

function randomBytes(length) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(length, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

async function generateKey(length) {
    const _length = (length || 256) / 8
    const buffer = await randomBytes(_length)
    const hex = convertBufferToHex(buffer, true)
    const result = convertHexToArrayBuffer(hex)

    return result
}

async function createHmac(data, key) {
    const hmac = crypto.createHmac(HMAC_ALGORITHM, key)
    hmac.update(data)
    const hex = hmac.digest("hex")
    const result = convertHexToBuffer(hex)

    return result
}

async function verifyHmac(payload, key) {
    const cipherText = convertHexToBuffer(payload.data)
    const iv = convertHexToBuffer(payload.iv)
    const hmac = convertHexToBuffer(payload.hmac)
    const hmacHex = convertBufferToHex(hmac, true)
    const unsigned = concatBuffers(cipherText, iv)
    const chmac = await createHmac(unsigned, key)
    const chmacHex = convertBufferToHex(chmac, true)

    if (removeHexPrefix(hmacHex) === removeHexPrefix(chmacHex)) {
        return true
    }

    return false
}

async function aesCbcEncrypt(data, key, iv) {
    const encoding = "hex"
    const input = data.toString(encoding)
    const cipher = crypto.createCipheriv(AES_ALGORITHM, key, iv)
    let encrypted = cipher.update(input, encoding, encoding)
    encrypted += cipher.final(encoding)
    const result = new Buffer(encrypted, encoding)
    return result
}

async function aesCbcDecrypt(data, key, iv) {
    const decipher = crypto.createDecipheriv(AES_ALGORITHM, key, iv)
    let decrypted = decipher.update(data)
    decrypted = concatBuffers(decrypted, decipher.final())
    const result = decrypted
    return result
}

async function encrypt(data, key) {
    const _key = convertArrayBufferToBuffer(key)

    const ivArrayBuffer = await generateKey(128)
    const iv = convertArrayBufferToBuffer(ivArrayBuffer)
    const ivHex = convertBufferToHex(iv, true)

    const contentString = JSON.stringify(data)
    const content = convertUtf8ToBuffer(contentString)

    const cipherText = await aesCbcEncrypt(content, _key, iv)
    const cipherTextHex = convertBufferToHex(cipherText, true)

    const unsigned = concatBuffers(cipherText, iv)
    const hmac = await createHmac(unsigned, _key)
    const hmacHex = convertBufferToHex(hmac, true)

    return {
        data: cipherTextHex,
        hmac: hmacHex,
        iv: ivHex
    }
}

async function decrypt(payload, key) {
    const _key = convertArrayBufferToBuffer(key)

    if (!_key) {
        throw new Error("Missing key: required for decryption")
    }

    const verified = await verifyHmac(payload, _key)
    if (!verified) {
        return null
    }

    const cipherText = convertHexToBuffer(payload.data)
    const iv = convertHexToBuffer(payload.iv)
    const buffer = await aesCbcDecrypt(cipherText, _key, iv)
    const utf8 = convertBufferToUtf8(buffer)
    let data
    try {
        data = JSON.parse(utf8)
    } catch (error) {
        return null
    }

    return data
}

module.exports = {
    randomBytes,
    generateKey,
    createHmac,
    verifyHmac,
    aesCbcEncrypt,
    aesCbcDecrypt,
    encrypt,
    decrypt
}
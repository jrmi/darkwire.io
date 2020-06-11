import Crypto from './crypto';
import { Crypto as CryptoPolyfill, CryptoKey } from '@peculiar/webcrypto';

const crypto = new CryptoPolyfill();

function _arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

describe('Crypto', () => {
  beforeEach(() => {
    window.crypto = crypto;
  });

  it('should create un instance', () => {
    new Crypto();
  });

  it('should convert string to arrayBuffer', () => {
    const crypto = new Crypto();
    const result = crypto.convertStringToArrayBufferView('test');
    expect(result).toEqual(new Uint8Array([116, 101, 115, 116]));
  });

  it('should convert arrayBuffer to string', () => {
    const crypto = new Crypto();
    const result = crypto.convertArrayBufferViewToString(new Uint8Array([116, 101, 115, 116]));
    expect(result).toEqual('test');
  });

  it('should create key pair', async () => {
    const crypto = new Crypto();
    const result = await crypto.createEncryptDecryptKeys();
    expect(JSON.parse(JSON.stringify(result))).toEqual({
      privateKey: {
        algorithm: {
          hash: { name: 'SHA-1' },
          modulusLength: 2048,
          name: 'RSA-OAEP',
          publicExponent: { '0': 1, '1': 0, '2': 1 },
        },
        extractable: true,
        type: 'private',
        usages: ['decrypt', 'unwrapKey'],
      },
      publicKey: {
        algorithm: {
          hash: { name: 'SHA-1' },
          modulusLength: 2048,
          name: 'RSA-OAEP',
          publicExponent: { '0': 1, '1': 0, '2': 1 },
        },
        extractable: true,
        type: 'public',
        usages: ['encrypt', 'wrapKey'],
      },
    });
  });

  it('should create secret key', async () => {
    const crypto = new Crypto();
    const result = await crypto.createSecretKey();
    expect(JSON.parse(JSON.stringify(result))).toEqual({
      algorithm: { length: 256, name: 'AES-CBC' },
      extractable: true,
      type: 'secret',
      usages: ['encrypt', 'decrypt'],
    });
  });

  it('should create signing key', async () => {
    const crypto = new Crypto();
    const result = await crypto.createSigningKey();
    expect(JSON.parse(JSON.stringify(result))).toEqual({
      algorithm: { hash: { name: 'SHA-256' }, length: 512, name: 'HMAC' },
      extractable: true,
      type: 'secret',
      usages: ['sign', 'verify'],
    });
  });

  /* it('should encrypt/decrypt message', async () => {
    const crypto = new Crypto();

    const data = crypto.convertStringToArrayBufferView('test');
    const { privateKey, publicKey } = await crypto.createEncryptDecryptKeys();
    const iv = await crypto.crypto.getRandomValues(new Uint8Array(16));

    const crypted = await crypto.encryptMessage(data, publicKey, iv);
    //console.log(_arrayBufferToBase64(new Uint8Array(result)));
    //console.log(crypto.convertArrayBufferViewToString(result));

    const decrypted = await crypto.decryptMessage(crypted, privateKey, iv);

    console.log(decrypted);
    console.log(crypto.convertArrayBufferViewToString(new Uint8Array(decrypted)));

    //expect(_arrayBufferToBase64(new Uint8Array(result))).toEqual();
  });*/
});

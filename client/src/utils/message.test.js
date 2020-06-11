import { prepare, process } from './message';
import { Crypto as CryptoPolyfill } from '@peculiar/webcrypto';
import Crypto from './crypto';

const crypto = new CryptoPolyfill();

/*jest.mock('./Crypto', () => {
  return jest.fn().mockImplementation(() => {
    window.crypto = crypto;
    return new Crypto();
  });
});*/

describe('Crypto', () => {
  beforeEach(() => {
    window.crypto = crypto;
  });

  it.skip('should encrypt/decrypt a message', async () => {
    const message = 'test';
    const state = { user: { username: 'alan' } };
    const encrypted = await prepare(message, state);
    console.log(encrypted);
  });
});

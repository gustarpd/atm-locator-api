/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import forge from 'node-forge';
import fs from 'fs';
import OAuth from 'mastercard-oauth1-signer';
import dotenv from 'dotenv';
dotenv.config();

export class GetOAuth {
  static #consumerKey = process.env.CONSUMER_KEY as string;
  static #keyStorePath = process.env.KEY_STORE_PATH as string; // aqui vai o caminho onde está o seu certificado
  static #keyAlias = process.env.AUTH_KEY_ALIAS;
  static #keyPassword = process.env.AUTH_KEY_PASSWORD;

  static generatePrivateKey() {
    const p12Content = fs.readFileSync(this.#keyStorePath, 'binary');
    const p12Asn1 = forge.asn1.fromDer(p12Content, false);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, this.#keyPassword);
    const bags = p12.getBags({
      friendlyName: 'keyalias',
      bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
    }).friendlyName;

    let keyObj = bags ? bags[0] : undefined;

    if (keyObj) {
      const signingKey = forge.pki.privateKeyToPem(keyObj.key as any);
      return signingKey;
    } else {
      throw new Error('Key object not found.');
    }
  }

  static oauthHeaderAuthorization(url: string) {
    const method = 'GET';
    const payload = '';
    const authHeader = OAuth.getAuthorizationHeader(
      url,
      method,
      payload,
      this.#consumerKey,
      this.generatePrivateKey()
    );

    return authHeader;
  }
}

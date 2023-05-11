/* eslint-disable no-undef */
import forge from 'node-forge'
import fs from 'fs';
import oauth from 'mastercard-oauth1-signer'
import dotenv from 'dotenv';
dotenv.config()
export class GetOAuth {
  static #consumerKey =
    process.env.CONSUMER_KEY;
  static #keyStorePath =
    '/home/gusta/Downloads/MCD_Sandbox_asd_API_Keys/asd-sandbox.p12';
  static #keyAlias = process.env.AUTH_KEY_ALIAS;
  static #keyPassword = process.env.AUTH_KEY_PASSWORD;

  static generatePrivateKey() {
    const p12Content = fs.readFileSync(this.#keyStorePath, 'binary');
    const p12Asn1 = forge.asn1.fromDer(p12Content, false);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, this.#keyPassword);
    const keyObj = p12.getBags({
      friendlyName: 'keyalias',
      bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
    }).friendlyName[0];
    const signingKey = forge.pki.privateKeyToPem(keyObj.key);

    return signingKey;
  }

  static oauthHeaderAuthorization(url) {
    const method = 'GET';
    const payload = '';
    const authHeader = oauth.getAuthorizationHeader(
      url,
      method,
      payload,
      this.#consumerKey,
      this.generatePrivateKey()
    );

    return authHeader;
  }
}

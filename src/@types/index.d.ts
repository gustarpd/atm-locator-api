declare module 'mastercardOAuth' {
  export class GetOAuth {
    static generatePrivateKey(): string;
    static oauthHeaderAuthorization(url: string): string;
  }
}

declare module 'mastercard-oauth1-signer' {
  export function getAuthorizationHeader(
    url: string,
    method: string,
    payload: string,
    consumerKey: string,
    privateKey: string
  ): string;
}

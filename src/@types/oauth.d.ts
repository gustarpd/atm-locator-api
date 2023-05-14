declare module 'mastercard-oauth1-signer' {
  export function getAuthorizationHeader(
    url: string,
    method: string,
    payload: string,
    consumerKey: string,
    privateKey: string
  ): string
}
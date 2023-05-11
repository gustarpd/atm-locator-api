import dotenv from 'dotenv';
dotenv.config();

export const GOOGLE_OAUTH_CLIENT_ID = process.env
  .GOOGLE_OAUTH_CLIENT_ID as unknown as string;
export const GOOGLE_OAUTH_CLIENT_SECRET = process.env
  .GOOGLE_OAUTH_CLIENT_SECRET as unknown as string;
export const GOOGLE_OAUTH_REDIRECT = process.env
  .GOOGLE_OAUTH_REDIRECT as unknown as string;

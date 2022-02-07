export const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
  ? process.env.REACT_APP_S3_BUCKET
  : '';
export const REGION = process.env.REACT_APP_REGION;
export const SIZE_LIMIT = 50000000;
export const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
export const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
export const ACL = 'public-read';

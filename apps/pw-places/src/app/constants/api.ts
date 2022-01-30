export const { NX_BACKEND_ADDRESS: BACKEND_ADDRESS } = process.env;
export const API = `${BACKEND_ADDRESS}/api`;
export const ASSETS = `${BACKEND_ADDRESS}/assets`;

console.log(BACKEND_ADDRESS);

// src/utils.ts

export const satsToMsats = (sats: number) => sats * 1000;
export const mSatsToSats = (mSats: number) => mSats / 1000 + 'sats';

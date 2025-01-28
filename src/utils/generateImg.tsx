import CryptoJS from "crypto-js";

export const Avatar = (email: string): string => {
  const hash = CryptoJS.MD5(email.trim().toLowerCase()).toString();
  return `https://www.gravatar.com/avatar/${hash}?s=40&d=identicon`;
};

export const ImagemContent = (): string => {
  return `https://picsum.photos/600/400?random=${Math.random()}`;
};

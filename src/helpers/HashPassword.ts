import { createHmac } from "crypto";

export const hashPassword = (senha: string): string => {
  const { CRYPTO_ALGORITH, SECRET } = process.env;
  return createHmac(CRYPTO_ALGORITH, SECRET).update(senha).digest("hex");
}
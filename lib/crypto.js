import crypto from "crypto";

const KEY = Buffer.from(process.env.CRYPTO_KEY, "hex");
const ALGO = "aes-256-gcm";

export function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(data) {
  const buf = Buffer.from(data, "base64");
  const iv = buf.slice(0, 12);
  const tag = buf.slice(12, 28);
  const encrypted = buf.slice(28);
  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(tag);
  return decipher.update(encrypted, null, "utf8") + decipher.final("utf8");
}

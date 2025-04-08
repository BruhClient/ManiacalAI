

import { env } from "@/data/env/server";
import crypto from "crypto";

const ENCRYPTION_KEY = env.PROJECT_PASSWORD_SECRET; // 32 bytes
const IV_LENGTH = 16; // AES block size

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);

    console.log(ENCRYPTION_KEY)
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }
  
  export function decrypt(text: string): string {
    const [ivHex, encryptedHex] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

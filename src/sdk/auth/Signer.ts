import * as crypto from "node:crypto";

export class Signer {
  constructor(private secret: string) {}
  /**
   * Firma un string (por ejemplo query string) usando HMAC SHA256.
   */
  sign(message: string): string {
    return crypto
      .createHmac("sha256", this.secret)
      .update(message)
      .digest("hex");
  }
}

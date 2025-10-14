import { ApiConfig } from "../config/ApiConfig.ts";
import { Signer } from "../auth/Signer.ts";
//import { ApiError } from "../errors/ApiError";

export class HttpClient {
  constructor(private config: ApiConfig, private signer: Signer) {}

  private buildQuery(params: Record<string, any>): string {
    // Convierte un objeto en query string ordenada
    const keys = Object.keys(params).sort();
    return keys.map((k) => `${k}=${encodeURIComponent(params[k])}`).join("&");
  }

  async request<T>(
    method: "GET" | "POST" | "DELETE" | "PUT",
    path: string,
    params: Record<string, any> = {},
    authRequired: boolean = false
  ): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;

    let query = "";

    if (Object.keys(params).length > 0) {
      query = `?${this.buildQuery(params)}`;
    }

    // Si el endpoint requiere autenticación, firmar + añadir timestamp
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authRequired) {
      const timestamp = Date.now();
      params.timestamp = timestamp;
      const q = this.buildQuery(params);
      const signature = this.signer.sign(q);
      query = `?${q}&signature=${signature}`;
      headers["X-MBX-APIKEY"] = this.config.apiKey;
    }

    const fullUrl = `${url}${query}`;

    const resp = await fetch(fullUrl, {
      method,
      headers,
    });

    const text = await resp.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch (e) {
      //      throw new ApiError(resp.status, `No JSON: ${text}`);
    }

    if (!resp.ok) {
      // Puedes mapear errores específicos, rate limit, etc.
      //      throw new ApiError(resp.status, data);
    }

    return data as T;
  }
}

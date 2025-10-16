import { Api } from "../deps.ts";
import { gird } from "../aster/grid.ts";
import { USER_ID } from "../helpers/constants.ts";
import { BOT_TOKEN } from "../helpers/constants.ts";

const api = new Api(BOT_TOKEN);
// Aster WebSocket suscripción - Deno
const WS_BASE_URL = "wss://sstream.asterdex.com";

const listenKey = await gird.generateListenKey();

// Crear la conexión WebSocket (para un stream combinado)
const ws = new WebSocket(`${WS_BASE_URL}/ws/${listenKey.listenKey}`);

export const openWs = () => {
  ws.onopen = () => {
    // console.log("✅ Conectado al WebSocket de Aster");

    // Mensaje para suscribirse a streams
    const subscribeMessage = {
      method: "SUBSCRIBE",
      params: [""],
      id: 1,
    };

    // Enviar el mensaje de suscripción
    ws.send(JSON.stringify(subscribeMessage));
  };

  return "conected";
};

ws.onmessage = async (event) => {
  const message = JSON.parse(event.data);

  // Manejar la respuesta de confirmación de suscripción
  if (message.id === 1 && message.result === null) {
    return await api.sendMessage(USER_ID, "🔔 Suscripción exitosa");
  }

  if (message.e === "executionReport") {
    await api.sendMessage(USER_ID, `${message} ${message.e}`);
    console.log(message);
  }
};

ws.onerror = (error) => {
  console.error("❌ Error de WebSocket:", error);
};

ws.onclose = (event) => {
  console.warn(
    "⚠️ Conexión cerrada. Código:",
    event.code,
    "Razón:",
    event.reason
  );
};

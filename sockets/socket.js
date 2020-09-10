const { io } = require("../index");
const { checkJWT } = require("../helpers/jwt");
const {
  userConnected,
  userDisconnected,
  saveMsg,
} = require("../controllers/socket");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");
  const [valid, uid] = checkJWT(client.handshake.headers["x-token"]);

  // Valid tpken
  if (!valid) {
    console.log("Cliente desconectado, token no encontrado");
    return client.disconnect();
  }

  // client authenticated, change status
  console.log("client authenticated");
  userConnected(uid);

  // ENTER USER TO ROOM
  // 1 GLOBAL ROOM USES IO.EMIT
  // 2 CLIENT.ID

  client.join(uid);

  // Listen personal msg
  client.on("personal-msg", async (payload) => {
    await saveMsg(payload);
    io.to(payload.to).emit("personal-msg", payload);
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    userDisconnected(uid);
  });

  // client.on("msg", (payload) => {
  //   console.log("Msg from client: ", payload);
  //   // Emit to all clients
  //   io.emit("msg", { admin: "Socket consumed" });
  // });
});

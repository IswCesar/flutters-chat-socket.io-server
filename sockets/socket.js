const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  // client.on("msg", (payload) => {
  //   console.log("Msg from client: ", payload);
  //   // Emit to all clients
  //   io.emit("msg", { admin: "Socket consumed" });
  // });
});

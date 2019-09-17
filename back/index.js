const io = require("socket.io");
const server = io.listen(3000);

server.on("connection", socket => {
  console.log("### new user detected ###");
  socket.emit("welcome", "ok");

  socket.on("newUser", user => {
      console.log(`# ${user.name} is now connected #`);
  });

  socket.on("userType", ({user, value}) => {
      console.log(`# ${user.name} type ${value}`);
  })
});

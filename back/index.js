const io = require("socket.io");
const server = io.listen(3000);

let initDroneState = {
  direction: 0,
  power: 0,
  color: "black"
};
let droneState = initDroneState;

server.on("connection", socket => {
  console.log("### new user detected ###");
  socket.emit("welcome", droneState);

  socket.on("newUser", user => {
    console.log(`# ${user.name} from team ${user.color} is now connected #`);
    socket.emit("initCockpit", droneState);
  });

  socket.on("action", (user, newDroneState) => {
    droneState = { ...newDroneState, color: user.color };
    socket.broadcast.emit("newState", droneState);
  });

  setInterval(() => {
    console.dir(droneState);
  }, 1000);
});

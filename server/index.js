//created server variable
const { Server } = require("socket.io");

//input output
const io = new Server(8000, {
  cors: true,
})

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on('connection', socket=>{
  console.log("socket connected", socket.id);
  socket.on('room:join', (data) => {
    const { email, room } = data
    emailToSocketIdMap.set(email, socket.id)
    socketIdToEmailMap.set(socket.id, email)
    io.to(room).emit('user:joined', {email, id: socket.id});
    socket.join(room);
    io.to(socket.id).emit('room:join', data);
  });
});


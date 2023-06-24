import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import ACTIONS from './src/Actions.js';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('dist'))
app.use((req ,res , next)=>{
  // const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

const userSocketMap = [];
let previouCode = null;

function getAllConnectedClients(teamID) {
  return (Array.from(io.sockets.adapter.rooms.get(teamID)) || []).map((socketID) => {
    return {
      socketID,
      username: userSocketMap.find(user => user.socketID === socketID).username,
    }
  })
}

io.on('connection', (socket) => {


  socket.on(ACTIONS.CODE_CHANGE , ({teamID , code})=>{
    // console.log("came===== Server -- with code = " , code);
    previouCode = code
    // console.log("the previous code is set to " , previouCode);
    socket.broadcast.emit(ACTIONS.CODE_CHANGE , { teamID,code})
  })


  socket.on(ACTIONS.JOIN, ({ teamID, userName }) => {
    const existingUser = userSocketMap.find(user => user.username === userName);
    if (existingUser) {
      // User with the same username already exists
      // Handle the error or reject the connection
      
      // console.log(`User with the username ${userName} already exists`);
      return;
    }

    userSocketMap.push({ socketID: socket.id, username: userName });
    socket.join(teamID);
    const clients = getAllConnectedClients(teamID);

    
    clients.forEach(({ socketID }) => {
        io.to(socketID).emit(ACTIONS.JOINED, {
          clients,
          userName,
          socketID: socket.id,
        })
      })

      console.log("going to call new code from server with previous code" , previouCode);
      setTimeout(()=>{
        socket.emit('newcode' , { socketid : socket.id ,previouCode});
        console.log("newcode is called ");
      } , 2000)

      setTimeout(()=>{
        socket.emit('newcode' , { socketid : socket.id ,previouCode});
        console.log("newcode is called ");
      } , 3000)

  
    socket.on('disconnecting' , ()=>{
       const teams =  [...socket.rooms]

       teams.forEach((teamID)=>{
        socket.in(teamID).emit(ACTIONS.DISCONNECTED , {
            socketID: socket.id,
            userName : userSocketMap.find(user => { if(user.socketID === socket.id) return user }).username,
        })
       })

       delete userSocketMap[socket.id];
       socket.leave();
    })

  })
})


const PORT = process.env.PORT || 5000
server.listen(PORT, () => { console.log(" server is listening at port:", PORT) })

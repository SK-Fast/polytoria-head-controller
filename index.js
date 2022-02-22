const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs');
const open = require('open');

async function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}


app.use(express.static(__dirname  + "/"))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.once('connection', async (socket) => {
  await fs.writeFileSync(__dirname + "/key.txt","None")
  await open(__dirname + "/keyListener.vbs")
  console.log('Key Connected! ID: ' + socket.id);

  socket.on('disconnect', () => {
    console.log(socket.id + ' has Disconnected.');
  });

  socket.on("stateChanged", async (state) => {
    if (state == "Forward") {
      await fs.writeFileSync(__dirname + "/key.txt","W")
      return
    }

    if (state == "Left") {
      await fs.writeFileSync(__dirname + "/key.txt","A")
      return
    }

    if (state == "Right") {
      await fs.writeFileSync(__dirname + "/key.txt","D")
      return
    }

    if (state == "Jump") {
      await fs.writeFileSync(__dirname + "/key.txt"," ")
      return
    }

    await fs.writeFileSync(__dirname + "/key.txt","None")
  });
});

server.listen(6942, () => {
  console.log('listening on *:6942');
});
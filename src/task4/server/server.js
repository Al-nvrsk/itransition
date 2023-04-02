import postgres from 'postgres'
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import path from 'path';
import { postgresConnect } from './db/db.js';
import router from './routes/index.js'
import { errorHandlingMiddleWare } from './middleWare/errorHandlingMiddleWare.js'
dotenv.config()
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });
import { Server } from "socket.io"
import { createServer } from "http"
import { disconnect, action, createRoom, getRoomList, joinRoom } from '../../task7/server/index.js'

// async function startServer() {
const app = express();
const port = Number(process.env.SERVER_PORT) || 5001
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandlingMiddleWare)
// wsServer(app)
const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.BASE_HOST,
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (connection) {
  console.log('game server connected')
  connection.on('createRoom', createRoom(connection))
  connection.on('getRoomList', getRoomList(connection.id))
  connection.on('leaveRoom', disconnect(connection))
  connection.on('joinRoom', joinRoom(connection))
  connection.on("action", action(connection));
  connection.on("disconnecting", disconnect(connection))
});

postgresConnect()

app.get('/api', (_, res) => {
  res.json('👋 Hey from the server :)');
});

httpServer.listen(port, () => {
  console.log('\x1b[32m', `  ➜ 🎸 Server is listening on port: ${port}`, '\x1b[0m');
});
// }

// startServer()


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
dotenv.config({ path: path.join(__dirname, '..', '..','..', '.env') });

async function startServer() {
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 5000
  app.use(cors())
  app.use(express.json())
  app.use('/api', router)
  app.use(errorHandlingMiddleWare)

  postgresConnect()

  app.get('/api', (_, res) => {
    res.json('👋 Hey from the server :)');
  });

app.listen(port, () => {
  console.log('\x1b[32m', `  ➜ 🎸 Server is listening on port: ${port}`, '\x1b[0m');
});
}

startServer()

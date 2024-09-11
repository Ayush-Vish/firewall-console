import { connectToDB } from '@firewall/db';
import express from 'express';
import cookieParser from 'cookie-parser';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
import authRoutes from "./routes/auth.route"
import nodeRoutes from "./routes/node.routes"
import logRoutes from "./routes/log.route"
connectToDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});
app.use('/auth', authRoutes);
app.use('/node', nodeRoutes);
app.use('/logs' ,logRoutes )

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

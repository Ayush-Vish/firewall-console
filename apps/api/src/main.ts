import { connectToDB } from '@firewall/db';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
import authRoutes from "./routes/auth.route"
import nodeRoutes from "./routes/node.routes"
import logRoutes from "./routes/log.route"
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger';
connectToDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend origin if needed
  credentials: true,  // Allow cookies to be sent along with the request
}));

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authRoutes);
app.use('/node', nodeRoutes);
app.use('/logs' ,logRoutes )
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

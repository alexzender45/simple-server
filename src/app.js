import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { userRoute } from './routes';
import { Database } from './db';

//
// Initialize DB
Database.db().then();

// Configs
const app = express();

// Middleware
app.enable('trust proxy');
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());

// Endpoints
app.use('/api/', userRoute);

export default app;

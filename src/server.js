import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import bodyParser from 'body-parser';
import pino from 'pino';

import userRoutes from './user.routes';
import mainRoutes from './main.routes';


const app = express();
const port = 3000;
const limiter = rateLimit({
    windowMs:  60 * 1000, // 1 minute
    limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})

app.use(compression())
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet())
app.use(cors())

app.use('v1',mainRoutes);
app.use('/v1/user',userRoutes);

app.listen(port,() => {
    console.log(`hey go to http://localhost:${port}`);
})
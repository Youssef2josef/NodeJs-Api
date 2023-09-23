import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import userRoutes from './user.routes';
import mainRoutes from "./main.routes";

const app = express();
const port = 3000;
const STATUS = {
    SUCCESS: 'OK',
    FAILURE: 'NO'
}

app.use(express.json());
app.use(bodyParser.json());
app.use(helmet())

app.use('v1',mainRoutes);
app.use('/v1/user',userRoutes);

app.listen(port,() => {
    console.log(`hey go to http://localhost:${port}`);
})
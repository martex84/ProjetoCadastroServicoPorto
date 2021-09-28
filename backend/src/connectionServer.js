import express from 'express';
import cors from 'cors';

import routes from './routes.js'

function Server() {

    const app = express();

    app.listen(3001);
    app.use(express.json());
    app.use(cors());
    app.use(routes);

    console.log("Servidor Conectado")

    return app;

}

export default Server;
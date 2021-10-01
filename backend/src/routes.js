import { Router } from "express";

import * as movimentacoesServices from './controller/movimentacoesController.js';
import * as containersServices from './controller/containersController.js'

const routes = Router();

routes.get('/movimentacao', (req, res) => {
    return movimentacoesServices.returnGet(req.query, res)
});

routes.get('/movimentacao/relatorio', (req, res) => {
    return movimentacoesServices.returnGetRelatorio(req.query, res)
});

routes.get('/containers', (req, res) => {
    return containersServices.returnGet(req.query, res);
});

routes.get('/containers/relatorio', (req, res) => {
    return containersServices.returnGetRelatorio(res);
});

routes.post('/movimentacao', (req, res) => {
    return movimentacoesServices.returnPost(req.body.data, res);
});

routes.post('/containers', (req, res) => {
    return containersServices.returnPost(req.body.data, res);
});

routes.put('/movimentacao/:index', (req, res) => {
    return movimentacoesServices.returnPut(req.body.data, req.params, res);
});

routes.put('/containers', (req, res) => {
    return containersServices.returnPut(req.body.data, res);
});

routes.delete('/movimentacao/:index', (req, res) => {
    return movimentacoesServices.returnDelete(req.body, req.params, res);
});

routes.delete('/containers', (req, res) => {
    return containersServices.returnDelete(req.body, res);
});

export default routes;
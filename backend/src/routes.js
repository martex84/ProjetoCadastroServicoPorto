import { Router } from "express";

import * as movimentacoesServices from './controller/movimentacoesController.js';
import * as containersServices from './controller/containersController.js'

const routes = Router();

routes.get('/movimentacao', (req, res) => {
    return movimentacoesServices.retornGet(req.query, res)
});

routes.get('/movimentacao/relatorio', (req, res) => {
    return movimentacoesServices.retornGetRelatorio(req.query, res)
});

routes.get('/containers', (req, res) => {
    return containersServices.retornGet(req.query);
});

routes.get('/containers/relatorio', (req, res) => {
    return containersServices.retornGetRelatorio(res);
});

routes.post('/movimentacao', (req, res) => {
    return movimentacoesServices.retornPost(req.body.data, res);
});

routes.post('/containers', (req, res) => {
    return containersServices.retornPost(req.body.data, res);
});

routes.put('/movimentacao/:index', (req, res) => {
    return movimentacoesServices.retornPut(req.body.data, req.params, res);
});

routes.put('/containers', (req, res) => {
    return containersServices.retornPut(req.body.data, res);
});

routes.delete('/movimentacao/:index', (req, res) => {
    return movimentacoesServices.retornDelete(req.body, req.params, res);
});

routes.delete('/containers', (req, res) => {
    return containersServices.delateContainer(req.body, res);
});

export default routes;
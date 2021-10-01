import { Router } from "express";
import { resolve } from "path/posix";

import * as movimentacoesServices from './services/movimentaçõesServices.js';
import * as containersServices from './services/containersService.js'

const routes = Router();

routes.get('/movimentacao', (req, res) => {
    new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar       
        resolve(movimentacoesServices.getMovimentacao(req.query));
    }).then((resolve) => {
        return res.json(resolve);
    })
});

routes.get('/movimentacao/relatorio', (req, res) => {
    new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            movimentacoesServices.getMovimentacaoRelatorio(req.query)
        );
    }).then((resolve) => {
        return res.json(resolve);
    })
});

routes.get('/containers', (req, res) => {
    new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            containersServices.getContainer(req.query)
        );
    }).then((resolve) => {
        return res.json(resolve);
    })
});

routes.post('/movimentacao', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(
            movimentacoesServices.setMovimentaçao(req.body.data)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
})

routes.post('/containers', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(
            containersServices.setContainer(req.body.data)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
})

routes.put('/movimentacao/:index', (req, res) => {
    new Promise((resolve, reject) => {
        const {
            index
        } = req.params;

        resolve(
            movimentacoesServices.updateMovimentacao(req.body.data, index)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
})

routes.put('/containers', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(
            containersServices.updateContainer(req.body.data)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
})

routes.delete('/movimentacao/:index', (req, res) => {
    new Promise((resolve, reject) => {
        const {
            index
        } = req.params;

        resolve(
            movimentacoesServices.deleteMovimentacao(req.body, index)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
})

routes.delete('/containers', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(
            containersServices.delateContainer(req.body)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
})

export default routes;
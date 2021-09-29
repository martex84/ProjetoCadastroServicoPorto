import { Router } from "express";
import { resolve } from "path/posix";

import * as movimentacoesServices from './services/movimentaçõesServices.js';

const routes = Router();

routes.get('/movimentacao', (req, res) => {
    new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar       
        resolve(movimentacoesServices.getMovimentacao(req.query));
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

routes.delete('/movimentacao/:index', (req, res) => {
    new Promise((resolve, reject) => {
        const {
            index
        } = req.params;

        resolve(
            movimentacoesServices.deleteMovimentacao(req.body.data, index)
        )
    }).then((resolve) => {
        if (resolve === true) return res.json({
            messagem: "Excluido com Sucesso!"
        });

        return res.json({
            messagem: "Falha ao Excluir!"
        });
    })
})

export default routes;
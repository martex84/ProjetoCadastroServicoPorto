import * as movimentacoesServices from '../services/movimentacoesServices.js';

async function retornGet(requisicao, res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar       
        resolve(movimentacoesServices.getMovimentacao(requisicao));
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function retornGetRelatorio(requisicao, res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            movimentacoesServices.getMovimentacaoRelatorio(requisicao)
        );
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function retornPost(requisicao, res) {
    return new Promise((resolve, reject) => {
        resolve(
            movimentacoesServices.setMovimentaçao(requisicao)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function retornPut(requisicao, params, res) {
    return new Promise((resolve, reject) => {
        const {
            index
        } = params;

        resolve(
            movimentacoesServices.updateMovimentacao(requisicao, index)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function retornDelete(requisicao, params, res) {
    return new Promise((resolve, reject) => {
        const {
            index
        } = params;

        resolve(
            movimentacoesServices.deleteMovimentacao(requisicao, index)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
}

export {
    retornPut,
    retornDelete,
    retornGet,
    retornGetRelatorio,
    retornPost
}
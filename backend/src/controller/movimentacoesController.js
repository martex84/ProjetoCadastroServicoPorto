import * as movimentacoesServices from '../services/movimentacoesServices.js';

async function returnGet(requisicao, res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar       
        resolve(movimentacoesServices.getMovimentacao(requisicao));
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function returnGetRelatorio(requisicao, res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            movimentacoesServices.getMovimentacaoRelatorio(requisicao)
        );
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function returnPost(requisicao, res) {
    return new Promise((resolve, reject) => {
        resolve(
            movimentacoesServices.setMovimentaçao(requisicao)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function returnPut(requisicao, params, res) {
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

async function returnDelete(requisicao, params, res) {
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
    returnPut,
    returnDelete,
    returnGet,
    returnGetRelatorio,
    returnPost
}
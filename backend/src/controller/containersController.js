import * as containersServices from '../services/containersService.js'

async function retornGet(requisicao, res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            containersServices.getContainer(requisicao)
        );
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function retornGetRelatorio(res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            containersServices.getRelatorioImportacaoExportacao()
        );
    }).then((resolve) => {
        return res.json(resolve);
    });
}

async function retornPost(requisicao, res) {
    return new Promise((resolve, reject) => {
        resolve(
            containersServices.setContainer(requisicao)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function retornPut(requisicao, res) {
    return new Promise((resolve, reject) => {
        resolve(
            containersServices.updateContainer(requisicao)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function retornDelete(requisicao, res) {
    return new Promise((resolve, reject) => {
        resolve(
            containersServices.delateContainer(requisicao)
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
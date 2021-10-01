import * as containersServices from '../services/containersService.js'

async function returnGet(requisicao, res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            containersServices.getContainer(requisicao)
        );
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function returnGetRelatorio(res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            containersServices.getRelatorioImportacaoExportacao()
        );
    }).then((resolve) => {
        return res.json(resolve);
    });
}

async function returnPost(requisicao, res) {
    return new Promise((resolve, reject) => {
        resolve(
            containersServices.setContainer(requisicao)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function returnPut(requisicao, res) {
    return new Promise((resolve, reject) => {
        resolve(
            containersServices.updateContainer(requisicao)
        )
    }).then((resolve) => {
        return res.json(resolve);
    })
}

async function returnDelete(requisicao, res) {
    return new Promise((resolve, reject) => {
        resolve(
            containersServices.delateContainer(requisicao)
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
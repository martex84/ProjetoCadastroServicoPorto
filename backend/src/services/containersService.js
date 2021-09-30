import * as clientesServices from './clientesServices.js';
import container from '../model/containers.js';

async function setContainer(jsonContainer) {
    const arrayRetorno = [];

    const {
        identidadeCliente,
        numeroContainer,
        tipo,
        status,
        categoria
    } = jsonContainer;

    let perfilCliente = await clientesServices.getFindOne(identidadeCliente);

    if (perfilCliente === undefined) {
        await clientesServices.setIdentidade(identidadeCliente);

        perfilCliente = await clientesServices.getFindOne(identidadeCliente);
    }

    const resultadoNumeroContainer = await container.findOne({
        where: {
            numeroContainer: numeroContainer
        }
    })

    if (resultadoNumeroContainer !== null) return {
        message: "Numero de Container já cadastrado!"
    }

    const setContainer = await container.create({
        identidadeCliente: perfilCliente.id,
        numeroContainer: numeroContainer,
        tipo: tipo,
        status: status,
        categoria: categoria
    })

    arrayRetorno.push(setContainer);

    return converterJson(arrayRetorno);

}

async function getContainer(jsonContainer) {
    let valorRecebido = {
        identidade: undefined,
        tipo: undefined
    };
    let palavra = '';
    let tipoPesquisa;
    let tamanhoPalavra = jsonContainer.busca.length;

    for (let i = 0; i <= tamanhoPalavra; i++) {//Irá percorrer toda palavra para as separar
        let temporario = 1 + i;
        let letra = jsonContainer.busca.substring(i, temporario);

        if (letra === '$') {
            valorRecebido.identidade = palavra;
            palavra = '';
        }
        else if (i === tamanhoPalavra) { //Na volta extra irá salvar o tipo
            valorRecebido.tipo = palavra;
        }
        else if (i <= tamanhoPalavra) {
            palavra = `${palavra}${letra}`;
        }
    }



    switch (valorRecebido.tipo) {
        case 'Cliente':
            const perfilCliente = await clientesServices.getFindOne(valorRecebido.identidade);

            if (perfilCliente === undefined) return {
                message: "Not Found!"
            }

            tipoPesquisa = {
                identidadeCliente: perfilCliente.id
            };
            break;

        case 'Id':
            tipoPesquisa = {
                id: valorRecebido.identidade
            }
            break;
    }

    const getValorConteiner = await container.findAll({
        where: tipoPesquisa //Irá procurar de acordo com o tipo informado pelo front end
    })

    if (getValorConteiner[0] === undefined) return undefined

    return await converterJson(getValorConteiner).then(
        (response) => {
            return response;
        }
    )
}

async function updateContainer(jsonContainer) {
    const arrayRetorno = [];

    const {
        identidadeCliente,
        numeroContainer,
        tipo,
        status,
        categoria
    } = jsonContainer;

    const perfilCliente = await clientesServices.getFindOne(identidadeCliente);

    if (perfilCliente === null) return { message: "Not Found!" };

    const resultadoNumeroContainer = await container.findOne({
        where: {
            numeroContainer: numeroContainer,
            identidadeCliente: perfilCliente.id
        }
    })

    if (resultadoNumeroContainer === null) return { message: "Not Found!" };

    const updateContainer = await container.update({
        tipo: tipo,
        status: status,
        categoria: categoria
    }, {
        where: {
            numeroContainer: numeroContainer,
            identidadeCliente: perfilCliente.id
        }
    })

    if (updateContainer === 0) return false;

    return true;
}

async function delateContainer(jsonContainer) {
    const {
        identidadeCliente,
        numeroContainer
    } = jsonContainer;

    const perfilCliente = await clientesServices.getFindOne(identidadeCliente);

    if (perfilCliente === null) return { message: "Not Found!" };

    const resultadoNumeroContainer = await container.findOne({
        where: {
            numeroContainer: numeroContainer,
            identidadeCliente: perfilCliente.id
        }
    })

    if (resultadoNumeroContainer === null) return { message: "Not Found!" };

    const delateContainer = await container.destroy({
        where: {
            numeroContainer: numeroContainer,
            identidadeCliente: perfilCliente.id
        }
    })

    if (delateContainer !== 1) return false;

    return true
}

async function converterJson(jsonContainer) {
    const valorRetorno = [];

    const { identidade } = await clientesServices.getFindById(jsonContainer[0].dataValues.identidadeCliente);

    await jsonContainer.forEach((container) => {

        const {
            dataValues
        } = container;

        valorRetorno.push({
            numeroContainer: dataValues.numeroContainer,
            identidadeCliente: identidade,
            tipo: dataValues.tipo,
            status: dataValues.status,
            categoria: dataValues.categoria
        })
    })

    return valorRetorno;
}

export {
    setContainer,
    getContainer,
    updateContainer,
    delateContainer
}

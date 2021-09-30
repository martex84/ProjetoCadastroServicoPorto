import clientes from "../model/clientes.js";
import movimentacoes from "../model/movimentacoes.js";
import * as clientesServices from './clientesServices.js';

async function setMovimentaçao(jsonMovimentacao) {
    const arrayValor = []; //Array para receber o valor final da movimentação

    const {
        identidadeCliente,
        tipoMovimentacao,
        dataInicio,
        dataTermino,
        horaInicio,
        horaTermino
    } = jsonMovimentacao;

    let perfilCliente = await clientesServices.getFindOne(identidadeCliente);

    if (perfilCliente === undefined) {
        await clientesServices.setIdentidade(identidadeCliente);

        perfilCliente = await clientesServices.getFindOne(identidadeCliente);
    }

    const setMovimentacao = await movimentacoes.create({
        identidadeCliente: perfilCliente.id,
        tipoMovimentacao: tipoMovimentacao,
        dataInicio: converterData(dataInicio, horaInicio),
        dataTermino: converterData(dataTermino, horaTermino)
    });

    arrayValor.push(setMovimentacao);

    return converterJson(arrayValor);
}

async function getMovimentacao(jsonMovimentacao) {
    let valorRecebido = {
        identidade: undefined,
        tipo: undefined
    };
    let palavra = '';
    let tipoPesquisa;
    let tamanhoPalavra = jsonMovimentacao.busca.length;

    for (let i = 0; i <= tamanhoPalavra; i++) {//Irá percorrer toda palavra para as separar
        let temporario = 1 + i;
        let letra = jsonMovimentacao.busca.substring(i, temporario);

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
            const pesquisaId = await movimentacoes.findOne({
                where: {
                    id: valorRecebido.identidade
                }
            });

            console.log(pesquisaId)

            if (pesquisaId === null) return {
                message: "Not Found!"
            }

            tipoPesquisa = {
                id: valorRecebido.identidade
            }
            break;
    }

    const getValorMovimentacao = await movimentacoes.findAll({
        where: tipoPesquisa //Irá procurar de acordo com o tipo informado pelo front end
    })

    if (getValorMovimentacao[0] === undefined) return undefined

    return converterJson(getValorMovimentacao);
}

async function updateMovimentacao(jsonMovimentacao, id) {
    const valorArray = [];
    const {
        identidadeCliente,
        tipoMovimentacao,
        dataInicio,
        dataTermino,
        horaInicio,
        horaTermino
    } = jsonMovimentacao;

    const perfilCliente = await clientesServices.getFindOne(identidadeCliente);

    if (perfilCliente === undefined) return undefined;

    const idMovimentacao = await movimentacoes.findOne({
        where: {
            id: id,
            identidadeCliente: identidadeCliente
        }
    })

    if (idMovimentacao === undefined) return { message: "Not Found!" };

    await movimentacoes.update({
        tipoMovimentacao: tipoMovimentacao,
        dataInicio: converterData(dataInicio, horaInicio),
        dataTermino: converterData(dataTermino, horaTermino)
    },
        {
            where: {
                id: id
            }
        });

    const valorUpdate = await movimentacoes.findByPk(id);

    valorArray.push(valorUpdate);

    return converterJson(valorArray)
}

async function deleteMovimentacao(jsonMovimentacao, id) {
    const {
        identidadeCliente
    } = jsonMovimentacao;

    const perfilCliente = await clientesServices.getFindOne(identidadeCliente);

    if (perfilCliente === undefined) return undefined;

    const idMovimentacao = await movimentacoes.findOne({
        where: {
            id: id,
            identidadeCliente: identidadeCliente
        }
    });

    if (idMovimentacao === undefined) return undefined;

    const valorDestroy = await movimentacoes.destroy({
        where: {
            id: id
        }
    })

    if (valorDestroy !== 1) return false;

    return true;
}

function converterData(data, hora) {
    const dataObject = {
        ano: data.substring(0, 4),
        mes: data.substring(5, 7),
        dia: data.substring(8, 10),
        horas: hora.substring(0, 2),
        minutos: hora.substring(3, 5)
    }

    return new Date(Date.UTC(
        dataObject.ano,
        dataObject.mes,
        dataObject.dia,
        dataObject.horas,
        dataObject.minutos
    ));
}

async function converterJson(jsonPrincipal) {

    let valorRetorno = [];

    await jsonPrincipal.forEach(container => {
        const {
            dataValues
        } = container;

        const {
            identidade
        } = clientesServices.getFindById(dataValues.identidadeCliente);

        function templateData(base) {
            function verificaTamanhoNumero(data) { //Verifica se o numero tem apenas uma casa e atribui o zero antes dela
                let valor = new String(data).toString();

                if (valor.length === 1) return '0' + valor;

                return valor;
            }

            const dataSeparada = {
                data: `${base.getUTCFullYear()}-${verificaTamanhoNumero(base.getUTCMonth())}-${verificaTamanhoNumero(base.getUTCDate())}`,
                hora: `${verificaTamanhoNumero(base.getUTCHours())}:${verificaTamanhoNumero(base.getUTCMinutes())}`
            };

            return dataSeparada;
        }

        valorRetorno.push({ //Inclementa o valor modificado
            id: dataValues.id,
            identidadeCliente: identidade,
            tipoMovimentacao: dataValues.tipoMovimentacao,
            dataInicio: templateData(dataValues.dataInicio).data,
            horaInicio: templateData(dataValues.dataInicio).hora,
            dataTermino: templateData(dataValues.dataTermino).data,
            horaTermino: templateData(dataValues.dataTermino).hora,
        })
    })

    return valorRetorno;
}

export {
    setMovimentaçao,
    getMovimentacao,
    updateMovimentacao,
    deleteMovimentacao
}
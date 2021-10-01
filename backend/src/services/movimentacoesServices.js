import movimentacoes from "../model/movimentacoes.js";
import * as clientesServices from './clientesServices.js';

async function setMovimentaçao(jsonMovimentacao) {
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


    return true;
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

async function getMovimentacaoRelatorio(jsonMovimentacao) {
    const {
        tipo
    } = jsonMovimentacao;

    let listaPerfilId = [];
    let listaPerfilIdentidade = [];
    let resultadoRelatorio = [];
    let objetoCliente;

    const listaTipoMovimentacao = [
        'Descarga', 'Embarque', 'Gate-In', 'Gate-Out', 'Pesagem', 'Reposicionamento', 'Scanner'
    ];

    const perfilCliente = await movimentacoes.findAll(); //Salva todos os id de clientes

    perfilCliente.map(valor => {
        const id = valor.dataValues.identidadeCliente;

        if (listaPerfilId.length === 0) listaPerfilId.push(id);

        else {
            listaPerfilId.map(idPerfil => {
                if (id !== idPerfil) listaPerfilId.push(id);
            })
        }
    })

    let contagemIdentidade = 0;

    while (contagemIdentidade < listaPerfilId.length) { //Salva todas as identidades usadas

        const valor = await clientesServices.getFindById(listaPerfilId[contagemIdentidade])

        listaPerfilIdentidade.push(valor.identidade)

        contagemIdentidade++;
    }

    contagemIdentidade = 0;


    switch (tipo) {
        case 'Cliente':
            while (contagemIdentidade < listaPerfilIdentidade.length) {
                const movimentacaoResultado = await movimentacoes.findAll({
                    where: {
                        identidadeCliente: listaPerfilId[contagemIdentidade]
                    }
                })

                if (movimentacaoResultado.length > 1) {
                    movimentacaoResultado.map(valor => {
                        const {
                            tipoMovimentacao,
                            dataInicio,
                            dataTermino,
                        } = valor.dataValues;

                        objetoCliente = {
                            identidadeCliente: listaPerfilIdentidade[contagemIdentidade],
                            tipoMovimentacao: tipoMovimentacao,
                            dataInicio: templateData(dataInicio).data,
                            horaInicio: templateData(dataInicio).hora,
                            dataTermino: templateData(dataTermino).data,
                            horaTermino: templateData(dataTermino).hora,
                        }

                        let valorRetorno = {};

                        valorRetorno[`${listaTipoMovimentacao[contagemIdentidade]}`] = objetoCliente;

                        resultadoRelatorio.push(valorRetorno);

                    })
                }
                else {
                    const {
                        tipoMovimentacao,
                        dataInicio,
                        dataTermino,
                    } = movimentacaoResultado[0].dataValues;

                    objetoCliente = {
                        identidadeCliente: listaPerfilIdentidade[contagemIdentidade],
                        tipoMovimentacao: tipoMovimentacao,
                        dataInicio: templateData(dataInicio).data,
                        horaInicio: templateData(dataInicio).hora,
                        dataTermino: templateData(dataTermino).data,
                        horaTermino: templateData(dataTermino).hora,
                    }

                    let valorRetorno = {};

                    valorRetorno[`${listaTipoMovimentacao[contagemIdentidade]}`] = objetoCliente;

                    resultadoRelatorio.push(valorRetorno);

                }

                contagemIdentidade++;

            }
            break;

        case 'Movimentacoes':
            let contagemTipo = 0;

            while (contagemTipo < listaTipoMovimentacao.length) {

                const movimentacaoResultado = await movimentacoes.findAll({
                    where: {
                        tipoMovimentacao: listaTipoMovimentacao[contagemTipo]
                    }
                })

                if (movimentacaoResultado.length > 0) {
                    if (movimentacaoResultado.length > 1) {
                        movimentacaoResultado.map(valor => {
                            const {
                                tipoMovimentacao,
                                dataInicio,
                                dataTermino,
                            } = valor.dataValues;

                            const objetoCliente = {
                                identidadeCliente: listaPerfilIdentidade[contagemIdentidade],
                                tipoMovimentacao: tipoMovimentacao,
                                dataInicio: templateData(dataInicio).data,
                                horaInicio: templateData(dataInicio).hora,
                                dataTermino: templateData(dataTermino).data,
                                horaTermino: templateData(dataTermino).hora,
                            }

                            let valorRetorno = {};

                            valorRetorno[`${listaTipoMovimentacao[contagemIdentidade]}`] = objetoCliente;

                            resultadoRelatorio.push(valorRetorno);
                        })
                    }
                    else {
                        const {
                            tipoMovimentacao,
                            dataInicio,
                            dataTermino,
                        } = movimentacaoResultado[0];

                        objetoCliente = {
                            identidadeCliente: listaPerfilIdentidade[contagemIdentidade],
                            tipoMovimentacao: tipoMovimentacao,
                            dataInicio: templateData(dataInicio).data,
                            horaInicio: templateData(dataInicio).hora,
                            dataTermino: templateData(dataTermino).data,
                            horaTermino: templateData(dataTermino).hora,
                        }

                        let valorRetorno = {};

                        valorRetorno[`${listaTipoMovimentacao[contagemIdentidade]}`] = objetoCliente;

                        resultadoRelatorio.push(valorRetorno);

                    }
                }

                let valorRetorno = {};

                valorRetorno[`${listaTipoMovimentacao[contagemTipo]}`] = objetoCliente;

                resultadoRelatorio.push(valorRetorno);

                contagemTipo++;
            }
            break;
    }

    return resultadoRelatorio;
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

    const valorUpdate = await movimentacoes.update({
        tipoMovimentacao: tipoMovimentacao,
        dataInicio: converterData(dataInicio, horaInicio),
        dataTermino: converterData(dataTermino, horaTermino)
    },
        {
            where: {
                id: id
            }
        });

    if (valorUpdate[0] !== 1) return false

    return true
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

    const {
        identidade
    } = await clientesServices.getFindById(jsonPrincipal[0].dataValues.identidadeCliente);

    await jsonPrincipal.forEach(container => {
        const {
            dataValues
        } = container;

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

function templateData(dataConverter) {
    function verificaTamanhoNumero(data) { //Verifica se o numero tem apenas uma casa e atribui o zero antes dela
        let valor = new String(data).toString();

        if (valor.length === 1) return '0' + valor;

        return valor;
    }

    const dataSeparada = {
        data: `${dataConverter.getUTCFullYear()}-${verificaTamanhoNumero(dataConverter.getUTCMonth())}-${verificaTamanhoNumero(dataConverter.getUTCDate())}`,
        hora: `${verificaTamanhoNumero(dataConverter.getUTCHours())}:${verificaTamanhoNumero(dataConverter.getUTCMinutes())}`
    };

    return dataSeparada;
}

export {
    setMovimentaçao,
    getMovimentacao,
    getMovimentacaoRelatorio,
    updateMovimentacao,
    deleteMovimentacao
}
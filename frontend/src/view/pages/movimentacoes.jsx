import React, { useEffect, useState } from 'react';
import '../../css/Movimentacoes.css';

import Header from '../components/header';
import Footer from '../components/footer';
import api from '../../services/apiAxios';

import ResutadoCompostoMovimentacao from '../components/resultadoCompostoMovimentacao';

function Movimentacoes() {
    const [identidadeCliente, setIdentidadeCliente] = useState();
    const [numeroMovimentacao, setNumeroMovimentacao] = useState("");
    const [tipoMovimentacao, setTipoMovimentacao] = useState();
    const [dataInicio, setDataInicio] = useState();
    const [horaInicio, setHoraInicio] = useState();
    const [dataTermino, setDataTermino] = useState();
    const [horaTermino, setHoraTermino] = useState();
    const [retornoMovimentacao, setRetornoMovimentacao] = useState();
    const [permisaoRetornoMovimentacao, setPermisaoRetornoMovimentacao] = useState(true);
    const [conteudoResultado, setConteudoResultado] = useState();
    const [opcaoTipoMovimentacao, setOpcaoTipoMovimentacao] = useState([
        'Embarque', 'Descarga', 'Gate-In', 'Gate-Out', 'Reposicionamento', 'Pesagem', 'Scanner'
    ])

    useEffect(() => {
        if (retornoMovimentacao !== undefined && permisaoRetornoMovimentacao === true) {
            criaObjetoRetornoComposto();
            setPermisaoRetornoMovimentacao(false);
        }
    }, [retornoMovimentacao, permisaoRetornoMovimentacao])

    function organizaOpcaoTipo(valor) {
        let arrayRetorno = [valor];

        opcaoTipoMovimentacao.forEach(opcao => {
            if (opcao !== valor) arrayRetorno.push(opcao)
        })

        setOpcaoTipoMovimentacao(arrayRetorno);
    }

    function criaObjetoRetornoComposto() {
        const valor = []
        Object.keys(retornoMovimentacao).forEach(indice => {
            valor.push(ResutadoCompostoMovimentacao(retornoMovimentacao[indice]))
        })
        setConteudoResultado(valor);

    }

    function verificaObjetoEmBranco(objeto) {
        let retornoValor = false;
        Object.keys(objeto).forEach(item => {
            if (objeto[item] === undefined || objeto[item] === "") {
                alert(`O campo ${item} está vazio!`);
                retornoValor = true;
            }
        })
        return retornoValor;
    }

    function verificaSetUpdate() {
        if (numeroMovimentacao === undefined || numeroMovimentacao === "") setApiMovimentacao();
        else updateApiMovimentacao();
    }

    function returnApiMovimentacao(tipo) {
        let valorParaPesquisa;

        switch (tipo) {
            case 'Cliente':
                valorParaPesquisa = identidadeCliente;
                break;

            case 'Id':
                valorParaPesquisa = numeroMovimentacao;
                break;

            default:
                valorParaPesquisa = undefined;
                break;
        }

        if (valorParaPesquisa === undefined || valorParaPesquisa === "") alert(`Campo "${tipo}" em branco!`)
        else {
            api
                .get(`/movimentacao?busca=${valorParaPesquisa}$${tipo}`)
                .then((response) => {
                    if (response.data.message !== undefined) return alert("Conteudo buscado não encontrado!")

                    console.log(response.data.message)
                    const valor = { ...response.data };

                    setNumeroMovimentacao(valor[0].id);
                    setTipoMovimentacao(valor[0].tipoMovimentacao);
                    organizaOpcaoTipo(valor[0].tipoMovimentacao); //Ira organizar as opções
                    setDataInicio(valor[0].dataInicio);
                    setHoraInicio(valor[0].horaInicio);
                    setDataTermino(valor[0].dataTermino);
                    setHoraTermino(valor[0].horaTermino);

                    if (Object.keys(valor).length > 1) {
                        let retornoObjeto = [];
                        Object.keys(valor).forEach(index => {
                            if (index !== 0) {
                                retornoObjeto.push(valor[index]);
                            }
                        })
                        setRetornoMovimentacao(retornoObjeto);
                        setPermisaoRetornoMovimentacao(true);
                    }

                })
                .catch(() => alert("Falha ao realizar busca!"));
        }
    }

    function setApiMovimentacao() {
        const objetoEnvio = {
            identidadeCliente: identidadeCliente,
            tipoMovimentacao: tipoMovimentacao,
            dataInicio: dataInicio,
            horaInicio: horaInicio,
            dataTermino: dataTermino,
            horaTermino: horaTermino
        }

        if (verificaObjetoEmBranco(objetoEnvio) === false) {
            api
                .post("/movimentacao", { data: objetoEnvio })
                .then(() => alert("Valor salvo com sucesso!"))
                .catch(() => alert("Falha ao salvar valor!"));
        }

    }

    function updateApiMovimentacao() {
        const objetoEnvio = {
            identidadeCliente: identidadeCliente,
            tipoMovimentacao: tipoMovimentacao,
            dataInicio: dataInicio,
            horaInicio: horaInicio,
            dataTermino: dataTermino,
            horaTermino: horaTermino
        }

        api
            .put(`/movimentacao/${numeroMovimentacao}`, { data: objetoEnvio })
            .then(() => {
                alert("Update Realizado com Sucesso!")
            })
            .catch(() => alert("Falha ao realizar Update!"));
    }

    function deleteApiMovimentacao() {
        const objetoEnvio = {
            identidadeCliente: identidadeCliente
        }

        api
            .delete(`/movimentacao/${numeroMovimentacao}`, { data: objetoEnvio })
            .then(() => alert("Movimentacao apagada com sucesso!"))
            .catch(() => alert("Falha ao apagar movimentacao!"));
    }

    return (
        <>
            <header id="headerPrincipalMovimentacao">
                <Header></Header>
            </header>
            <section id="sectionPrincipalMovimentacao">
                <div id="containerTituloMovimentacao">
                    <h2 className="tituloPrincipalMovimentacao">
                        Ações Para Movimentação
                    </h2>
                </div>
                <div id="containerEdicaoMovimentacao">
                    <div className="containerEdicaoSecundarioMovimentacao semMargin">
                        <label className="labelNomeEdicaoMovimentacao">Identidade</label>
                        <div className="containerSecundarioEdicaoMovimentacao">
                            <input type="text" className="inputEdicaoMovimentacao semBorda" value={identidadeCliente} onChange={e => setIdentidadeCliente(e.target.value)}></input>
                            <button className="buttonEdicaoMovimentacao" onClick={e => returnApiMovimentacao('Cliente')}>Pesquisar</button>
                        </div>
                    </div>
                    <div className="containerEdicaoSecundarioMovimentacao">
                        <label className="labelNomeEdicaoMovimentacao">Número</label>
                        <div className="containerSecundarioEdicaoMovimentacao">
                            <input type="text" className="inputEdicaoMovimentacao semBorda" value={numeroMovimentacao} onChange={e => setNumeroMovimentacao(e.target.value)}></input>
                            <button className="buttonEdicaoMovimentacao" onClick={e => returnApiMovimentacao('Id')}>Pesquisar</button>
                        </div>
                    </div>
                    <div className="containerEdicaoSecundarioMovimentacao">
                        <label className="labelNomeEdicaoMovimentacao">Tipo Movimentação</label>
                        <select className="inputTipoEdicaoMovimentacao semBorda" onChange={e => setTipoMovimentacao(e.target.value)} >
                            <option>{opcaoTipoMovimentacao[0]}</option>
                            <option>{opcaoTipoMovimentacao[1]}</option>
                            <option>{opcaoTipoMovimentacao[2]}</option>
                            <option>{opcaoTipoMovimentacao[3]}</option>
                            <option>{opcaoTipoMovimentacao[4]}</option>
                            <option>{opcaoTipoMovimentacao[5]}</option>
                            <option>{opcaoTipoMovimentacao[6]}</option>
                        </select>
                    </div>
                    <div className="containerEdicaoDataMovimentacao">
                        <div className="containerEdicaoSecundarioMovimentacao">
                            <label className="labelNomeEdicaoMovimentacao">Data Início</label>
                            <input type="date" className="inputSecundarioEdicaoMovimentacao semBorda" value={dataInicio} onChange={e => setDataInicio(e.target.value)}></input>
                        </div>
                        <div className="containerEdicaoSecundarioMovimentacao">
                            <label className="labelNomeEdicaoMovimentacao">Hora Inicio</label>
                            <input type="time" className="inputSecundarioEdicaoMovimentacao semBorda" value={horaInicio} onChange={e => setHoraInicio(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="containerEdicaoDataMovimentacao">
                        <div className="containerEdicaoSecundarioMovimentacao">
                            <label className="labelNomeEdicaoMovimentacao">Data Termino</label>
                            <input type="date" className="inputSecundarioEdicaoMovimentacao semBorda" value={dataTermino} onChange={e => setDataTermino(e.target.value)}></input>
                        </div>
                        <div className="containerEdicaoSecundarioMovimentacao">
                            <label className="labelNomeEdicaoMovimentacao">Hora Termino</label>
                            <input type="time" className="inputSecundarioEdicaoMovimentacao semBorda" value={horaTermino} onChange={e => setHoraTermino(e.target.value)}></input>
                        </div>
                    </div>
                    <div id="containerEdicaoBotaoMovimentacao">
                        <button className="buttonEdicaoMovimentacao" onClick={deleteApiMovimentacao}>Deletar</button>
                        <button className="buttonEdicaoMovimentacao" onClick={verificaSetUpdate}>Enviar</button>
                    </div>
                </div>
                <div id="containerResultadoCompostoMovimentacao">
                    <div id="tituloResultadoComposto">
                        <div className="componenteTituloResultadoComposto"> Número </div>
                        <div className="componenteTituloResultadoComposto"> Data Início </div>
                        <div className="componenteTituloResultadoComposto"> Data Final </div>
                        <div className="componenteTituloResultadoComposto"> Tipo </div>
                    </div>
                    <div id="containerConteudoResultadoComposto">
                        {conteudoResultado}
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}

export default Movimentacoes;
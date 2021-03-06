import React, { useEffect, useState } from 'react';
import '../../css/movimentacoes.css';

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
        'Descarga', 'Embarque', 'Gate-In', 'Gate-Out', 'Pesagem', 'Reposicionamento', 'Scanner'
    ])

    useEffect(() => {
        if (retornoMovimentacao !== undefined && permisaoRetornoMovimentacao === true) {
            criaObjetoRetornoComposto();
            setPermisaoRetornoMovimentacao(false);
        }
    }, [retornoMovimentacao, permisaoRetornoMovimentacao])

    function limparCampos() {
        setNumeroMovimentacao("");
        setTipoMovimentacao('Embarque');
        setDataInicio("");
        setHoraInicio("");
        setDataTermino("");
        setHoraTermino("");

    }

    function criaObjetoRetornoComposto() { //Cria um array de objeto
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
                alert(`O campo ${item} est?? vazio!`);
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
                    if (response.data.message !== undefined) return alert("Conteudo buscado n??o encontrado!")

                    const valor = { ...response.data };

                    setConteudoResultado("")

                    setNumeroMovimentacao(valor[0].id);
                    setTipoMovimentacao(valor[0].tipoMovimentacao);
                    setDataInicio(valor[0].dataInicio);
                    setHoraInicio(valor[0].horaInicio);
                    setDataTermino(valor[0].dataTermino);
                    setHoraTermino(valor[0].horaTermino);

                    let retornoObjeto = [];
                    Object.keys(valor).forEach(index => {
                        if (index !== 0) {
                            retornoObjeto.push(valor[index]);
                        }
                    })
                    setRetornoMovimentacao(retornoObjeto);
                    setPermisaoRetornoMovimentacao(true);



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
                .then(() => {
                    alert("Valor salvo com sucesso!");

                    returnApiMovimentacao("Cliente");

                    limparCampos();
                })
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
            .then((result) => {
                if (result.data === false) return alert("Falha ao realizar Update!");

                alert("Update Realizado com Sucesso!");

                returnApiMovimentacao("Cliente");
            })
            .catch(() => alert("Falha ao realizar Update!"));
    }

    function deleteApiMovimentacao() {
        const objetoEnvio = {
            identidadeCliente: identidadeCliente
        }

        api
            .delete(`/movimentacao/${numeroMovimentacao}`, { data: objetoEnvio })
            .then((result) => {

                if (result.data === false) return alert("Falha ao apagar movimentacao!");

                alert("Movimentacao apagada com sucesso!");

                if (conteudoResultado.length > 1) {
                    returnApiMovimentacao("Cliente");
                }
                else {
                    setConteudoResultado("");
                    limparCampos();
                }
            })
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
                        A????es Para Movimenta????o
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
                        <label className="labelNomeEdicaoMovimentacao">N??mero</label>
                        <div className="containerSecundarioEdicaoMovimentacao">
                            <input type="text" className="inputEdicaoMovimentacao semBorda" value={numeroMovimentacao} onChange={e => setNumeroMovimentacao(e.target.value)}></input>
                            <button className="buttonEdicaoMovimentacao" onClick={e => returnApiMovimentacao('Id')}>Pesquisar</button>
                        </div>
                    </div>
                    <div className="containerEdicaoSecundarioMovimentacao">
                        <label className="labelNomeEdicaoMovimentacao">Tipo Movimenta????o</label>
                        <select className="inputTipoEdicaoMovimentacao semBorda" onChange={e => setTipoMovimentacao(e.target.value)} value={tipoMovimentacao}>
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
                            <label className="labelNomeEdicaoMovimentacao">Data In??cio</label>
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
                        <div className="componenteTituloResultadoComposto"> N??mero </div>
                        <div className="componenteTituloResultadoComposto"> Data In??cio </div>
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
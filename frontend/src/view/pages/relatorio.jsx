import React, { useState, useEffect } from "react";

import '../../css/relatorio.css';

import Header from "../components/header";
import Footer from "../components/footer";
import api from "../../services/apiAxios";
import ResultadoCompostoRelatorio from "../components/resultadoCompostoRelatorio";

function Relatorio() {
    const [objetoRelatorio, setObjetoRelatorio] = useState(null);
    const [objetoSumario, setOBjetoSumario] = useState({
        importacao: "",
        exportacao: ""
    });
    const [containerRelatorio, setContainerRelatorio] = useState();
    const [containerSumario, setContainerSumario] = useState();
    const [permissaoRelatorioCliente, setPermissaoRelatorioCliente] = useState(false);
    const [permissaoRelatorioMovimentacao, setPermissaoRelatorioMovimentacao] = useState(false);

    useEffect(() => {
        if (permissaoRelatorioCliente === true && objetoRelatorio !== null) {
            criarRelatorioComposto('Cliente');
            setPermissaoRelatorioCliente(false);
        }
        if (permissaoRelatorioMovimentacao === true && objetoRelatorio !== null) {
            criarRelatorioComposto('Movimentacoes');
            setPermissaoRelatorioMovimentacao(false);
        }
    }, [permissaoRelatorioCliente, permissaoRelatorioMovimentacao, objetoRelatorio])

    function criarRelatorioComposto(tipo) {
        const tipoObjetoRelatorio = [];
        let arrayRetorno = [];

        Object.keys(objetoRelatorio).map(valueObjeto => {

            if (tipoObjetoRelatorio.length === 0) {
                tipoObjetoRelatorio.push(Object.keys(objetoRelatorio[valueObjeto])[0]);
            }
            else {
                const nomeObjeto = Object.keys(objetoRelatorio[valueObjeto])[0];

                const verificaRepetido = tipoObjetoRelatorio.filter(valuearray => (valuearray === nomeObjeto));

                if (verificaRepetido.length === 0) tipoObjetoRelatorio.push(nomeObjeto);

            }

        })

        tipoObjetoRelatorio.map(tipoInterno => {
            Object.keys(objetoRelatorio).map(index => {
                const objetoAtual = objetoRelatorio[index];
                const nomeObjetoAtual = Object.keys(objetoRelatorio[index])[0]

                if (tipoInterno === nomeObjetoAtual) {
                    arrayRetorno.push(ResultadoCompostoRelatorio(objetoAtual[nomeObjetoAtual]));
                }
            })
        })

        setContainerRelatorio(arrayRetorno);
    }

    function retornRelatorio(tipo) {
        setObjetoRelatorio(null);

        api.get(`/movimentacao/relatorio?tipo=${tipo}`)
            .then((resultado) => {
                if (resultado === false) return alert('Falha ao retornar relat??rio!');

                setObjetoRelatorio(resultado.data);

                alert('Processando Relat??rio!')
            })
            .catch();

        switch (tipo) {
            case 'Cliente':
                setPermissaoRelatorioCliente(true);
                break;

            case 'Movimentacoes':
                setPermissaoRelatorioMovimentacao(true);
                break;
        }

        retornaSumario();
    }

    function retornaSumario() {
        api.get(`/containers/relatorio`)
            .then((resultado) => {
                if (resultado === false) return alert('Falha ao retornar relat??rio de importa????o e exporta????o!');

                const objetoRetorno = {
                    importacao: resultado.data.importacao,
                    exportacao: resultado.data.exportacao
                }

                setOBjetoSumario(objetoRetorno);

            })
            .catch();
    }

    return (
        <>
            <Header></Header>
            <section id="sectionPrincipalRelatorio">
                <div id="containerTituloRelatorio">
                    <h2 className="tituloRelatorio">
                        Gerar Rel??torio de Manifesta????es
                    </h2>
                </div>
                <div id="containerInformacaoRelatorio">
                    <div id="containerBotoes">
                        <button className="botaoRetornaRelatorio" onClick={e => retornRelatorio("Cliente")}>
                            Filtro Cliente
                        </button>
                        <button className="botaoRetornaRelatorio" onClick={e => retornRelatorio("Movimentacoes")}>
                            Filtro Movimenta????o
                        </button>
                    </div>
                    <div id="containerRelatorio">
                        {containerRelatorio}
                    </div>
                    <div id="containerSumario">
                        <div className="containerLabelSumario">
                            <label className="labelDescricaoSumario">Total de Importacao Realizada:</label>
                            <label className="labelValorSumario">{objetoSumario.importacao}</label>
                        </div>
                        <div className="containerLabelSumario">
                            <label className="labelDescricaoSumario">Total de Exportacao Realizada:</label>
                            <label className="labelValorSumario">{objetoSumario.exportacao}</label>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}

export default Relatorio;
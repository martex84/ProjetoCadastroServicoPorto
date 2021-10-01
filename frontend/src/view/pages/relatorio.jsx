import React, { useState, useEffect } from "react";

import '../../css/relatorio.css';

import Header from "../components/header";
import Footer from "../components/footer";
import api from "../../services/apiAxios";

function Relatorio() {
    const [containerRelatorio, setContainerRelatorio] = useState();
    const [containerSumario, setContainerSumario] = useState();

    function retornRelatorio(tipo) {
        api.
            get(`/movimentacao/relatorio?tipo=${tipo}`)
            .then((resultado) => {
                if (resultado === false) return alert('Falha ao retornar relatório!');

                console.log(resultado.data);

                /* setContainerRelatorio(resultado.data) */

                alert('Relatorio Retornado com Sucesso!')
            })
            .catch()
    }

    function retornaSumario() { }

    return (
        <>
            <Header></Header>
            <section id="sectionPrincipalRelatorio">
                <div id="containerTituloRelatorio">
                    <h2 className="tituloRelatorio">
                        Gerar Relátorio
                    </h2>
                </div>
                <div id="containerInformacaoRelatorio">
                    <div id="containerBotoes">
                        <button className="botaoRetornaRelatorio" onClick={e => retornRelatorio("Cliente")}>
                            Filtro Cliente
                        </button>
                        <button className="botaoRetornaRelatorio" onClick={e => retornRelatorio("Movimentacoes")}>
                            Filtro Movimentação
                        </button>
                    </div>
                    <div id="containerRelatorio">
                        {containerRelatorio}
                    </div>
                    <div id="containerSumario">
                        {containerSumario}
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}

export default Relatorio;
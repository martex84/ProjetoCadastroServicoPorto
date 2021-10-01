import React, { useState, useEffect } from "react";

import '../../css/relatorio.css';

import Header from "../components/header";
import Footer from "../components/footer";
import api from "../../services/apiAxios";

function Relatorio() {
    const [containerRelatorio, setContainerRelatorio] = useState();
    const [containerSumario, setContainerSumario] = useState();

    function retornRelatorio() {
        api.
            get('/movimentacoes/relatorio', (req, res) => {

            })
            .then((resultado) => {
                if (resultado === false) return alert('Falha ao retornar relatório!');

                console.log(resultado);

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
                <div id="containerBotes">
                    <button className="botaoRetornaRelatorio">
                        Filtro Cliente
                    </button>
                    <button className="botaoRetornaRelatorio">
                        Filtro Movimentação
                    </button>
                </div>
                <div id="containerRelatorio">
                    {containerRelatorio}
                </div>
                <div id="containerSumario">
                    {containerSumario}
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}

export default Relatorio;
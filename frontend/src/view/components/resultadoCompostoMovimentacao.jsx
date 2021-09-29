import React from "react";

import '../../css/Movimentacoes.css';

function ResultadoCompostoMovimentacao(objeto) {

    return (
        <>
            <div className="conteudoResultadoComposto">
                <div className="componenteResultadoComposto conteudoIdResultadoComposto">
                    {objeto.id}
                </div>
                <div className="componenteResultadoComposto">
                    {objeto.dataInicio}
                </div>
                <div className="componenteResultadoComposto">
                    {objeto.dataTermino}
                </div>
                <div className="componenteResultadoComposto">
                    {objeto.tipoMovimentacao}
                </div>

            </div>
        </>
    );
}

export default ResultadoCompostoMovimentacao;
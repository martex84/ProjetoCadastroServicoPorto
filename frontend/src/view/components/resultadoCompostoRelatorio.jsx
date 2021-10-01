import React from "react";

import '../../css/relatorio.css';

function ResultadoCompostoRelatorio(objeto) {

    return (
        <>
            <div className="containerItemRelatorio">
                {/* Identidade Cliente */}
                <div className="containerInternoRelatorio containerPrimario semMarginTop">
                    <label className="labelItemRelatorio">
                        Identidade do Cliente:
                    </label>
                    <label className="labelDescricaoItemRelatorio">
                        {objeto.identidadeCliente}
                    </label>
                </div>
                {/* Tipo Movimentacao */}
                <div className="containerInternoRelatorio containerPrimario">
                    <label className="labelItemRelatorio">
                        Tipo de Movimentacao:
                    </label>
                    <label className="labelDescricaoItemRelatorio">
                        {objeto.tipoMovimentacao}
                    </label>
                </div>
                {/* Data Inicio Movimentacao */}
                <div className="containerInternoRelatorio containerSecundario">
                    <label className="labelItemRelatorio">
                        Data de Inicio da Movimentacao:
                    </label>
                    <div className="containerItemSecundario">
                        <label className="labelDescricaoItemRelatorio">
                            {objeto.dataInicio}
                        </label>
                        <label className="labelItemRelatorio">
                            as
                        </label>
                        <label className="labelDescricaoItemRelatorio">
                            {objeto.horaInicio}
                        </label>
                    </div>
                </div>
                {/* Data Termino Movimentacao */}
                <div className="containerInternoRelatorio containerSecundario">
                    <label className="labelItemRelatorio">
                        Data de Termino da Movimentacao:
                    </label>
                    <div className="containerItemSecundario">
                        <label className="labelDescricaoItemRelatorio">
                            {objeto.dataTermino}
                        </label>
                        <label className="labelItemRelatorio">
                            as
                        </label>
                        <label className="labelDescricaoItemRelatorio">
                            {objeto.horaTermino}
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResultadoCompostoRelatorio;
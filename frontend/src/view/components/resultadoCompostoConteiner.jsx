import React from "react";

import '../../css/conteiners.css';

function ResultadoCompostoConteiner(objeto) {

    return (
        <>
            <div className="conteudoResultadoComposto">
                <div className="componenteResultadoComposto conteudoIdResultadoComposto">
                    {objeto.numeroContainer}
                </div>
                <div className="componenteResultadoComposto">
                    {objeto.tipo}
                </div>
                <div className="componenteResultadoComposto">
                    {objeto.status}
                </div>
                <div className="componenteResultadoComposto">
                    {objeto.categoria}
                </div>

            </div>
        </>
    );
}

export default ResultadoCompostoConteiner;
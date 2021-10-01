import React from "react";
import { Link } from 'react-router-dom';

import '../../css/home.css';

function Home() {
    return (
        <>
            <section id="sectionPrincipalHome">
                <div id="containerTituloHome">
                    <h2 class="tituloHome">
                        Bem-vindo ao sistema de cadastro portuário
                    </h2>
                </div>
                <div id="containerConteudoMovimentacao">
                    <div id="containerSubTituloHome">
                        <h4 class="subtTituloHome">
                            Escolha a ferramenta que deseja utilizar!
                        </h4>
                    </div>
                    <div id="containerBotoesHome">
                        <Link to="/containers">
                            <button class="botaoFerramenta">
                                Cadastro de Contêineres
                            </button>
                        </Link>
                        <Link to="/movimentacoes">
                            <button class="botaoFerramenta">
                                Cadastro de Movimentações
                            </button>
                        </Link>
                        <Link to="/relatorios">
                            <button class="botaoFerramenta">
                                Geração de Relatório
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
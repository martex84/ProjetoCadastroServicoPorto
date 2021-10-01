import React, { useEffect, useState } from 'react';
import '../../css/conteiners.css';

import Header from '../components/header';
import Footer from '../components/footer';
import api from '../../services/apiAxios';

import ResultadoCompostoConteiner from '../components/resultadoCompostoConteiner';

function Conteiners() {
    const [identidadeCliente, setIdentidadeCliente] = useState();
    const [numeroConteiner, setNumeroConteiner] = useState("");
    const [tipoConteiner, setTipoConteiner] = useState("20");
    const [statusConteiner, setStatusConteiner] = useState("Cheio");
    const [categoriaConteiner, setCategoriaConteiner] = useState("Importação");
    const [retornoConteiner, setRetornoConteiner] = useState();
    const [permisaoRetornoConteiner, setPermisaoRetornoConteiner] = useState(true);
    const [conteudoResultado, setConteudoResultado] = useState();

    const [opcaoTipoConteiner, setOpcaoTipoConteiner] = useState([
        "20", "40"
    ]);
    const [opcaoStatusConteiner, setOpcaoStatusConteiner] = useState([
        "Cheio", "Vazio"
    ]);
    const [opcaoCategoriaConteiner, setOpcaoCategoriaConteiner] = useState([
        "Importação", "Exportação"
    ]);

    useEffect(() => {
        if (retornoConteiner !== undefined && permisaoRetornoConteiner === true) {
            criaObjetoRetornoComposto();
            setPermisaoRetornoConteiner(false);
        }
    }, [retornoConteiner, permisaoRetornoConteiner])

    function limpaCampos() {
        setNumeroConteiner("");
        setTipoConteiner("20");
        setStatusConteiner("Cheio");
        setCategoriaConteiner("Importação");
    }

    function criaObjetoRetornoComposto() {
        const valor = []
        Object.keys(retornoConteiner).forEach(indice => {
            valor.push(ResultadoCompostoConteiner(retornoConteiner[indice]))
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

    function returnApiConteiner(tipo) {
        let valorParaPesquisa;

        switch (tipo) {
            case 'Cliente':
                valorParaPesquisa = identidadeCliente;
                break;

            case 'Id':
                valorParaPesquisa = numeroConteiner;
                break;

            default:
                valorParaPesquisa = undefined;
                break;
        }

        if (valorParaPesquisa === undefined || valorParaPesquisa === "") alert(`Campo "${tipo}" em branco!`)
        else {
            api
                .get(`/containers?busca=${valorParaPesquisa}$${tipo}`)
                .then((response) => {
                    if (response.data.message !== undefined) return alert("Conteudo buscado não encontrado!")

                    const valor = { ...response.data };

                    setConteudoResultado("")

                    setCategoriaConteiner(valor[0].categoria);
                    setIdentidadeCliente(valor[0].identidadeCliente);
                    setNumeroConteiner(valor[0].numeroContainer);
                    setStatusConteiner(valor[0].status);
                    setTipoConteiner(valor[0].tipo);

                    /* organizaOpcaoTipo(valor[0].tipo, "tipo");
                    organizaOpcaoTipo(valor[0].status, "status");
                    organizaOpcaoTipo(valor[0].categoria, "categoria"); */

                    let retornoObjeto = [];
                    Object.keys(valor).forEach(index => {
                        if (index !== 0) {
                            retornoObjeto.push(valor[index]);
                        }
                    })
                    setRetornoConteiner(retornoObjeto);
                    setPermisaoRetornoConteiner(true);

                })
                .catch(() => alert("Falha ao realizar busca!"));
        }
    }

    function setApiConteiner() {
        const objetoEnvio = {
            identidadeCliente: identidadeCliente,
            numeroContainer: numeroConteiner,
            tipo: tipoConteiner,
            status: statusConteiner,
            categoria: categoriaConteiner
        }

        if (verificaObjetoEmBranco(objetoEnvio) === false) {
            api
                .post("/containers", { data: objetoEnvio })
                .then(() => {
                    alert("Valor salvo com sucesso!");

                    returnApiConteiner("Cliente");

                    limpaCampos();
                })
                .catch(() => alert("Falha ao salvar valor!"));
        }

    }

    function updateApiConteiner() {
        const objetoEnvio = {
            identidadeCliente: identidadeCliente,
            numeroContainer: numeroConteiner,
            tipo: tipoConteiner,
            status: statusConteiner,
            categoria: categoriaConteiner
        }

        api
            .put(`/containers`, { data: objetoEnvio })
            .then((result) => {
                if (result.data === false) return alert("Falha ao realizar Update!");

                alert("Update Realizado com Sucesso!");

                returnApiConteiner("Cliente");
            })
            .catch(() => alert("Falha ao realizar Update!"));
    }

    function deleteApiConteiner() {
        const objetoEnvio = {
            numeroContainer: numeroConteiner,
            identidadeCliente: identidadeCliente
        }

        api
            .delete(`/containers`, { data: objetoEnvio })
            .then((result) => {
                if (result.data === false) return alert("Falha ao apagar movimentacao!");

                alert("Movimentacao apagada com sucesso!");

                if (conteudoResultado.length > 1) returnApiConteiner("Cliente");
                else {
                    setConteudoResultado("");

                    limpaCampos("");
                }
            })
            .catch(() => alert("Falha ao apagar movimentacao!"));
    }

    return (
        <>
            <header id="headerPrincipalConteiners">
                <Header></Header>
            </header>
            <section id="sectionPrincipalConteiners">
                <div id="containerTituloConteiners">
                    <h2 className="tituloPrincipalConteiners">
                        Ações Para Contêiner
                    </h2>
                </div>
                <div id="containerEdicaoConteiners">
                    <div className="containerEdicaoSecundarioConteiners semMargin">
                        <label className="labelEdicaoCategoria">Identidade</label>
                        <div className="containerSecundarioEdicaoConteiners">
                            <input type="text" className="inputEdicaoMovimentacao semBorda" value={identidadeCliente} onChange={e => setIdentidadeCliente(e.target.value)}></input>
                            <button className="buttonEdicaoConteiners" onClick={e => returnApiConteiner('Cliente')}>Pesquisar</button>
                        </div>
                    </div>
                    <div className="containerEdicaoSecundarioConteiners">
                        <label className="labelEdicaoCategoria">Número</label>
                        <div className="containerSecundarioEdicaoConteiners">
                            <input type="text" className="inputEdicaoMovimentacao semBorda" value={numeroConteiner} onChange={e => setNumeroConteiner(e.target.value)}></input>
                            <button className="buttonEdicaoConteiners" onClick={e => returnApiConteiner('Id')}>Pesquisar</button>
                        </div>
                    </div>
                    <div className="containerEdicaoSecundarioConteiners">
                        <label className="labelEdicaoCategoria">Tipo Contêiners</label>
                        <select className="inputSelectConteiners semBorda" onChange={e => setTipoConteiner(e.target.value)} value={tipoConteiner}>
                            <option>{opcaoTipoConteiner[0]}</option>
                            <option>{opcaoTipoConteiner[1]}</option>
                        </select>
                    </div>
                    <div className="containerEdicaoSecundarioConteiners">
                        <label className="labelEdicaoCategoria">Status</label>
                        <select className="inputSelectConteiners semBorda" onChange={e => setStatusConteiner(e.target.value)} value={statusConteiner}>
                            <option>{opcaoStatusConteiner[0]}</option>
                            <option>{opcaoStatusConteiner[1]}</option>
                        </select>
                    </div>
                    <div className="containerEdicaoSecundarioConteiners">
                        <label className="labelEdicaoCategoria">Categoria</label>
                        <select className="inputSelectConteiners semBorda" onChange={e => setCategoriaConteiner(e.target.value)} value={categoriaConteiner}>
                            <option>{opcaoCategoriaConteiner[0]}</option>
                            <option>{opcaoCategoriaConteiner[1]}</option>
                        </select>
                    </div>
                    <div id="containerEdicaoBotaoConteiners">
                        <button className="buttonEdicaoConteiners" onClick={deleteApiConteiner}>Deletar</button>
                        <button className="buttonEdicaoConteiners" onClick={updateApiConteiner}>Editar</button>
                        <button className="buttonEdicaoConteiners" onClick={setApiConteiner}>Enviar</button>
                    </div>
                </div>
                <div id="containerResultadoCompostoConteiners">
                    <div id="tituloResultadoComposto">
                        <div className="componenteTituloResultadoComposto"> Número </div>
                        <div className="componenteTituloResultadoComposto"> Tipo </div>
                        <div className="componenteTituloResultadoComposto"> Status </div>
                        <div className="componenteTituloResultadoComposto"> Categoria </div>
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

export default Conteiners;
import './css/App.css';

import Header from './view/components/header';
import Footer from './view/components/footer';

import Conteiners from './view/pages/conteiners';
import Movimentacoes from './view/pages/movimentacoes';

function App() {
  return (
    <>
      {/* <Header></Header>
      <section id="sectionPrincipal"></section>
      <Footer></Footer> */}
      {<Conteiners></Conteiners>}
      {/*<Movimentacoes></Movimentacoes>*/}
    </>
  );
}

export default App;

import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './view/pages/home';
import Conteiners from './view/pages/conteiners';
import Movimentacoes from './view/pages/movimentacoes';
import Relatorio from './view/pages/relatorio';

export default function Rota() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={Conteiners} path="/containers" />
                <Route exact component={Movimentacoes} path="/movimentacoes" />
                <Route exact component={Relatorio} path="/relatorios" />
            </Switch>
        </BrowserRouter>
    );
}
import Server from './src/connectionServer.js';
import database from './src/database/connection.js';
import clientes from './src/model/clientes.js';
import containers from './src/model/containers.js';
import movimentacoes from './src/model/movimentacoes.js';

const clintesModel = clientes; //Ira criar as telas caso as mesmas não estejam criadas antes de iniciar o server
const containersModel = containers;
const movimentacoesModel = movimentacoes;

Server();

await database.sync();


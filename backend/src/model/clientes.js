import Sequelize from 'sequelize';

import database from '../database/connection.js';
import movimentacoes from './movimentacoes.js'
import containers from './containers.js'

const clientes = database.define(
    'clientes',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        identidade: {
            type: Sequelize.STRING(255),
            allowNull: false
        }

    }
)

clientes.hasMany(movimentacoes);
clientes.hasMany(containers);

export default clientes;
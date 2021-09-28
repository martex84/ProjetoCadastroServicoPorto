import Sequelize from 'sequelize';

import database from '../database/connection.js';

const movimentacoes = database.define(
    'movimentacoes',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        identidadeCliente: {
            type: Sequelize.INTEGER,
            references: {
                model: 'clientes',
                key: 'id'
            }
        },
        tipoMovimentacao: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        dataInicio: {
            type: Sequelize.DATE,
            allowNull: false
        },
        dataTermino: {
            type: Sequelize.DATE,
            allowNull: false
        }

    }
)

export default movimentacoes;
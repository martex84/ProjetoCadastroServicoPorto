import Sequelize from 'sequelize';

import database from '../database/connection.js';

const containers = database.define(
    'containers',
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
        numeroContainer: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        tipo: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        categoria: {
            type: Sequelize.STRING(255),
            allowNull: false
        },

    }
)

export default containers;
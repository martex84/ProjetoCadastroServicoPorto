import Sequelize from 'sequelize';

const database = new Sequelize(
    'bdPorto', //Name Db
    'root', //User Db
    'root12345', //Password Db
    {
        dialect: 'mysql', //Type Db
        host: 'localhost', //Host
        port: 3306 //Default Port
    }
);

export default database;
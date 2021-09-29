import clientes from '../model/clientes.js';

async function setIdentidade(identidade) {
    return await clientes.create({
        identidade: identidade
    });
}

async function getFindOne(identidade) {
    const resultado = await clientes.findAll({
        where: {
            identidade: identidade
        }
    });

    if (resultado[0] === undefined) return undefined;

    return resultado[0].dataValues;
}

async function getFindById(id) {
    const resultado = await clientes.findByPk(id);

    if (resultado === undefined) return undefined;

    return resultado.dataValues;
}

export {
    setIdentidade,
    getFindById,
    getFindOne
};
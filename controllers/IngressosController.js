const knex = require('knex');
const knexFile = require('../knexfile.js');
const db = knex(knexFile);

function sendSuccessResponse(res, data) {
    return res.json({ status: "success", data });
}

function sendErrorResponse(res, statusCode, message) {
    return res.status(statusCode).json({ status: "error", message });
}

exports.list = async (req, res) => {
    try {
        const ingressos = await db('ingressos').select();
        sendSuccessResponse(res, ingressos);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao listar ingressos.");
    }
};

// exports.create = async (req, res) => {
//     const { evento_id, tipo, preco } = req.body;

//     if (!evento_id || !tipo || !preco) {
//         return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
//     }

//     try {
//         await db('ingressos').insert({ evento_id, tipo, preco });
//         sendSuccessResponse(res, "Ingresso adicionado com sucesso.");
//     } catch (error) {
//         console.error(error);
//         sendErrorResponse(res, 500, "Falha ao adicionar ingresso.");
//     }
// };

exports.get = async (req, res) => {
    const id = req.params.id;
    try {
        const ingresso = await db('ingressos').where('id', id).first();
        if (ingresso) {
            sendSuccessResponse(res, ingresso);
        } else {
            sendErrorResponse(res, 404, "Ingresso não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao obter ingresso.");
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    // const {  } = req.body;

    if (!evento_id || !tipo || !preco || !quantidade) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        const updated = await db('ingressos').where('id', id).update({ evento_id, tipo, preco, quantidade });
        if (updated) {
            sendSuccessResponse(res, "Ingresso atualizado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Ingresso não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao atualizar ingresso.");
    }
};

// exports.delete = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const deleted = await db('ingressos').where('id', id).del();
//         if (deleted) {
//             sendSuccessResponse(res, "Ingresso deletado com sucesso.");
//         } else {
//             sendErrorResponse(res, 404, "Ingresso não encontrado.");
//         }
//     } catch (error) {
//         console.error(error);
//         sendErrorResponse(res, 500, "Falha ao deletar ingresso.");
//     }
// };

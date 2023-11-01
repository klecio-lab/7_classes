const knex = require('knex');
const knexFile = require('../knexfile.js');
const db = knex(knexFile);

function sendSuccessResponse(res, data) {
    return res.json({ status: "success", data });
}

function sendErrorResponse(res, statusCode, message) {
    return res.status(statusCode).json({ status: "error", message });
}

// exports.list = async (req, res) => {
//     try {
//         const patrocinadores = await db('patrocinadores').select();
//         sendSuccessResponse(res, patrocinadores);
//     } catch (error) {
//         console.error(error);
//         sendErrorResponse(res, 500, "Falha ao listar patrocinadores.");
//     }
// };

exports.create = async (req, res) => {
    const { nome, evento_id } = req.body;
    const authUser = req.authUser;

    if (!nome || !evento_id) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        await db('patrocinadores').insert({ nome, evento_id });
        sendSuccessResponse(res, "Patrocinador adicionado com sucesso.");
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao adicionar patrocinador.");
    }
};

// exports.get = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const patrocinador = await db('patrocinadores').where('id', id).first();
//         if (patrocinador) {
//             sendSuccessResponse(res, patrocinador);
//         } else {
//             sendErrorResponse(res, 404, "Patrocinador não encontrado.");
//         }
//     } catch (error) {
//         console.error(error);
//         sendErrorResponse(res, 500, "Falha ao obter patrocinador.");
//     }
// };

exports.update = async (req, res) => {
    const id = req.params.id;
    const authUser = req.authUser;
    const { nome } = req.body;

    if (!nome) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        const updated = await db('patrocinadores').where('id', id).update({ nome });
        if (updated) {
            sendSuccessResponse(res, "Patrocinador atualizado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Patrocinador não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao atualizar patrocinador.");
    }
};

exports.delete = async (req, res) => {
    const authUser = req.authUser;

    const id = req.params.id;
    try {
        const deleted = await db('patrocinadores').where('id', id).del();
        if (deleted) {
            sendSuccessResponse(res, "Patrocinador deletado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Patrocinador não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao deletar patrocinador.");
    }
};

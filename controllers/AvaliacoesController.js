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
//         const avaliacoes = await db('avaliacoes').select();
//         sendSuccessResponse(res, avaliacoes);
//     } catch (error) {
//         console.error(error);
//         sendErrorResponse(res, 500, "Falha ao listar avaliações.");
//     }
// };

exports.create = async (req, res) => {
    const { avaliacao, evento_id } = req.body;

    if (!avaliacao || !evento_id) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        await db('avaliacoes').insert({ avaliacao, evento_id });
        sendSuccessResponse(res, "Avaliação adicionada com sucesso.");

    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao adicionar avaliação.");

    }
};

exports.get = async (req, res) => {
    const id = req.params.id;
    try {
        const avaliacaoEvento = await db('avaliacoes').where('evento_id', id).first();
        if (avaliacaoEvento) {
            sendSuccessResponse(res, avaliacaoEvento);

        } else {
            sendErrorResponse(res, 404, "avaliacoes do evento não encontradas.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao obter avaliacoes do evento.");
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const { avaliacao } = req.body;

    if (!avaliacao) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        const updated = await db('avaliacoes').where('id', id).update({ avaliacao });
        if (updated) {
            sendSuccessResponse(res, "Avaliação atualizada com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Avaliação não encontrada.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao atualizar avaliação.");
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await db('avaliacoes').where('id', id).del();
        if (deleted) {
            sendSuccessResponse(res, "Avaliação deletada com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Avaliação não encontrada.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao deletar avaliação.");
    }
};

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
//         const comentarios = await db('comentarios').select();
//         sendSuccessResponse(res, comentarios);
//     } catch (error) {
//         console.error(error);
//         sendErrorResponse(res, 500, "Falha ao listar comentários.");
//     }
// };

exports.create = async (req, res) => {
    const { comentario, evento_id } = req.body;

    if (!comentario || !evento_id) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }
    
    const authUser = req.authUser;

    const userAtual = await db('usuarios').where('email', authUser.email).first();

    if (!userAtual) {
        return sendErrorResponse(res, 404, "Usuário não encontrado.");
    }

    try {
        await db('comentarios').insert({ comentario, usuario_id: userAtual.id, evento_id });
        sendSuccessResponse(res, "Comentário adicionado com sucesso.");
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao adicionar comentário.");
    }
};

exports.get = async (req, res) => {
    const id = req.params.id;
    try {
        const comentario = await db('comentarios').where('evento_id', id).first();
        if (comentario) {
            sendSuccessResponse(res, comentario);
        } else {
            sendErrorResponse(res, 404, "Comentários do evento não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao obter comentários.");
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const { comentario } = req.body;

    if (!comentario) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    const authUser = req.authUser;

    const userAtual = await db('usuarios').where('email', authUser.email).first();

    if (!userAtual) {
        return sendErrorResponse(res, 404, "Usuário não encontrado.");
    }

    try {
        const updated = await db('comentarios').where('id', id).where('usuario_id', userAtual.id).update({ comentario });
        if (updated) {
            sendSuccessResponse(res, "Comentário atualizado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Comentário não encontrado ou você não tem permissão para atualizá-lo.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao atualizar comentário.");
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    const authUser = req.authUser;

    const userAtual = await db('usuarios').where('email', authUser.email).first();

    if (!userAtual) {
        return sendErrorResponse(res, 404, "Usuário não encontrado.");
    }

    try {
        const deleted = await db('comentarios').where('id', id).where('usuario_id', userAtual.id).del();
        if (deleted) {
            sendSuccessResponse(res, "Comentário deletado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Comentário não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao deletar comentário.");
    }
};

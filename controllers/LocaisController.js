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
        const locais = await db('locais').select();
        sendSuccessResponse(res, locais);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao listar locais.");
    }
};

exports.create = async (req, res) => {
    const { endereco, cidade, estado, pais, complemento, usuario_id} = req.body;

    if (!endereco || !cidade || !estado || !pais || !usuario_id) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        await db('locais').insert({ endereco, cidade, estado, pais, complemento, usuario_id});
        sendSuccessResponse(res, "Local adicionado com sucesso.");
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao adicionar local.");
    }
};

exports.get = async (req, res) => {
    const id = req.params.id;
    try {
        const local = await db('locais').where('id', id).first();
        if (local) {
            sendSuccessResponse(res, local);
        } else {
            sendErrorResponse(res, 404, "Local não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao obter local.");
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const { endereco, cidade, estado, pais, complemento } = req.body;

    if (!endereco || !cidade || !estado || !pais) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        const updated = await db('locais').where('id', id).update({ endereco, cidade, estado, pais, complemento });
        if (updated) {
            sendSuccessResponse(res, "Local atualizado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Local não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao atualizar local.");
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await db('locais').where('id', id).del();
        if (deleted) {
            sendSuccessResponse(res, "Local deletado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Local não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao deletar local.");
    }
};

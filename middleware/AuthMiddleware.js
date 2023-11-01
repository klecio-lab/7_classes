var admin = require("firebase-admin");
var serviceAccount = require("../firebaseAdminCredentials.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Middleware de autenticação
const AuthMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : null;
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const authUser = await admin.auth().verifyIdToken(token);
        req.authUser = authUser;
        next();

    } catch (e) {
        return res.sendStatus(401);
        
    }
};

module.exports = AuthMiddleware;
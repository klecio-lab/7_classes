const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const UsuariosRoutes = require('./routes/usuariosRoutes.js');
const IngressosRoutes = require('./routes/ingressosRoutes.js');
const LocaisRoutes = require('./routes/locaisRoutes.js');
const EventosRoutes = require('./routes/eventosRoutes.js');
const ComentariosRoutes = require('./routes/comentariosRoutes.js');
const AvaliacoesRoutes = require('./routes/avaliacoesRoutes.js');
const PatrocinadoreRoutes = require('./routes/patrocinadoresRoutes.js');
const AuthRoutes = require('./routes/authRoutes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/usuarios', UsuariosRoutes);
app.use('/ingressos', IngressosRoutes);
app.use('/locais', LocaisRoutes);
app.use('/eventos', EventosRoutes);
app.use('/comentarios', ComentariosRoutes);
app.use('/avaliacoes', AvaliacoesRoutes);
app.use('/patrocinadores', PatrocinadoreRoutes);
app.use('/auth', AuthRoutes);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
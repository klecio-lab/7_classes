const knex = require('knex');
const knexFile = require('../knexfile.js');
const db = knex(knexFile);
const { initializeApp } = require("@firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithCustomToken, signOut  } = require("firebase/auth");
const firebaseJson = require('../firebaseCredentials.json');




// Inicializa o módulo de autenti
const auth = getAuth(initializeApp(firebaseJson));

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Autentica o usuário com o email e a senha
    const user = await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // O usuário foi autenticado com sucesso
      const user = userCredential.user;

      return user;

    });

    return res.status(200).json({ message: "Autenticação bem-sucedida", user });

  } catch (error) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

};

exports.register = async (req, res) => {
  const { nome, email, password, password_confirmation, data_nascimento } = req.body;

  if (!nome || !data_nascimento || !email || !password || !password_confirmation) {
    return res.status(500).json({ error: "falta campos" });
  }
  
  // Verifica se as senhas coincidem
  if (password !== password_confirmation) {
    return res.status(400).json({ error: "As senhas não coincidem" });
  }
  const senha = password;

  var errorMessage = false;
  // try {

    // Se o e-mail não estiver em uso, cria o usuário
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('user criado');

    })
    .catch((error) => {
      errorMessage = true;

    });

    if(errorMessage == true) {
      return res.status(500).json({ error: "usuario já existe" });
    }
   
    try {
        await db('usuarios').insert({ nome, email, senha, data_nascimento });
        
        return res.status(201).json({ message: "Usuário registrado com sucesso"});
    } catch{
      return res.status(500).json({ error: "Erro ao registrar usuário" });

    }
    

  // } catch (error) {
  //   

  // }

};

// exports.logout = async (req, res) => {
//   const auth = getAuth();

//   signOut(auth).then(() => {
//     return res.status(201).json({ message: "Usuário deslogado com sucesso" });

//   }).catch((error) => {
//     return res.status(400).json({ error: "Não foi possivel deslogar o usuario" });

//   });
// };

import express from 'express'
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());
app.use(express.json());

let users = [];
let nextUserId = 1;

app.post('/usuarios', async (request, response) => {
    const { nome, email, senha } = request.body;

    if (!nome || !email || !senha) {
        return response.status(400).json({ mensagem: "Por favor, forneça todos os campos: nome, email e senha." });
    }

    if (users.some(user => user.email === email)) {
        return response.status(400).json({ mensagem: "Este email já está em uso. Por favor, escolha outro." });
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novaUsuario = {
            id: nextUserId++,
            nome,
            email,
            senha: senhaCriptografada
        };

        users.push(novaUsuario);

        return response.status(201).json({ mensagem: "Usuário criado com sucesso." });
    } catch (error) {
        return response.status(500).json({ mensagem: "Ocorreu um erro ao criar o usuário." });
    }
});

app.post('/login', async (requesr, response) => {
    const { email, senha } = request.body;

    if (!email || !senha) {
        return response.status(400).json({ mensagem: "Por favor, forneça o email e a senha." });
    }

    const usuario = users.find(user => user.email === email);

    if (!usuario) {
        return response.status(404).json({ mensagem: "Email não encontrado. Por favor, verifique suas credenciais." });
    }

    try {
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return response.status(401).json({ mensagem: "Senha incorreta. Por favor, verifique suas credenciais." });
        }

        return response.status(200).json({ mensagem: "Login realizado com sucesso!" });
    } catch (error) {
        return response.status(500).json({ mensagem: "Ocorreu um erro ao realizar o login." });
    }
});

app.listen(8080, () => console.log("Servidor iniciado na porta 8080"));
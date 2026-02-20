import express from 'express';

const app = express();
app.use(express.json()); // Permite receber JSON no corpo da requisição [cite: 44, 45]

// Dados em memória [cite: 73, 75]
let tarefas = [
    { id: 1, titulo: "Estudar Node.js", concluida: false },
    { id: 2, titulo: "Configurar GitHub", concluida: true }
];

// Rota GET: Listar itens [cite: 47, 61]
app.get('/tarefas', (req, res) => {
    res.status(200).json(tarefas); [cite: 54, 106]
});

// Rota POST: Criar item com validação [cite: 48, 65]
app.post('/tarefas', (req, res) => {
    const { titulo } = req.body; [cite: 50, 66]

    // Validação mínima obrigatória [cite: 82, 85, 114]
    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ erro: "Título é obrigatório." }); [cite: 56, 108]
    }

    const novaTarefa = {
        id: tarefas.length + 1,
        titulo,
        concluida: false
    };

    tarefas.push(novaTarefa); [cite: 80, 113]
    res.status(201).json(novaTarefa); [cite: 55, 107]
});

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
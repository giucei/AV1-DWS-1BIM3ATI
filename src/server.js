import express from 'express';

const app = express();
app.use(express.json()); // Permite receber JSON [cite: 168, 169]

// Dados em memória [cite: 198, 199]
let tarefas = [
    { id: 1, titulo: "Estudar Node.js", concluida: false },
    { id: 2, titulo: "Configurar GitHub", concluida: true }
];

// Rota GET: Listar itens [cite: 171, 184]
app.get('/tarefas', (req, res) => {
    res.status(200).json(tarefas); // [cite: 178, 186]
});

// Rota POST: Criar item com validação [cite: 172, 189]
app.post('/tarefas', (req, res) => {
    const { titulo } = req.body; // [cite: 174, 190]

    // Validação mínima obrigatória [cite: 206, 209]
    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ erro: "Título é obrigatório." }); // [cite: 180, 210]
    }

    const novaTarefa = {
        id: tarefas.length + 1,
        titulo,
        concluida: false
    };

    tarefas.push(novaTarefa); // [cite: 204]
    res.status(201).json(novaTarefa); // [cite: 179, 192]
});

// Configuração da Porta e Inicialização [cite: 149, 167]
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
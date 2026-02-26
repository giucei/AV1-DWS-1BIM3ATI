import express from 'express';
import { tarefas } from './dados.js'; // Importa o array do arquivo de dados [cite: 33, 37]

const app = express();
const PORTA = 3000; // Define a porta conforme o requisito [cite: 43]

app.use(express.json()); // Middleware obrigatório para aceitar JSON [cite: 45, 103]

// Rota GET: Listar todas as tarefas (Status 200) [cite: 47, 54, 106]
app.get('/tarefas', (req, res) => {
    res.status(200).json(tarefas);
});

// Rota POST: Criar nova tarefa com validação (Status 201 ou 400) [cite: 48, 55, 56, 107, 108]
app.post('/tarefas', (req, res) => {
    const { titulo } = req.body;

    // Validação mínima: título obrigatório [cite: 85, 114, 115]
    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ erro: "Título é obrigatório." });
    }

    const novaTarefa = {
        id: tarefas.length + 1,
        titulo,
        concluida: false
    };

    tarefas.push(novaTarefa); // Adiciona ao array em memória [cite: 80, 113]
    res.status(201).json(novaTarefa); // Retorna o item criado [cite: 98, 107]
});

// Inicialização do servidor [cite: 95]
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
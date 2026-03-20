import express from 'express';
import { tarefas } from './dados.js'; // Importa o array do arquivo de dados [cite: 33, 37]
import { localhost } from './tarefas.js';

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

app.put('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const { titulo, concluida } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID inválido.' });
    }

    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({ erro: 'Título é obrigatório.' });
    }

    if (typeof concluida !== 'boolean') {
        return res.status(400).json({ erro: 'O campo concluida deve ser booleano.' });
    }

    const indice = tarefas.findIndex((tarefa) => tarefa.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    const tarefaAtualizada = { id, titulo, concluida };
    tarefas[indice] = tarefaAtualizada;

    return res.status(200).json(tarefaAtualizada);
});

app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID inválido.' });
    }

    const indice = tarefas.findIndex((tarefa) => tarefa.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    tarefas.splice(indice, 1);
    return res.status(204).send();
});

// Inicialização do servidor [cite: 95]
app.listen(PORTA, () => {
    console.log(`Servidor rodando em ${localhost}`);
});
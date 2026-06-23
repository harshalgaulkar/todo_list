const express = require('express');
const router = express.Router();
const { pool } = require('../utils/db');
const { createResult } = require('../utils/result');

//1. Create a new todo
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.json(createResult('Title is required', null));
        }

        const sql = 'INSERT INTO Todos (title) VALUES (?)';
        const [result] = await pool.execute(sql, [title]);

        const [rows] = await pool.execute('SELECT * FROM Todos WHERE id = ?', [result.insertId]);
        res.json(createResult(null, rows[0]));
    } catch (err) {
        res.json(createResult(err.message, null));
    }
});

//2. Get all todos
router.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM Todos ORDER BY createdAt DESC';
        const [rows] = await pool.execute(sql);
        res.json(createResult(null, rows));
    } catch (err) {
        res.json(createResult(err.message, null));
    }
});

//3. update a todo by id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const [checkRows] = await pool.execute('SELECT * FROM Todos WHERE id = ?', [id]);
        if (checkRows.length === 0) {
            return res.json(createResult('Todo not found', null));
        }

        const currentTodo = checkRows[0];
        const finalTitle = title !== undefined ? title : currentTodo.title;
        const finalCompleted = completed !== undefined ? completed : currentTodo.completed;

        const sql = 'UPDATE Todos SET title = ?, completed = ? WHERE id = ?';
        await pool.execute(sql, [finalTitle, finalCompleted, id]);

        const [updatedRows] = await pool.execute('SELECT * FROM Todos WHERE id = ?', [id]);
        res.json(createResult(null, updatedRows[0]));
    } catch (err) {
        res.json(createResult(err.message, null));
    }
});


//4. Delete a todo by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [checkRows] = await pool.execute('SELECT * FROM Todos WHERE id = ?', [id]);
        if (checkRows.length === 0) {
            return res.json(createResult('Todo not found', null));
        }

        const sql = 'DELETE FROM Todos WHERE id = ?';
        await pool.execute(sql, [id]);

        res.json(createResult(null, { message: 'Todo deleted successfully using raw SQL' }));
    } catch (err) {
        res.json(createResult(err.message, null));
    }
});

module.exports = router;
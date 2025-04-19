const pool = require('../src/config/db');

exports.getAllTodos = async ( req, res ) => {
    console.log('[Backend] GET /api/till route handler reached');

    try {
        const [rows] = await pool.query(
            'SELECT * FROM todos ORDER BY created_at DESC'
        )

        res.json(rows);

    } catch (err) {
        console.error('Error fetching till_db:', err);
        res.status(500).json({message: 'Error fetching till_db', err: err.message});
    }
};

exports.createTodo = async ( req, res ) => {

    const { task } = req.body;
    if (!task) return res.status(400).json({message:'Task is requied.'})

    try {
        const [ result ] = await pool.query(
            'INSERT INTO todos (task) VALUES (?)' ,[task]
        );
        console.log("new data added to the database")

        const newTodoId = result.insertId;
        const [newTodoRows] = await pool.query(
            'SELECT * FROM todos WHERE id = ?',[newTodoId]
        )
        res.status(201).json(newTodoRows[0]);

    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({messgae:'Error creating todo', error: err.message});
    }

};
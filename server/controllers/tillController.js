const pool = require('../src/config/db').pool;

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
        const [newTodo] = await pool.query(
            'SELECT * FROM todos WHERE id = ?',[result.id]
        )
        res.status(201).json(newTodo[0])

    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({messgae:'Error creating todo', error: err.message});
    }

};
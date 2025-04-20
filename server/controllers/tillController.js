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

exports.removeTodo = async ( req, res ) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({message:'id is requied.'})
    
    try {
        const [result] = await pool.query(
            'DELETE FROM todos WHERE id = ?', [ id ]
        )
        console.log(" data deleted from database")

        if (result.affectedRows === 0) {
            return res.status(404).json({message:` Todo with id:${id} not found.`});
        }
        res.json({ message: `Todo with id ${id} deleted successfully.` });

    } catch (error) {
        console.error(`Error deleting todo with id ${id}:`, err);

        res.status(500).json({
            message: `Error deleting todo with id ${id}`,
            error: err.message
        });
    }

}

exports.updateTodo = async ( req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        
        const [ result ] = await pool.query(
            'UPDATE todos SET completed = ? WHERE id = ?',
            [completed, id]
        )

        if (result.affectedRows ===0) {
            return res.status(404).json({message: `Task with id:${id} not found.`})
        }

        const [updatedTodoRows] = await pool.query(
            'SELECT * FROM todos WHERE id = ?',[id]
        )

        if (updatedTodoRows.length === 0) {
            throw new Error(`Failed to retrieve the updated todo with id ${id}.`);
       }

       res.json(updatedTodoRows[0]);


    } catch (error) {
        console.error(`Error updating todo with id ${id}:`, err);

        res.status(500).json({
            message: `Error updating todo with id ${id}`,
            error: err.message
        })
    }
}
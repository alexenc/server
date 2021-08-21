const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

//create server
const app = express();

//connect to db
connectDB();

//habilitate cors
app.use(cors())

//express.json
app.use(express.json({ extended: true }));

//app port
const PORT = process.env.PORT || 4000;

//
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));


//DEfine main page


//start app
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

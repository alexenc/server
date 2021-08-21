const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')


//create a task
//api/tasks
router.post('/',
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('project', 'project is required').not().isEmpty()
    ],
    taskController.createTask
)

//get task by id project
router.get('/', 
    auth,
    taskController.getTasks
)

router.put('/:id', 
    auth,
    taskController.updateTask
)

router.delete('/:id', 
    auth,
    taskController.deleteTask
)

module.exports = router
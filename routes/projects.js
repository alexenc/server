const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const projectsController = require('../controllers/projectsController')
const auth = require('../middleware/auth')


//Create projects
//api/projects
router.post('/',
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectsController.createProject
);

router.get('/',
    auth,
    projectsController.getProjects
);

router.put('/:id',
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectsController.updateProject
);

router.delete('/:id',
    auth,    
    projectsController.deleteProject
);

module.exports = router;
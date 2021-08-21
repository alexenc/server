const Task = require('../models/Task')
const Project = require('../models/Project')
const {validationResult} = require('express-validator')

//create a new task
exports.createTask = async (req, res) => {
    //check errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    //extrat project 
    

    try {
        const { project } = req.body
        

        const actualProject = await Project.findById(project)
        if(!actualProject) {
            return res.status(404).json({msg: 'project not found'})
        }

        //check if actual project belongs to auth user
        if(actualProject.creator.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'not authoriced'})
        }

        //create task
        const task = new Task(req.body)
        await task.save()
        res.json({task})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('there was an error')
    }

}

exports.getTasks = async (req, res) => {
    try {
        //extract project
        const { project } = req.query
        console.log(req.query)

        const actualProject = await Project.findById(project)
        if(!actualProject) {
            return res.status(404).json({msg: 'project not found'})
        }

        //check if actual project belongs to auth user
        if(actualProject.creator.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'not authoriced'})
        }

        //get tasks by project
        const tasks = await Task.find({ project })
        res.json({tasks})
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send('there was an error')
    }
    
}

exports.updateTask = async (req, res) => {

    try {
        //extract project
        const { project, name, status } = req.body        

        //check i task exist
        let task = await Task.findById(req.params.id)
        if(!task) { return res.status(404).json({msg: 'task does not exist'})}

        //check if actual project belongs to auth user
        const actualProject = await Project.findById(project)

        if(actualProject.creator.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'not authoriced'})
        } 


        //create an object with new info
        const newTask = {}  

        newTask.name = name            
         
        newTask.status = status          
        

        //save task
        task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})
        res.json({task})
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send('there was an error')
    }

}

exports.deleteTask = async (req, res) => {
    try {
        const { project} = req.query     
        
        let task = await Task.findById(req.params.id)
        if(!task) { return res.status(404).json({msg: 'task does not exist'})}

        //check if actual project belongs to auth user
        const actualProject = await Project.findById(project)

        if(actualProject.creator.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'not authoriced'})
        } 

        await Task.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'task deleted'})


    } catch (error) {
        console.log(error)
        res.status(500).send('there was an error')
    }
}

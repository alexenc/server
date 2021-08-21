const Project = require('../models/Project')
const {validationResult} = require('express-validator')
exports.createProject = async (req, res) => {

    //check errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        
        //create a new project
        const project = new Project(req.body);

        //set Project creator jwt
        project.creator = req.user.id;



        project.save()
        res.json(project)

    } catch (error) {
        console.log(error);
        res.status(500).send('error')
    }
}

//obtain user projects
exports.getProjects = async(req, res) => {
    try {
        
        const projects = await Project.find({creator: req.user.id}).sort({date: -1});
        res.json({ projects })

    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

//update project
exports.updateProject = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }


    //extract project info
    const {name} = req.body

   const newProject = {};

   if(name) {
       newProject.name = name
   }

   try {

       // check id
       let project = await Project.findById(req.params.id)

       if(!project) {
           return res.status(404).json({msg: '404 not found'})
       }

       if(project.creator.toString() !== req.user.id ) {
           return res.status(401).json({msg: 'not authoriced'})
       }

       project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true});
       res.json({project})

   } catch (error) {
       console.log(error)
       res.status(500).send('server error')
   }
}

exports.deleteProject = async (req, res) => {
    try {

        // check id
       let project = await Project.findById(req.params.id)

       if(!project) {
           return res.status(404).json({msg: '404 not found'})
       }

       if(project.creator.toString() !== req.user.id ) {
           return res.status(401).json({msg: 'not authoriced'})
       }

       //delete project
       await Project.findOneAndRemove( { _id: req.params.id})
       res.json({msg: 'project deleted'})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
}
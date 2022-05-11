import Task from '../models/Task'
import {getPagination}  from '../libs/getPagination';

// asignamos las peticiones, create,delete,find,uodate...

export const findAllTasks = async (req, res) => {
    try {

        const {size, page, title} = req.query

        const condition = title ?  {
            title: {$regex: new RegExp(title), $options: "i"},
        }
        : {};

        const{limit, offset} = getPagination(page, size)

        const task = await Task.paginate(condition, {offset , limit});
        res.json({
            totalItems: task.totalDocs,
            tasks: task.docs,
            totalPages: task.totalPages,
            currentPage: task.page -1
        })
    }catch (err) {
        res.status(500).json({
            message: err.message || 'algo salio mal mientras consultabamos la tarea'
        });
    }
}

export const createTask = async (req, res) => {

    if(!req.body.title){
        return res.status(400).send({ message: 'El contenido puede estar vacio'})
    }

   try {
        // console.log(req.body)
        const newTasks = new Task({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done ? req.body.done : false
       })
    const taskSave = await newTasks.save();
    // console.log(newTasks)
    res.json(taskSave)
   } catch (error) {
    res.status(500).json({
        message: err.message || 'algo salio mal mientras creabamos la tarea'
    });
   }
 }


export const findAllDoneTasks = async (req, res) => {
    try {
        const task = await Task.find(   )
        res.json(task)
    } catch (error) {
            res.status(500).json({
            message: err.message || 'algo salio mal mientras consultabamos los done true en la tarea'
        });
    }
}


export const findOneTask = async (req, res) => {
    try {

        const {id} = req.params;

        //console.log(req.params.id)
        const task = await Task.findById(id);

        if(!task) return res.status(404).json({message: `La tarea ${id} no existe`});
        res.json(task)
        
    } catch (error) {
        res.status(500).json({
            message: err.message || 'algo salio mal mientras consultabamos por ID en la tarea'
        });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const data = await Task.findByIdAndDelete(req.params.id)
        res.json({
            message: `${data.title} La tarea se ha eliminado correctamente`
        })
    } catch (error) {
        res.status(500).json({
            message: err.message || 'algo salio mal mientras eliminabamos en la tarea'
        });
    }
   
}

export const updateTask = async (req, res) => {
    try {
        const updatetask = await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        message: `${updatetask.title} La tarea se ha modificado correctamente`
    })
    } catch (error) {
        res.status(500).json({
            message: err.message || 'algo salio mal mientras actualizabamos en la tarea'
        });
    }
}
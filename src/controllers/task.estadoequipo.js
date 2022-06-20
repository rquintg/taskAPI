import Task from '../models/Taskestadoequipo'
import {getPagination}  from '../libs/getPagination';

// asignamos las peticiones, create,delete,find,uodate...

export const findAllTasks = async (req, res) => {
    try {

        const {size, page, nombre} = req.query

        const condition = nombre ?  {
            nombre: {$regex: new RegExp(nombre), $options: "i"},
        }
        : {};

        const{limit, offset} = getPagination(page, size)

        const task = await Task.paginate(condition, {offset , limit});
        const task1 = await Task.find({estado: true});
        res.json({
            totalItems: task.totalDocs,
            tasks: task1,
            totalPages: task.totalPages,
            currentPage: task.page -1
        })
    }catch (error) {
        res.status(500).json({
            message: error.message || 'algo salio mal mientras consultabamos el estado de equipo'
        });
    }
}

export const createTask = async (req, res) => {

    if(!req.body.nombre){
        return res.status(400).send({ message: 'El estado no puede estar vacio'})
    }

   try {
        const nombre = req.body.nombre;
        
        const estadoBD = await Task.findOne({ nombre });
        if(estadoBD){
            return res.status(400).send({message: `El estado de equipo: ${nombre} ya existe`});
        }
        // console.log(req.body)
        const newTasks = new Task({
        nombre: req.body.nombre,
        estado: req.body.estado ? req.body.estado : false,
       })
    const taskSave = await newTasks.save();
    // console.log(newTasks)
    res.json(taskSave)
   } catch (error) {
    res.status(500).json({
        message: error.message || 'algo salio mal mientras creabamos el estado'
    });
   }
 }


export const findAllDoneTasks = async (req, res) => {
    try {
        const task = await Task.find({estado: true})
        res.json(task)
    } catch (error) {
            res.status(500).json({
            message: error.message || 'algo salio mal mientras consultabamos los estados de equipo activos'
        });
    }
}


export const findOneTask = async (req, res) => {
    try {

        const {id} = req.params;

        //console.log(req.params.id)
        const task = await Task.findById(id);

        if(!task) return res.status(404).json({message: `El estado de equipo: ${id} no existe`});
        res.json(task)
        
    } catch (error) {
        res.status(500).json({
            message: error.message || 'algo salio mal mientras consultabamos por ID en estado de equipo'
        });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const data = await Task.findByIdAndDelete(req.params.id)
        res.json({
            message: `el equipo ${data.nombre} se ha eliminado correctamente`
        })
    } catch (error) {
        res.status(500).json({
            message: 'algo salio mal mientras eliminabamos un estado de equipo'
        });
    }
   
}

export const updateTask = async (req, res) => {
    try {

        const {id} = req.params;

        //console.log(req.params.id)
        const task = await Task.findById(id);

        if(!task) return res.status(404).json({message: `El estado de equipo: ${id} no existe`});
        const updatetask = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.json({
        message: `${updatetask.nombre} se ha modificado correctamente`
    })
    } catch (error) {
        res.status(500).json({
            message: 'algo salio mal mientras actualizabamos el estado de equipo'
        });
    }
}
import Task from '../models/TasktipodeEquipo'
import usuarios from '../models/Taskusuarios'
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
        res.json({
            totalItems: task.totalDocs,
            tasks: task.docs,
            totalPages: task.totalPages,
            currentPage: task.page -1
        })
    }catch (error) {
        res.status(500).json({
            message: error.message || 'algo salio mal mientras consultabamos la tarea'
        });
    }
}

export const createTask = async (req, res) => {

    if(!req.body.nombre){
        return res.status(400).send({ message: 'El contenido no puede estar vacio'})
    }

   try {
        const email = req.body.usuarios.email;
        const nombre = req.body.nombre;

        const tipoEquipoBD = await Task.findOne({ nombre });
        if(tipoEquipoBD){// ya existe el equipo
        return res.status(400).send({message: 'Ya existe tipo equipo'});
        }
        const usuarioBD = await usuarios.findOne({ email });
        
        if(!usuarioBD){// no existe usuario
            return res.status(404).send({ message: 'No existe usuario'});
        }
        // console.log(req.body)
        
        const newTasks = new Task({
        nombre: req.body.nombre,
        estado: req.body.estado ? req.body.estado : false,
        usuarios: usuarioBD._id
       })
    const taskSave = await newTasks.save();
    // console.log(newTasks)
    res.json(taskSave)
   } catch (error) {
    res.status(500).json({
        message: error.message || 'algo salio mal mientras creabamos la tarea'
    });
   }
 }


export const findAllDoneTasks = async (req, res) => {
    try {
        const task = await Task.find({estado: true})
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

        if(!task) return res.status(404).json({message: `El tipo de equipo: ${id} no existe`});
        res.json(task)
        
    } catch (error) {
        res.status(500).json({
            message: error.message || 'algo salio mal mientras consultabamos por ID en tipo de equipo'
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
            message: 'algo salio mal mientras eliminabamos un equipo'
        });
    }
   
}

export const updateTask = async (req, res) => {
    try {
        const updatetask = await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        message: `${updatetask.nombre} se ha modificado correctamente`
    })
    } catch (error) {
        res.status(500).json({
            message: 'algo salio mal mientras actualizabamos en la tarea'
        });
    }
}
import Task from '../models/Taskinventario'
import usuarios from '../models/Taskusuarios'
import marcas from '../models/Taskmarcas'
import estados from '../models/Taskestadoequipo'
import tipos from '../models/TasktipodeEquipo'
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
            message: error.message || 'algo salio mal mientras consultabamos el inventario'
        });
    }
}

export const findOneTask = async (req, res) => {
    try {

        const {id} = req.params;

        //console.log(req.params.id)
        const task = await Task.findById(id);

        if(!task) return res.status(404).json({message: `El inventario: ${id} no existe`});
        res.json(task)
        
    } catch (error) {
        res.status(500).json({
            message: error.message || 'algo salio mal mientras consultabamos por ID en el inventario'
        });
    }
}

export const createTask = async (req, res) => {

    if(!req.body.serial){
        return res.status(400).send({ message: 'El serial no puede estar vacio'})
    }

   try {
        const email = req.body.usuarios.email;
        const nombre = req.body.marcas.nombre;
        const estado = req.body.estados.nombre;


        const usuarioBD = await usuarios.findOne({ email });
        
        if(!usuarioBD){// no existe usuario
            return res.status(404).send({message: `El usuario: ${email} no existe`});
        }

        const marcasBD = await marcas.findOne({nombre});

        if(!marcasBD){// no existe usuario
            return res.status(404).send({message: `El usuario: ${nombre} no existe`});
        }

        const estadosBD = await estados.findOne({nombre: estado});

        if(!estadosBD){
            return res.status(404).send({message: `El estado de equipo: ${estado} no existe`});
        }
         console.log(email);
        
        const newTasks = new Task({
        serial: req.body.serial,
        modelo: req.body.modelo,
        descripcion: req.body.descripcion,
        foto: req.body.foto,
        color: req.body.color,
        precio: req.body.precio,
        usuarios: usuarioBD._id,
        marcas:  marcasBD._id,
        estados: estadosBD._id
       })
    const taskSave = await newTasks.save();
    // console.log(newTasks)
    res.json(taskSave)
   } catch (error) {
    res.status(500).json({
        message: error.message || 'algo salio mal mientras creabamos el tipo de equipo'
    });
   }
 }
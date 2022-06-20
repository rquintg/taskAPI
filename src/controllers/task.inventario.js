import Task from '../models/Taskinventario'
import usuarios from '../models/Taskusuarios'
import marca from '../models/Taskmarcas'
import estado from '../models/Taskestadoequipo'
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
        // const email = req.body.usuarios.email;
        // const marca = req.body.marcas.nombre;
        // const estado = req.body.estados.nombre;
        // const tipoEquipos = req.body.tipoEquipos.nombre;
        const { serial, modelo, email, marcas, estados, tipoEquipos} = req.body;

        const inventarioBD = await Task.findOne({
            $or: [
                {serial},
            ]
        });
        //console.log(inventarioBD)
        if(inventarioBD){
            return res.status(400).json({
                msj: 'Ya existe serial'
                
            })
        }
        console.log('marca: ' , marcas)
        console.log('req.body', req.body)
        
        const usuarioBD = await usuarios.findOne({ email, estado: true });
        
        if(!usuarioBD){// no existe usuario
            return res.status(404).send({message: `El usuario: ${email} no existe o no esta activo`});
        }

        const marcasBD = await marca.findOne({nombre: marcas, estado: true});

        if(!marcasBD){// no existe usuario
            return res.status(404).send({message: `la marca: ${marcas} no existe o no esta activa`});
        }

        const estadosBD = await estado.findOne({nombre: estados});

        if(!estadosBD){
            return res.status(404).send({message: `El estado de equipo: ${estados} no existe`});
        }

        const tipoEquipoBD = await tipos.findOne({nombre: tipoEquipos});

        if(!tipoEquipoBD){
            return res.status(404).send({message: `El tipo de equipo: ${tipoEquipos} no existe`});
        }    
       // console.log(estado);
        
        const newTasks = new Task({
        serial: req.body.serial,
        modelo: req.body.modelo,
        descripcion: req.body.descripcion,
        foto: req.body.foto,
        color: req.body.color,
        precio: req.body.precio,
        usuarios: usuarioBD.email,
        marcas:  marcasBD.nombre,
        estados: estadosBD.nombre,
        tipoEquipos: tipoEquipoBD.nombre
       })
    const taskSave = await newTasks.save();
    // console.log(newTasks)
    res.json(taskSave)
   } catch (error) {
    res.status(500).json({
        message: error.message || 'algo salio mal mientras creabamos el inventario'
    });
   }
 }


export const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;

        const data = await Task.findByIdAndDelete(id)
        if(!data) return res.status(404).json({message: `El inventario: ${id} no existe`});
        res.json({
            message: `el equipo ${data.serial} se ha eliminado correctamente`
        })
    } catch (error) {
        res.status(500).json({
            message: 'algo salio mal mientras eliminabamos inventario'
        });
    }
   
}

export const updateTask = async (req, res) => {
    try {

        const {id} = req.params;

        //console.log(req.params.id)
        const task = await Task.findById(id);

        if(!task) return res.status(404).json({message: `El inventario: ${id} no existe`});
        const updatetask = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.json({
        message: `${updatetask.serial} se ha modificado correctamente`
    })
    } catch (error) {
        res.status(500).json({
            message: 'algo salio mal mientras actualizabamos el inventario'
        });
    }
}
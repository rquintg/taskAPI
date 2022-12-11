import {Router} from 'express'
import * as taskctrl from '../controllers/task.inventario'

const validarJwt = require('../middlewares/validarJwt')
const { esAdmin } = require('../middlewares/validarRol')

const router = Router()

router.post('/', validarJwt, esAdmin, taskctrl.createTask)

router.get ('/', validarJwt,taskctrl.findAllTasks )

//router.get('/done', taskctrl.findAllDoneTasks)

router.get('/:id', taskctrl.findOneTask)

router.delete('/:id', validarJwt, esAdmin, taskctrl.deleteTask)

router.put('/:id', validarJwt, esAdmin, taskctrl.updateTask)

export default router
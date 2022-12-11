import {Router} from 'express'
import * as taskctrl from '../controllers/task.marcas'

const validarJwt = require('../middlewares/validarJwt')
const { esAdmin } = require('../middlewares/validarRol')

const router = Router()

router.post('/', validarJwt, esAdmin, taskctrl.createTask)

router.get ('/', validarJwt, esAdmin, taskctrl.findAllTasks )

router.get('/done', validarJwt, esAdmin, taskctrl.findAllDoneTasks)

router.get('/:id', validarJwt, esAdmin, taskctrl.findOneTask)

router.delete('/:id', validarJwt, esAdmin, taskctrl.deleteTask)

router.put('/:id', validarJwt, esAdmin, taskctrl.updateTask)

export default router
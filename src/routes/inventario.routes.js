import {Router} from 'express'
import * as taskctrl from '../controllers/task.inventario'

const router = Router()

router.post('/', taskctrl.createTask)

router.get ('/', taskctrl.findAllTasks )

//outer.get('/done', taskctrl.findAllDoneTasks)

router.get('/:id', taskctrl.findOneTask)

//router.delete('/:id', taskctrl.deleteTask)

//router.put('/:id', taskctrl.updateTask)

export default router
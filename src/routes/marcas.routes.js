import {Router} from 'express'
import * as taskctrl from '../controllers/task.marcas'

const router = Router()

router.post('/', taskctrl.createTask)

router.get ('/', taskctrl.findAllTasks )

router.get('/done', taskctrl.findAllDoneTasks)

router.get('/:id', taskctrl.findOneTask)

router.delete('/:id', taskctrl.deleteTask)

router.put('/:id', taskctrl.updateTask)

export default router
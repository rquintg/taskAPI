import {Router} from 'express'
import * as taskte from '../controllers/task.tipodeequipo'

const router = Router()

router.post('/', taskte.createTask)

router.get ('/', taskte.findAllTasks )

router.get('/done', taskte.findAllDoneTasks)

router.get('/:id', taskte.findOneTask)

router.delete('/:id', taskte.deleteTask)

router.put('/:id', taskte.updateTask)

export default router
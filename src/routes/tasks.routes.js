import {Router} from 'express'
import * as taskctrl from '../controllers/task.controller'

const router = Router()

// definimos las rutas de las peticiones

router.post('/t', taskctrl.createTask )

router.get ('/t', taskctrl.findAllTasks )

router.get('/t/done', taskctrl.findAllDoneTasks)

router.get('/t/:id', taskctrl.findOneTask)

router.delete('/t/:id', taskctrl.deleteTask)

router.put('/t/:id', taskctrl.updateTask)



export default router
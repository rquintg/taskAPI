import app from './app'
import './database'
import colors from 'colors'

//inicializamos la app y la bd  

app.listen(app.get('port')); // definicion del puerto

console.log(colors.rainbow('Servidor en puerto'), app.get('port')); // aca se concatena ej: server on port 3000



 import {Schema, model} from 'mongoose';
 import mongoosepaginate from 'mongoose-paginate-v2';  

//formato que usamos para enviar a mongodb

 const taskShema = new Schema({
     nombre: {
         type: String,
         Required: [true, 'Por favor ingresar un nombre de usuario'],
         trim: true
     },
     estado: {
         type: Boolean,
         default: false,
         required: true
     },
     email: {
        type: String,
        Required: [true, 'Por favor ingresar un correo electronico'],
        unique: true
     },
 },{
     versionKey: false,
     timestamps: true
 });

 taskShema.plugin(mongoosepaginate);
 export default model('usuarios', taskShema)
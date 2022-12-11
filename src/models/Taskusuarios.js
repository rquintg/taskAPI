
 import mongoose, {Schema, model} from 'mongoose';
 import mongoosepaginate from 'mongoose-paginate-v2';  

//formato que usamos para enviar a mongodb

 mongoose.set('strictQuery', true);

 const usuarioShema = (add) => {
     const shema = new Schema({
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

     if(add){
         shema.add(add);
     }

     return shema;

 }

 const taskShema = usuarioShema();

 const UsuarioSysSchema = usuarioShema({
     password: {
         type: String,
         required: [true, 'Password requerido']
     },
     rol: {
         type: String,
         required: true,
         enum: ['ADMIN', 'DOCENTE']
     }
 })

 taskShema.plugin(mongoosepaginate);
 export default model('usuarios', taskShema)
 module.exports = model('UsuarioSys', UsuarioSysSchema)
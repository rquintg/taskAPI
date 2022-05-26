
 import {Schema, model} from 'mongoose';
 import mongoosepaginate from 'mongoose-paginate-v2';  

//formato que usamos para enviar a mongodb

 const taskShema = new Schema({
     nombre: {
         type: String,
         Required: true,
         trim: true
     },
     estado: {
         type: Boolean,
         default: false
     },
     usuarios: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }
 },{
     versionKey: false,
     timestamps: true
 });

 taskShema.plugin(mongoosepaginate);
 export default model('tipo_de_equipos', taskShema)

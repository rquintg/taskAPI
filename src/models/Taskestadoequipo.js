
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
     estadoEquipo: {
        type: String,
        default: "bodega"
     },
 },{
     versionKey: false,
     timestamps: true
 });

 taskShema.plugin(mongoosepaginate);
 export default model('estado_de_equipos', taskShema)

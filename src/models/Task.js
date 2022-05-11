
 import {Schema, model} from 'mongoose';
 import mongoosepaginate from 'mongoose-paginate-v2';  

//formato que usamos para enviar a mongodb

 const taskShema = new Schema({
     title: {
         type: String,
         Required: true,
         trim: true
     },
     description: {
         type: String,
         trim: true
     },
     done: {
         type: Boolean,
         default: false
     },
 },{
     versionKey: false,
     timestamps: true
 });

 taskShema.plugin(mongoosepaginate);
 export default model('task', taskShema)

 
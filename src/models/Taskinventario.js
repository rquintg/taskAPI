import {Schema, model} from 'mongoose';
import mongoosepaginate from 'mongoose-paginate-v2';  

//formato que usamos para enviar a mongodb

const taskShema = new Schema({
    serial: {
        type: String,
        required: [true, 'Serial requerido'],
        unique: true
    },
    modelo: {
        type: String,
        require: [true, 'Modelo requerido'],
        unique: false
    },
    descripcion: {
        type: String
    },
    foto: {
        type: String
    },
    color: {
        type: String
    },
    fechaCompra: {
        type: Date,
        default: new Date()
    },
    precio: {
        type: Number
    },
    usuarios: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    marcas: {
        type: Schema.Types.ObjectId,
        ref: 'marcas',
        required: true
    },
    estados: {
        type: Schema.Types.ObjectId,
        ref: 'estados_de_equipo',
        required: true
    },
     tipoEquipos: {
         type: Schema.Types.ObjectId,
         ref: 'tipo_de_equipos',
         required: true
     }
},{
    versionKey: false,
});

taskShema.plugin(mongoosepaginate);
export default model('inventarios', taskShema)

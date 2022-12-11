import config from "../config";
const UsuarioSys = require('../models/Taskusuarios')
const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
/**
 * Registra un usuario
 */
const register = async (req = request,
                        res = response) => {
    const {email, password} = req.body
    try{
        const usuarioSysBD = await UsuarioSys.findOne({
            email
        })
        if(usuarioSysBD){
            return res.status(400).json({
                msg: 'Ya existe este usuario'
            })
        }
        const usuarioSys = new UsuarioSys(req.body)
        const salt = await bcryptjs.genSalt()
        const passwordEnc = await bcryptjs.hashSync(password, salt)
        usuarioSys.password = passwordEnc
        const usuarioSyncSaved = await usuarioSys.save()
        return res.status(201).json(usuarioSyncSaved)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: e
        })
    }
}
/** Loguea un usuario */
const login = async (req = request,
                     res = response) => {
    const {email, password} = req.body
    try{
        const usuarioSys = await UsuarioSys.findOne({
            email
        })
        if(!usuarioSys){
            return res.status(404).json({
                msg: 'No existe este usuario'
            })
        }
        if(!usuarioSys.estado){
            return res.status(401).json({
                msg: 'Usuario inactivo'
            })
        }

        const isPassword = bcryptjs.compareSync(
            password, usuarioSys.password
        )
        if(!isPassword){
            return res.status(401).json({
                msg: 'Credenciales incorrectas'
            })
        }
        const payload = {
            usuario: usuarioSys.email,
            nombre: usuarioSys.nombre,
            rol: usuarioSys.rol
        }
        const token = await jwt.sign(
            payload,
            config.key, {
                expiresIn: '1h'
            }
        );
        return res.json({
            usuarioSys,
            token
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: e
        })
    }
}

module.exports = {
    register,
    login
}
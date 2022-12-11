const esAdmin = async (req = request,
                       res = response, next) => {
    console.log(req.user)
    const {rol} = req.user
    if(!req.user){
        return res.status(500).json({
            msg: 'Debe validar Token'
        })
    }
    if(rol !== 'ADMIN'){
        return res.status(403).json({
            msg: 'No eres Usuario con privilegios de Administrador'
        })
    }
    next()
}

module.exports = {
    esAdmin
}
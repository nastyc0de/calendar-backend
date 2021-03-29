const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');


const createUser = async(req, res = response) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                ok:false,
                msg:'Existe un usuario con ese correo'
            });
        }
        user = new User(req.body);
        // encriptar contrasena
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generateJWT(user.id, user.name);
        res.status(201).json({
            ok:true,
            uid: user._id,
            name:user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario'
        })
    }
}
const loginUser = async (req, res = response) =>{
    const {email, password} = req.body;
    try {
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario con ese correo no existe'
                });
            }
            // Confirmar las contrasenas
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    ok:false,
                    msg:'Password Incorrecto'
                });
            }
            // generar un jwt
            const token = await generateJWT(user.id, user.name);
            res.json({
                ok:true,
                uid:user.id,
                name:user.name,
                token
            })
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario'
        })
   }
    
}
const revalidateToken =  async(req, res = response) =>{
    const uid = req.uid;
    const name = req.name;
    const token = await generateJWT(uid, name);
    res.json({
        ok:true,
        msg:'renew',
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken

}
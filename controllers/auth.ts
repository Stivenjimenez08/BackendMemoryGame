import {Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/user'
import generateJWT from '../helpers/generate-jwt';

export const login= async(req: Request, res: Response) =>{

    const { email, password }= req.body
    
    try {
    
     const login = await User.findOne({
        where: {
            email
        }
     })
     if (!login){
        return res.status(400).json({
            msg: 'usuario no existente'
        })
     }

     const validpassword = bcrypt.compareSync( password ,login.dataValues.password)
    
     if (!validpassword){
        return res.status(400).json({
            msg: 'correo o contrasena invalido'
        })
     }

     const token = await generateJWT(login.dataValues.id)
     console.log('token',token)

     return res.status(200).json({
        login,
        token
     })

    } catch (error) {
        console.log(error)
    }
}

export const logout = (req: Request, res: Response) => {
    return res.status(200).json({
        msg:"El usuario cerro sesion correctamente"
    })
}

export const validateToken = async(req: Request, res: Response) => {
    
    const {id} = req.body
    console.log('id', id)

    const user = await User.findByPk(id)
    
    if(!user){
        return res.status(200).json({
            user,
            msg: 'Usuario no encontrado'
        })
    }

    return res.status(200).json({
        user, 
        msg:'Token validado'
    })
}
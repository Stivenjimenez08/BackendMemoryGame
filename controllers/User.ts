import {Response, Request} from 'express'
import bcrypt from 'bcryptjs'
import user from '../models/user'

export const createUser = async(req: Request, res: Response) =>{

    
    let { userName, email, password} = req.body

    const valemail = await user.findOne({
        where: {
            email
        }
    })
    if(valemail){
        return res.status(200).json({
            msg: `Email en uso`
        }) 
    }
    
    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt)

    const users = await user.create({ userName, email, password })

    res.status(200).json({
        msg: `Registro exitoso`,
        users
    }) 
}

export const updateUser= async(req: Request, res: Response)=>{
 
    let { userName, email, password, id} = req.body;

    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt)

    const users= await user.update({userName, email, password },{
        where:{
            id
        }
    })
     
    res.status(200).json({
        msg: `Usuario actualizado correctamente`,
        users
    }) 
}

export const userById = async ( req: Request, res: Response ) =>{

    const {id} = req.params
    
    const users = await user.findAll({
        attributes:['id', 'userName','email','password'],
        where:{
            id
        }
    })

    if (users) {
        res.status(200).json({
            users
        })
    } else {
        res.status(400).json({
            msg: 'Usuario no encontrado'
        })
    }
}

export const updatePassword= async(req: Request, res: Response)=>{
 
    let { id, password } = req.body;

    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt)

    const users= await user.update({ password},{
        where:{
            id
        }
    })
     
    res.status(200).json({
        msg: `contrasena actualizada correctamente`,
        users
    }) 
}
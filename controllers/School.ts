import { Request, Response } from 'express';
import  schools  from '../models/school'; 

export const getAllSchools = async (req: Request, res: Response) => {
    try {
        const allSchools = await schools.findAll(); 

        if (!allSchools || allSchools.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron escuelas'
            });
        }

        res.status(200).json({
            msg: 'Lista de escuelas',
            schools: allSchools
        });
    } catch (error: any) {
        res.status(500).json({
            msg: 'Error al obtener la lista de escuelas',
            error: error.message
        });
    }
};

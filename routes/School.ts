import { Router, Response } from "express";
import { getAllSchools } from "../controllers/School"; 
const router = Router();

router.get('/getAllSchools', getAllSchools);

router.get('*', (res: Response) => {
    res.status(404).json({
        msg: 'Error 404 | Page Not Found'
    })
})

export default router;

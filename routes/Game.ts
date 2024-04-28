import { Router, Response, Request } from 'express';
import { createGame, getAllGames } from '../controllers/Game';

const router = Router();

router.post('/createGame', createGame);
router.get('/getAllGames', getAllGames);

router.get('*', (req: Request, res: Response) => {
    res.status(404).json({
        msg: 'Error 404 | Page Not Found'
    });
});

export default router;

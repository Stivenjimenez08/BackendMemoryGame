import { Response, Request } from 'express';
import game from '../models/game';
import schools from '../models/school'
import cataloggames from '../models/cataloggame'


export const createGame = async (req: Request, res: Response) => {
    try {
        const { name, age, grade, hit, failure, note, score, playingTime, idSchool} = req.body;
        const newGame = await game.create({
            name,
            age,
            grade,
            hit, 
            failure, 
            note,
            score,
            playingTime,
            idSchool
        });
        res.status(200).json({
            msg: 'Juego creado exitosamente',
            game: newGame
        });
    } catch (error: any) {
        res.status(500).json({
            msg: 'Error al crear el juego',
            error: error.message
        });
    }
};

export const getAllGames = async (req: Request, res: Response) => {
    try {
        const games = await game.findAll({
            attributes: ['id', 'name', 'age', 'grade',"hit", "failure", "note", 'score', 'playingTime', 'idSchool', 'idGame'], 
            include: [
                {
                    model: schools,
                    attributes: ['name'] 
                },
                {
                    model: cataloggames,
                    attributes: ['name'] 
                }
            ]
        });

        if (!games || games.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron juegos'
            });
        }

        res.status(200).json({
            msg: 'Lista de juegos',
            games: games
        });
    } catch (error: any) {
        res.status(500).json({
            msg: 'Error al obtener la lista de juegos',
            error: error.message
        });
    }
};


import express, { Request, Response } from 'express';
import { ErrorHandler } from '../../middleware/errors/error.handler';
import { getAll, addReplay } from './moves.service';

const router = express.Router({ mergeParams: true });

router.get('/', async (_req: Request, res: Response, next) => {
  const model = await getAll();
  if (model) {
    res.send(model);
  } else next(new ErrorHandler(404));
});

router.post('/', async (req: Request, res: Response, next) => {
  const replay = await addReplay(req.body);
  if (replay) res.send(replay);
  else next(new ErrorHandler(404));
});

export default router;

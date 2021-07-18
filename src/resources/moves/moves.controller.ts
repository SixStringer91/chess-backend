import express, { Request, Response } from 'express';
import { createTest } from './moves.service';

const router = express.Router({ mergeParams: true });

router.get('/test', async (_req: Request, res: Response) => {
  const model = await createTest();
  res.send(model);
});

export default router;

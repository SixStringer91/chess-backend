import { IReplay } from '../../interfaces/interfaces';
import { Moves } from './moves.schemas';

export const getAll = async (): Promise<IReplay> => Moves.find({});
export const addReplay = async (body: IReplay): Promise<IReplay> => Moves.create(body);

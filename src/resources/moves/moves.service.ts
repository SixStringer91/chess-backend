import { IReplay } from '../../interfaces/interfaces';
import { create } from '../../schemas/mongoose.schemas';

export const createTest = async ():Promise<IReplay> => create();

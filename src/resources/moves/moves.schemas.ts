import mongoose from 'mongoose';
import { FigureColor, ChessFigures } from '../../enums/enums';
import { IReplay } from '../../interfaces/interfaces';

const figureMoves = {
  prevPosition: [Number, Number],
  position: [Number, Number],
  time: Number,
  color: String,
  type: String
};

export const MovesSchema = new mongoose.Schema(
  {
    [FigureColor.BLACK]: { name: String, moves: [figureMoves] },
    [FigureColor.WHITE]: { name: String, moves: [figureMoves] }
  },
  { typeKey: '$type' }
);

export const Moves = mongoose.model('Moves', MovesSchema);

export const create = (): Promise<IReplay> => Moves
  .create({
    [FigureColor.BLACK]: {
      name: 'Player 1',
      moves: [
        {
          prevPosition: [0, 1],
          position: [1, 1],
          time: 2002020,
          color: FigureColor.BLACK,
          type: ChessFigures.HORSE
        }
      ]
    },
    [FigureColor.WHITE]: {
      name: 'Player 2',
      moves: [
        {
          prevPosition: [0, 1],
          position: [1, 1],
          time: 2002020,
          color: FigureColor.WHITE,
          type: ChessFigures.ROOK
        }
      ]
    }
  });

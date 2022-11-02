import { Column } from '../../../shared/models/interfaces/interfaces-board';
export interface StateBoard {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}
export const initialStateBoard: StateBoard = {
  id: '',
  title: '',
  description: '',
  columns: [],
};

export const idBoard = '958f9259-6360-40e7-9655-fe87531d026a'; //берём в общем store?

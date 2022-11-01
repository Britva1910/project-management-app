import { Column } from '../../models/interfaces';
export interface State {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}
export const initialState: State = {
  id: '',
  title: '',
  description: '',
  columns: [],
};

export const idBoard = '958f9259-6360-40e7-9655-fe87531d026a'; //берём в общем store?

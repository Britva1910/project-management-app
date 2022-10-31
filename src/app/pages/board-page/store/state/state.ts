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

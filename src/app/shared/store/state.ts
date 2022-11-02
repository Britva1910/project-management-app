export interface Appstate {
  apiStatus: string;
  apiResponseMessage: string;
}

export const initialState: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: '',
};

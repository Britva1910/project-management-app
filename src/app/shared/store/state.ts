export interface Appstate {
  apiStatus: string;
  apiResponseMessage: string;
  appData: {
    userData: {
      id: string;
    };
    boardData: {
      idCheckBoard: string;
    };
  };
}

export const initialState: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: '',
  appData: {
    userData: {
      id: '',
    },
    boardData: {
      idCheckBoard: '',
    },
  },
};

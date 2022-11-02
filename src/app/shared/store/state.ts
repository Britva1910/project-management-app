export interface AppState {
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

export const initialState: Readonly<AppState> = {
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

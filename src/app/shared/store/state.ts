export interface AppState {
  apiStatus: string;
  apiResponseMessage: string;
  token: string;
  userId: string;
  isLogin: boolean;
  currentBoardId: string;
}

export const initialState: Readonly<AppState> = {
  apiStatus: '',
  apiResponseMessage: '',
  token: '',
  userId: '',
  isLogin: false,
  currentBoardId: '',
};

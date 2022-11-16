export interface AppState {
  apiStatus: string;
  apiResponseMessage: string;
  token: string;
  userId: string;
  userName: string;
  userLogin: string;
  isLogin: boolean;
  currentBoardId: string;
}

export const initialState: Readonly<AppState> = {
  apiStatus: '',
  apiResponseMessage: '',
  token: '',
  userId: '',
  userName: '',
  userLogin: '',
  isLogin: false,
  currentBoardId: '',
};

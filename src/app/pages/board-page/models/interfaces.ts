export interface GetBoardId {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}
interface Files {
  filename: string;
  fileSize: number;
}
interface Tasks {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: Files[];
}
interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Tasks[];
}
///////////////////
export interface CreateUpdateColumn {
  id: string;
  title: string;
  order: number;
}
//////////////////
export type GetAllTaskOneColumn = AllTasksOneColumn[];
export interface AllTasksOneColumn {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: Files[];
}
export interface CreateOneTask {
  id: string;
  title: string;
  description: string;
  userId: string;
}
export interface PutOneTask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
//////////////////

export interface Todo {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

export interface CreateTodoDto {
  _id: string;
  title: string;
  description: string;
}

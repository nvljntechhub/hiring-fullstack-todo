import { DoneFilter } from 'src/enum';
import { Todo } from 'src/models/todo.interface';
import { apiGenericHandler, Method } from 'src/utils/apiManager';
import { apiUrls } from 'src/utils/properties';

const getAllTodos = async (
  page: number,
  limit: number,
  searchTerm: string,
  done: DoneFilter | undefined
): Promise<Todo[]> => {
  const responseData = await apiGenericHandler(
    Method.GET,
    apiUrls.TODO,
    '',
    `?offset=${page}&limit=${limit}&searchTerm=${searchTerm}&done=${done !== DoneFilter.ALL ? Boolean(done) : ''}`
  );
  return responseData;
};

const createTodo = async (data: Todo): Promise<{}> => {
  const responseData = await apiGenericHandler(Method.POST, apiUrls.TODO, data);
  return responseData;
};

const updateTodo = async (data: Todo): Promise<{}> => {
  const responseData = await apiGenericHandler(
    Method.PUT,
    apiUrls.TODO + `/${data._id}`,
    data
  );
  return responseData;
};

const updateStatusTodo = async (id: string): Promise<{}> => {
  const responseData = await apiGenericHandler(
    Method.PATCH,
    apiUrls.TODO + `/${id}` + apiUrls.STATUS
  );
  return responseData;
};

const deleteTodo = async (id: string): Promise<{}> => {
  const responseData = await apiGenericHandler(
    Method.DELETE,
    apiUrls.TODO + `/${id}`
  );
  return responseData;
};

export { getAllTodos, createTodo, updateTodo, updateStatusTodo, deleteTodo };

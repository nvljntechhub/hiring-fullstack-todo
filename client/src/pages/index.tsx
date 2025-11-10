import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import ListTodos from './ListTodos';
import {
  StyledAddButton,
  StyledSearchField,
  StyledStatusFilter,
  TodosContainer
} from 'src/components/Styled/Todos';
import { Todo } from 'src/models/todo.interface';
import {
  deleteTodo,
  getAllTodos,
  updateStatusTodo
} from 'src/services/todo.service';
import { pagination } from 'src/utils/properties';
import SuspenseLoader from 'src/components/SuspenseLoader';
import ActionMenu from './ActionMenu';
import CreateAndUpdateModal from './CreateAndUpdateModal';
import { DoneFilter, ModalAction } from 'src/enum';
import { Grid, SelectChangeEvent } from '@mui/material';
import { useSnackbar } from 'notistack';
import ConfirmDialog from 'src/components/ConfirmDialog';

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [clickedTodo, setClickedTodo] = useState<Todo>();
  const [page, setPage] = useState<number>(pagination.OFFSET);
  const [limit, setLimit] = useState<number>(pagination.PAGE_LIMIT);
  const [count, setCount] = useState(pagination.COUNT);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [doneFilter, setDoneFilter] = useState<DoneFilter>(DoneFilter.ALL);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCreateUpdateModalOpen, setIsCreateUpdateModalOpen] =
    useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
    useState<boolean>(false);
  const [modalAction, setModalAction] = useState<ModalAction>();
  const [renderList, setRenderList] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const isActionMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    listTodos();
    setLoading(false);
  }, [renderList, searchTerm]);

  const listTodos = async () => {
    const done = doneFilter === null ? undefined : doneFilter;
    try {
      const response: any = await getAllTodos(page, limit, searchTerm, done);
      setTodos(response.data);
      setCount(response.count);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setRenderList((prev) => prev + 1);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value);
    setPage(pagination.OFFSET);
    setRenderList((prev) => prev + 1);
  };

  const handleActionMenuClick = (
    event: MouseEvent<HTMLElement>,
    todo: Todo
  ) => {
    setAnchorEl(event.currentTarget);
    setClickedTodo(todo);
  };

  const handleCreateClick = () => {
    setIsCreateUpdateModalOpen(true);
    setModalAction(ModalAction.CREATE);
  };

  const handleUpdateClick = () => {
    setIsCreateUpdateModalOpen(true);
    setModalAction(ModalAction.UPDATE);
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
    setModalAction(ModalAction.UPDATE);
  };

  const handleUpdateStatus = async (id: string) => {
    try {
      const response: any = await updateStatusTodo(id);
      enqueueSnackbar(response.message, { variant: 'success' });
      setRenderList((prev) => prev + 1);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleCloseCreateUpdateModal = () => {
    setRenderList((prev) => prev + 1);
    setIsCreateUpdateModalOpen(false);
    setAnchorEl(null);
  };

  const handleDoneFilterChange = (event: SelectChangeEvent) => {
    setDoneFilter(Number(event.target.value));
    setRenderList((prev) => prev + 1);
  };

  const handleCloseDeleteConfirm = () => {
    setRenderList((prev) => prev + 1);
    setIsDeleteConfirmOpen(false);
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const response: any = await deleteTodo(clickedTodo!._id);
      enqueueSnackbar(response.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setRenderList((prev) => prev + 1);
    }
  };

  return loading ? (
    <SuspenseLoader />
  ) : (
    <TodosContainer>
      <Grid container justifyContent="flex-end" rowSpacing={2}>
        <Grid size={12}>
          <Grid container justifyContent="space-between">
            <Grid size={3}>
              <Grid container columnSpacing={1}>
                <Grid size={6}>
                  <StyledSearchField
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Grid>
                <Grid size={6}>
                  <StyledStatusFilter
                    option={doneFilter}
                    handleChange={handleDoneFilterChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={3}>
              <StyledAddButton
                label="Create Todo"
                onClick={handleCreateClick}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <ListTodos
            todos={todos}
            count={count}
            page={page}
            limit={limit}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            onActionMenuClick={handleActionMenuClick}
            handleUpdateStatus={handleUpdateStatus}
          />
        </Grid>
      </Grid>
      {isActionMenuOpen && (
        <ActionMenu
          anchorEl={anchorEl}
          isActionMenuOpen={isActionMenuOpen}
          setAnchorEl={setAnchorEl}
          status={clickedTodo.done}
          onUpdateClick={handleUpdateClick}
          onDeleteClick={handleDeleteClick}
        />
      )}
      {isCreateUpdateModalOpen && (
        <CreateAndUpdateModal
          action={modalAction}
          updatingTodo={clickedTodo}
          isCreateUpdateModalOpen={isCreateUpdateModalOpen}
          handleCloseCreateUpdateModal={handleCloseCreateUpdateModal}
        />
      )}
      {isDeleteConfirmOpen && (
        <ConfirmDialog
          title="Delete Todo"
          message="Are you sure you want to delete this todo? This action cannot be undone."
          buttonTitle="Delete"
          open={isDeleteConfirmOpen}
          onClose={handleCloseDeleteConfirm}
          onSubmit={handleDelete}
        />
      )}
    </TodosContainer>
  );
};

export default Dashboard;

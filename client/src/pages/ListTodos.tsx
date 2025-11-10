import { ChangeEvent, FC, MouseEvent } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@mui/material';
import {
  MoreActionButton,
  NothingToShowBoxTableRow,
  StyledStatusChip,
  StyledTableContainer,
  TableContainerBox
} from 'src/components/Styled';
import { Todo } from 'src/models/todo.interface';
import { pageLimitOptions } from 'src/utils/properties';

const ListTodos: FC<{
  todos: Todo[];
  count: number;
  page: number;
  limit: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
  onActionMenuClick: (event: MouseEvent<HTMLElement>, todo: Todo) => void;
  handleUpdateStatus: (id: string) => void;
}> = ({
  todos,
  count,
  page,
  limit,
  handleChangePage,
  handleChangeRowsPerPage,
  onActionMenuClick,
  handleUpdateStatus
}) => {
  return (
    <>
      <TableContainerBox>
        <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Done Status</TableCell>{' '}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            {todos.length === 0 && (
              <NothingToShowBoxTableRow columnsCount={4} />
            )}
            <TableBody>
              {todos.map((todo) => (
                <TableRow
                  key={todo._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {todo.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {todo.description}
                  </TableCell>
                  <TableCell align="center">
                    <StyledStatusChip
                      status={todo.done}
                      handleClick={() => handleUpdateStatus(todo._id)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <MoreActionButton
                      onClick={(event: MouseEvent<HTMLElement>) =>
                        onActionMenuClick(event, todo)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <TablePagination
          rowsPerPageOptions={pageLimitOptions}
          component="div"
          count={count}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainerBox>
    </>
  );
};

export default ListTodos;

import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiResponse } from 'src/common/utils/interfaces/common.interface';
import { successMessages } from 'src/utils/properties.utils';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('searchTerm') searchTerm: string,
    @Query('done') done: boolean,
  ): Promise<{ data: Todo[]; count: number }> {
    const skip = offset * limit;
    const { data, count } = await this.todoService.findAll(
      limit,
      skip,
      searchTerm,
      done,
    );
    return {
      data: data,
      count: count,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<ApiResponse<Todo>> {
    const createdTodo = await this.todoService.create(createTodoDto);
    return {
      message: successMessages.TODO_CREATED_SUCCESSFULLY,
      data: createdTodo,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<ApiResponse<Todo>> {
    const updatedTodo = await this.todoService.update(id, updateTodoDto);
    return {
      message: successMessages.TODO_UPDATED_SUCCESSFULLY,
      data: updatedTodo,
    };
  }

  @Patch(':id/done')
  async toggleDone(@Param('id') id: string): Promise<ApiResponse<Todo>> {
    const patchedTodo = await this.todoService.toggleDone(id);
    return {
      message: successMessages.TODO_TOGGLE_UPDATED_SUCCESSFULLY,
      data: patchedTodo,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.todoService.delete(id);
    return {
      message: successMessages.TODO_DELETED_SUCCESSFULLY,
    };
  }
}

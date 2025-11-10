import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todo';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { errorMessages, errorTypes } from 'src/utils/properties.utils';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(
    limit: number,
    skip: number,
    searchTerm?: string,
    done?: boolean,
  ): Promise<{ data: TodoDocument[]; count: number }> {
    const filter: any = {};
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i');
      filter.title = { $regex: searchRegex };
    }

    if (done) {
      filter.done = done;
    }

    const count = await this.todoModel.countDocuments(filter).exec();
    const todos = await this.todoModel
      .find(filter)
      .sort({ done: -1, _id: -1 })
      .limit(limit)
      .skip(skip)
      .exec();

    return { data: todos, count };
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoDocument> {
    const createdTodo = new this.todoModel(createTodoDto);
    try {
      return await createdTodo.save();
    } catch (error) {
      if (error.name === errorTypes.VALIDATION_ERROR)
        throw new InternalServerErrorException(
          errorMessages.DB_VALIDATION_FAILED,
        );

      throw new InternalServerErrorException(errorMessages.CREATE_UNSUCCESSFUL);
    }
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDocument> {
    try {
      const currentTodo = await this.todoModel.findById(id).exec();
      if (!currentTodo) throw new NotFoundException(errorMessages.NOT_FOUND);
      const hasDataChanged = this.checkForDataChanges(
        currentTodo,
        updateTodoDto,
      );
      if (!hasDataChanged)
        throw new BadRequestException(errorMessages.NO_CHANGES_DETECTED);
      const updatedTodo = await this.todoModel
        .findByIdAndUpdate(id, updateTodoDto, { new: true })
        .exec();
      if (!updatedTodo) throw new NotFoundException(errorMessages.NOT_FOUND);

      return updatedTodo;
    } catch (error) {
      if (error.name === errorTypes.CAST_ERROR)
        throw new BadRequestException(errorMessages.INVALID_FORMAT);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      )
        throw error;
      throw new InternalServerErrorException(errorMessages.UPDATE_UNSUCCESSFUL);
    }
  }

  async toggleDone(id: string): Promise<TodoDocument> {
    try {
      const existingTodo = await this.todoModel.findById(id).exec();
      if (!existingTodo) throw new NotFoundException(errorMessages.NOT_FOUND);
      existingTodo.done = !existingTodo.done;
      return existingTodo.save();
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.todoModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0)
        throw new NotFoundException(`Todo not found`);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Todo delete unsuccessful');
    }
  }

  private checkForDataChanges(
    currentTodo: TodoDocument,
    updateDto: UpdateTodoDto,
  ): boolean {
    const currentData = currentTodo.toObject();
    const fieldsToCompare: (keyof UpdateTodoDto)[] = [
      'title',
      'description',
      'done',
    ];

    for (const field of fieldsToCompare) {
      if (
        field in updateDto &&
        updateDto[field] !== undefined &&
        currentData[field] !== updateDto[field]
      ) {
        return true;
      }
    }

    return false;
  }
}

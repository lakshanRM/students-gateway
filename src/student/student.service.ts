import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
    });
  }

  async create(createStudentInput: CreateStudentInput) {
    return await this.client.send('create', createStudentInput);
  }

  async createBulk(createStudentInputAry: CreateStudentInput[]) {
    return await this.client.send('createBulk', createStudentInputAry);
  }

  async findAll() {
    return await this.client.send('find', '');
  }

  async findOne(id: number) {
    return await this.client.send('findOne', id);
  }

  async update(id: number, updateStudentInput: UpdateStudentInput) {
    return await this.client.send('update', {
      id: id,
      student: updateStudentInput,
    });
  }

  async remove(id: number) {
    return await this.client.send('delete', id);
  }
}

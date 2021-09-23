import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  private client: ClientProxy;
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {
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

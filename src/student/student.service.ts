import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async create(createStudentInput: CreateStudentInput): Promise<Student> {
    const newStudent = this.studentRepo.create(createStudentInput);
    return this.studentRepo.save(newStudent);
  }

  async createBulk(
    createStudentInputAry: CreateStudentInput[],
  ): Promise<Student[]> {
    const studnetsAry: any = [];
    createStudentInputAry.forEach((student) => {
      studnetsAry.push(this.studentRepo.create(student));
    });

    return await this.studentRepo.save(studnetsAry);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepo.find();
  }

  async findOne(id: number): Promise<Student> {
    return this.studentRepo.findOneOrFail(id);
  }

  async update(
    id: number,
    updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    const student = await this.studentRepo.findOne(id);
    student.firstName = updateStudentInput.firstName;
    student.lastName = updateStudentInput.lastName;
    student.dob = updateStudentInput.dob;
    student.age = updateStudentInput.age;
    student.email = updateStudentInput.email;
    return await this.studentRepo.save(student);
  }

  async remove(id: number): Promise<Student> {
    const student = await this.studentRepo.findOne(id);
    await this.studentRepo.remove(student);
    return student;
  }
}

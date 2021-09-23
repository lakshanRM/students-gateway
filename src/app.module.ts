import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { StudentModule } from './student/student.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    StudentModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    ConfigModule.forRoot(),
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

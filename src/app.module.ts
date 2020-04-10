import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmCoreModule.forRoot(typeORMConfig),
    TasksModule,
  ],
})
export class AppModule {
}

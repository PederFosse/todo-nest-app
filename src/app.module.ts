import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TodoModule],
})
export class AppModule {}

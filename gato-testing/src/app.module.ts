import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserQnaModule } from './user-qna/user-qna.module';

@Module({
  imports: [UserQnaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

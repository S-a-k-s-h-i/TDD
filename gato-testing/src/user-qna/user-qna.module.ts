import { Module } from '@nestjs/common';
import { UserQnaService } from './user-qna.service';

@Module({
  providers: [UserQnaService]
})
export class UserQnaModule {}

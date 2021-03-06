import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  imports:[UserModule],
  exports:[AuthService]
})
export class AuthModule {}

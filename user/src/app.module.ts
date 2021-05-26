import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [TypeOrmModule.forRoot(),UserModule, TodosModule, AuthModule,PassportModule],
  controllers: [AppController],
  providers: [AppService,LocalStrategy],
})
export class AppModule {}

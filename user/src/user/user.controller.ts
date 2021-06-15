import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateuserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
   constructor(private usersService:UserService){}
   
   @Get()
   getAll(@Query('name') name?:string):Promise<User[] | User>{
       return this.usersService.getAllUser(name)
   }
   
   @Get('/:id')
   getUserById(@Param('id',ParseIntPipe) userId:number):Promise<User>{
      return this.usersService.getUserById(userId);
   }

   @Post()
   createUser(@Body() createUserDTO:CreateuserDTO):Promise<User>{
       return this.usersService.createUser(createUserDTO);
    }

    @Patch('/:id')
    updateUser(@Param('id',ParseIntPipe) id:number,@Body() updateUserDTO:UpdateUserDTO):Promise<User>{
       return this.usersService.updateUser(id,updateUserDTO)
    }

    @Delete('/:id')
    deleteUser(@Param('id',ParseIntPipe) id:number):Promise<User>{
       return this.usersService.deleteUser(id)
    }
}

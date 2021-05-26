import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateuserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
     constructor(
         @InjectRepository(User) private usersRepository:Repository<User>
         ){}
    
    async getAllUser(name?:string):Promise<User[] | User>{
        if(name) return await this.getUserByName(name)
        return await this.usersRepository.find()
    }

   
    async getUserById(id:number):Promise<User>{
        const user = await this.usersRepository.findOne(id)
        if(!user) throw new NotFoundException()
        return user

    }

    async createUser(createUserDTO:CreateuserDTO):Promise<User>{
        return await this.usersRepository.save(createUserDTO)
    }

    async updateUser(id:number,updateUserDTO:UpdateUserDTO):Promise<User>{
        console.log(id)
        console.log(updateUserDTO)
         const user = await this.getUserById(id);
         console.log(user)
         if(updateUserDTO.age) user.age = updateUserDTO.age
         if(updateUserDTO.PhoneNo) user.PhoneNo = updateUserDTO.PhoneNo
         if(updateUserDTO.password) user.password = updateUserDTO.password

         return this.usersRepository.save(user)
    }

    async deleteUser(id:number){
       const user = await this.getUserById(id);
       return this.usersRepository.remove(user)
    }

    async getUserByName(name:string):Promise<User>{
        return await this.usersRepository.findOne({name:name})
    }
}

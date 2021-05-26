import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async validateUser(username:string,password:string){
        const user = await this.userService.getUserByName(username)
        if(user && user.password === password){
            const {password,...result} = user;
            return user
        }
        return null
    }
}

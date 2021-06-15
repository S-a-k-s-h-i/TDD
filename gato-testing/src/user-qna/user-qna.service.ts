import { Inject, Injectable } from '@nestjs/common';
import { UserQna } from 'src/model/user-qna.entity';
import { EntityManager } from 'typeorm';
import { UserQnaDto } from './dto/user-qna.dto';
import { UserQnaRepository } from './repositories/user-qna.repository';

@Injectable()
export class UserQnaService {
    constructor(
        @Inject('UserQnaRepository')
        private readonly userQnaRepository: UserQnaRepository
    ){}

    async storeUserQna(userQnaDto: UserQnaDto[], entityManager?: EntityManager): Promise<UserQna[]> {
        if(entityManager) 
            return await this.userQnaRepository.createMany(userQnaDto, entityManager);
    }
}

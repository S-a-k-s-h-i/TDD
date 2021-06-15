import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserQna } from "../../model/user-qna.entity";
import { EntityManager, Repository } from "typeorm";
import { UserQnaDto } from "../dto/user-qna.dto";
import { Translation } from '../../helper/translation.helper';


@Injectable()
export class UserQnaRepository  {
    
    constructor(@InjectRepository(UserQna)
    private readonly userQnaRepository: Repository<UserQna>,
    ) {}

    async createMany(userQnaDto: UserQnaDto[], entityManager?: EntityManager): Promise<UserQna[]> {
        try {
            return await entityManager.save(UserQna, Object.assign(userQnaDto))
        } catch(e) {
            throw new HttpException(
                Translation.translate("QUESTION_ADD_FAILED"),
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    updateMany(userQnaDto: UserQnaDto, entityManager?: EntityManager): Promise<UserQna[]> {
        try {
            return entityManager.save(UserQna, Object.assign(userQnaDto));
        } catch(e) {
            throw new HttpException(
                Translation.translate("QUESTION_UDPATE_FAILED"),
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
import { Injectable } from '@nestjs/common';
import { UserRepository } from "../../domain/repositories/user.repositories";
import { UserEntity } from "../../domain/entities/user.entity";

@Injectable()
export class UserRepositoryImp implements UserRepository {

    getUserbyId(id: string): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }

    getUserbyEmail(email: string): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }


    createUser(id: string, email: string, username: string, photo: string): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }

    deleteUser(email: string): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }

    updateUser(user: UserEntity): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }

    getAvgClassification(id: string): Number {
        throw new Error('Method not implemented.');
    }
    
}
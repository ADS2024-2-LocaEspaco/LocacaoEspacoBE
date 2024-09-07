import { Injectable } from '@nestjs/common';
import { UserRepository } from "../../domain/repositories/user.repositories.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { getUserbyId, getUserbyEmail, createUser, deleteUser } from "../database/models/User.js";

@Injectable()
export class UserRepositoryImp implements UserRepository {

    getUserbyId(id: string): UserEntity {
        if (!id) {
            throw Error ("Id não identificado, tente novamente.")
        }

        throw Error ("Id não identificado, tente novamente.")
        //return getUserbyId(id);
    }

    getUserbyEmail(email: string): Promise<UserEntity> {
        if (!email) {
            throw Error ("Email não identificado, tente novamente.")
        }

        throw new Error('Method not implemented.');
        //return getUserbyEmail(email);
    }


    createUser(email: string, username: string, photo: string): Promise<UserEntity> {
        throw new Error('Method not implemented.');
        //return createUser(username, email, photo);
    }

    deleteUser(email: string): Promise<UserEntity> {
        if (!email) {
            throw Error ("Email não identificado, tente novamente.")
        }

        throw new Error('Method not implemented.');
        //return deleteUser(email);
    }

    updateUser(user: UserEntity): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }

    getAvgClassification(id: string): Number {
        throw new Error('Method not implemented.');
    }
    
}
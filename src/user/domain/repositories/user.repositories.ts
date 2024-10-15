// src/user/domain/repositories
//import { usuario } from "@prisma/client";

import { userProfile } from "src/user/infrastructure/database/dto/user.profile.information";

export interface UserRepository {
    //Find user by attribute
    getUserbyId(id: string): Promise<userProfile>;
    getUserbyEmail(email: string): Promise<userProfile>;

    //CRUD
    //deleteUser(email: string): Promise<usuario>;
    updateBankInformation(id: number, user: userProfile): Promise<String>;
    updateUserProfile(user: userProfile, id: number): Promise<String>;

    // average classification
    //getAvgClassification(id: string): Number;
}
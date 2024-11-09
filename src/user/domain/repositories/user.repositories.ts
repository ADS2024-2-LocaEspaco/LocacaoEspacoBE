// src/user/domain/repositories
//import { usuario } from "@prisma/client";

import { userAccountInformation } from "src/user/infrastructure/database/dto/user.profile.account.information";
import { userContactInformation } from "src/user/infrastructure/database/dto/user.profile.contact.information";
import { userImg } from "src/user/infrastructure/database/dto/user.profile.img";
import { userProfile } from "src/user/infrastructure/database/dto/user.profile.information";

export interface UserRepository {
    //Find user by attribute
    getUserbyId(id: number): Promise<userProfile | null>;
    getUserbyEmail(email: string): Promise<userProfile | null>;

    //CRUD
    disableUser(id: number): Promise<string | null>;
    updateBankInformation(id: number, user: userProfile): Promise<string | null>;
    updateProfileImage(id: number, userImg: userImg): Promise<string | null>;
    updateUserProfile(user: userProfile, id: number): Promise<string | null>;
    updateAccountInformation(id: number, user: userAccountInformation): Promise<string | null>
    updateContactInformation(id: number, id_user: number, user: userContactInformation): Promise<string | null>

    // average classification
    //getAvgClassification(id: string): Number;
}
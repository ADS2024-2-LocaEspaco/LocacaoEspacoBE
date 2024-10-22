import { userAccountInformation } from "./user.profile.account.information";
import { userBankInformation } from "./user.profile.bank.information";
import { userBasicInformation } from "./user.profile.basic.information";
import { userContactInformation } from "./user.profile.contact.information";
import { userImg } from "./user.profile.img";

export class userProfile {
    userImg: userImg;
    userBasicInformation: userBasicInformation;
    userAccountInformation: userAccountInformation;
    userContactInformation: userContactInformation;
    userBankInformation: userBankInformation;
}
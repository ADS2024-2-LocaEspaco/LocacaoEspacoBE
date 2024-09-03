import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    googleLogin(req: any) {
        if(!req.user) {
          return 'Nenhum usuário';
        }
    
        return {
          message: "Usuário logado",
          user: req.user
        }
      }
}
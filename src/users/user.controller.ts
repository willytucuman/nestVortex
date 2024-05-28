import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller("user")
export class UserController{
    constructor(private userRepository: UsersService){
}

@Get()
getAll(){
    return this.userRepository.findAll()
}

}
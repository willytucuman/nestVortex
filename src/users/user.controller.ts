import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller("user")
export class UserController{
    constructor(private userRepository: UsersService){
}

@Get()
getAll(){
    return this.userRepository.findAll()
}

@Post()
create(@Body() user:CreateUserDto){
    return this.userRepository.create(user)
}



}
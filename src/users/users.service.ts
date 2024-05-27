import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'tomas',
      password: 'Tomas1234',
      role:"Secretario"
    },
    {
      userId: 2,
      username: 'admin',
      password: 'admin1234',
      role:"Admin"
    },
    {
      userId: 2,
      username: 'tomas',
      password: 'tomas123',
      role:"usuario"
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  findAll(){
    return this.users.find(user=>user)
  }
  create(user:CreateUserDto){
     return
  }
}
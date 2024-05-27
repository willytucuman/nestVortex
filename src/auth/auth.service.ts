import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService:UsersService,
    private jwtService: JwtService,
  ){}

  async signIn(username: string, pass: string): Promise<{access_token:string}> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { username: result.username, sub: result.userId,role:result.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}

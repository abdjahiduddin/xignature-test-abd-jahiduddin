import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignUpDto } from './dto/signup.dto';
import { JwtPayload, LoginResponse, SignUpResponse } from './auth.interface';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponse> {
    return this.authRepository.createUser(signUpDto);
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { username, password } = loginDto;

    const user = await this.authRepository.findOneBy({ username });
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const payload: JwtPayload = {
        id: user.id,
        username,
        created_at: new Date().toISOString(),
      };
      const accessToken = await this.jwtService.sign(payload);
      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}

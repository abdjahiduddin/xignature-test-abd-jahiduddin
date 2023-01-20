import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignUpDto } from './dto/signup.dto';
import { SignUpResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async signUp(signUpDto: SignUpDto): Promise<SignUpResponse> {
    return this.authRepository.createUser(signUpDto);
  }
}

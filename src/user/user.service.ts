import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserSignUpDto } from './dto/user-signup.dto';
import { CreateUserResponse } from './interface/response.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<CreateUserResponse> {
    return this.userRepository.createUser(userSignUpDto);
  }
}

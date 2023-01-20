import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserSignUpDto } from './dto/user-signup.dto';
import { CreateUserResponse } from './interface/response.interface';
import { User } from './entity/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<CreateUserResponse> {
    return this.userRepository.createUser(userSignUpDto);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        username: true,
        fullname: true,
        email: true,
      },
    });
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async updateUser(id: string, userUpdateDto: UserUpdateDto): Promise<User> {
    return this.userRepository.updateUser(id, userUpdateDto);
  }
}

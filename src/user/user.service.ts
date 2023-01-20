import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserSignUpDto } from './dto/user-signup.dto';
import {
  CreateUserResponse,
  DeleteUserResponse,
} from './interface/response.interface';
import { User } from './entity/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<CreateUserResponse> {
    return this.userRepository.createUser(userSignUpDto);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        fullname: true,
      },
    });
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async updateUser(id: string, userUpdateDto: UserUpdateDto): Promise<User> {
    return this.userRepository.updateUser(id, userUpdateDto);
  }

  async deleteUser(id: string): Promise<DeleteUserResponse> {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      id,
      status: 'success',
      message: 'Successfully deleted user',
    };
  }
}

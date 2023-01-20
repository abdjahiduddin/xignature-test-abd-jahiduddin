import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DeleteUserResponse } from './user.interface';
import { User } from 'src/entity/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { isAuthorized } from 'src/helper/auth.helper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        fullname: true,
      },
    });
  }

  getUserById(id: string, authUser: User): Promise<User> {
    return this.userRepository.getUserById(id, authUser);
  }

  async updateUser(
    id: string,
    userUpdateDto: UserUpdateDto,
    authUser: User,
  ): Promise<User> {
    return this.userRepository.updateUser(id, userUpdateDto, authUser);
  }

  async deleteUser(id: string, authUser: User): Promise<DeleteUserResponse> {
    isAuthorized(id, authUser.id);

    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      id,
      status: 'success',
      message: 'Successfully delete user',
    };
  }
}

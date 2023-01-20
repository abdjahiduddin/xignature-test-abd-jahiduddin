import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserSignUpDto } from './dto/user-signup.dto';
import { CreateUserResponse } from './interface/response.interface';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        username: true,
        fullname: true,
      },
    });
  }

  async signUp(userSignUpDto: UserSignUpDto): Promise<CreateUserResponse> {
    return this.userRepository.createUser(userSignUpDto);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return found;
  }
}

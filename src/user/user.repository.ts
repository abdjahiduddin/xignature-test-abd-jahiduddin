import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserResponse } from './interface/response.interface';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async createUser(userSignUpDto: UserSignUpDto): Promise<CreateUserResponse> {
    const { username, fullname, email, password } = userSignUpDto;

    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const user = this.create({
        username,
        fullname,
        email,
        password: hashPassword,
      });

      await this.save(user);

      return {
        message: `Successfully create user ${username}`,
        created_at: user.created_at,
      };
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('Username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

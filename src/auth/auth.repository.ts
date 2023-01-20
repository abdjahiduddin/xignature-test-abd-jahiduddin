import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { SignUpResponse } from './auth.interface';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class AuthRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ) {
    super(
      authRepository.target,
      authRepository.manager,
      authRepository.queryRunner,
    );
  }

  async createUser(signUpDto: SignUpDto): Promise<SignUpResponse> {
    const { username, fullname, email, password } = signUpDto;

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
        id: user.id,
        status: 'success',
        message: `Successfully create user ${username}`,
        created_at: user.created_at,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserResponse } from './interface/response.interface';
import { UserUpdateDto } from './dto/user-update.dto';

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
      if (error.code === '23505') {
        throw new ConflictException('Username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!found) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return found;
  }

  async updateUser(id: string, userUpdateDto: UserUpdateDto): Promise<User> {
    const { username, fullname, email, oldPassword, newPassword } =
      userUpdateDto;

    const user = await this.findOne({ where: { id } });

    if (username) {
      user.username = username;
    }

    if (fullname) {
      user.fullname = fullname;
    }

    if (email) {
      user.email = email;
    }

    if (newPassword) {
      if (!oldPassword) {
        throw new BadRequestException('Your old password should not empty');
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (isMatch) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashPassword;
      } else {
        throw new UnauthorizedException('Please check your login credentials');
      }
    }

    try {
      await this.save(user);
      delete user.password;
      return user;
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

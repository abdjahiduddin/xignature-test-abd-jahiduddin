import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { CreateUserResponse } from './interface/response.interface';
import { User } from './entity/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signUp(@Body() userSignUpDto: UserSignUpDto): Promise<CreateUserResponse> {
    return this.userService.signUp(userSignUpDto);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    return this.userService.updateUser(id, userUpdateDto);
  }
}

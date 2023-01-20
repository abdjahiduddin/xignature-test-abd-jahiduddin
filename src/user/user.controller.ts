import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { CreateUserResponse } from './interface/response.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signUp(@Body() userSignUpDto: UserSignUpDto): Promise<CreateUserResponse> {
    return this.userService.signUp(userSignUpDto);
  }
}

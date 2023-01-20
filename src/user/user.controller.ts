import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { DeleteUserResponse } from './user.interface';
import { User } from 'src/entity/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorators';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id/profile')
  getUserById(
    @Param('id') id: string,
    @GetUser() authUser: User,
  ): Promise<User> {
    return this.userService.getUserById(id, authUser);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
    @GetUser() authUser: User,
  ): Promise<User> {
    return this.userService.updateUser(id, userUpdateDto, authUser);
  }

  @Delete('/:id')
  deleteUser(
    @Param('id') id: string,
    @GetUser() authUser: User,
  ): Promise<DeleteUserResponse> {
    return this.userService.deleteUser(id, authUser);
  }
}

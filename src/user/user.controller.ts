import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { DeleteUserResponse } from './user.interface';
import { User } from 'src/entity/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id/profile')
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

  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<DeleteUserResponse> {
    return this.userService.deleteUser(id);
  }
}

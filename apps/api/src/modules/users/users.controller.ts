import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../common/dto';
import { ApiResponse, User } from '../../common/interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): ApiResponse<User[]> {
    const users = this.usersService.findAll();
    return {
      success: true,
      data: users,
      message: 'Users retrieved successfully',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<User> {
    const user = this.usersService.findById(id);
    return {
      success: true,
      data: user,
      message: 'User retrieved successfully',
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): ApiResponse<User> {
    const user = this.usersService.create(createUserDto);
    return {
      success: true,
      data: user,
      message: 'User created successfully',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse {
    this.usersService.remove(id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from '../../common/interfaces';
import { CreateUserDto } from '../../common/dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
    },
    {
      id: '2',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      createdAt: new Date(),
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  create(createUserDto: CreateUserDto): User {
    if (this.findByEmail(createUserDto.email)) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
      role: createUserDto.role || 'user',
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  remove(id: string): void {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}

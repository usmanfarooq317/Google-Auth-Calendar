import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(user: Partial<User>): Promise<User | null> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });
      if (existingUser) {
        return existingUser;
      } else {
        return await this.prisma.user.create({
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: user.accessToken,
          },
        });
      }
    } catch (error) {
      console.error('Error in validateUser:', error.message);
      throw new Error('User validation failed');
    }
  }
}
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads environment variables from .env file
    AuthModule,
    GoogleCalendarModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
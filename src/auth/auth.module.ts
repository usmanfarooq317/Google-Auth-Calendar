import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { PrismaModule } from 'prisma/prisma.module';
import { calendar } from 'googleapis/build/src/apis/calendar';
import { GoogleCalendarService } from 'src/google-calendar/google-calendar.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GoogleCalendarService],
  exports: [AuthService],
})
export class AuthModule {}
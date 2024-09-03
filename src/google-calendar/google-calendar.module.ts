import { Module } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { GoogleCalendarWebhookController } from './google-calendar.webhook.controller';
import { PrismaModule } from 'prisma/prisma.module';  // Import PrismaModule

@Module({
  imports: [PrismaModule],  // Import PrismaModule here
  providers: [GoogleCalendarService],
  controllers: [GoogleCalendarWebhookController],
})
export class GoogleCalendarModule {}
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Controller('webhook')
export class GoogleCalendarWebhookController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('events')
  async handleWebhook(@Body() eventData: any) {
    try {
      const { id, summary, description, start, end, userId } = eventData;

      if (!userId) {
        throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
      }

      const startDate = new Date(start.dateTime).toISOString();
      const endDate = new Date(end.dateTime).toISOString();

      const existingEvent = await this.prisma.event.findUnique({
        where: { eventId: id },
      });

      if (existingEvent) {
        await this.prisma.event.update({
          where: { eventId: id },
          data: {
            summary,
            description,
            start: startDate,
            end: endDate,
          },
        });
      } else {
        await this.prisma.event.create({
          data: {
            eventId: id,
            summary,
            description,
            start: startDate,
            end: endDate,
            userId,
          },
        });
      }

      return { message: 'Event processed successfully' };
    } catch (error) {
      throw new HttpException('Failed to process event', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
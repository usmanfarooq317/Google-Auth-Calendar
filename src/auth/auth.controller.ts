import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GoogleCalendarService } from 'src/google-calendar/google-calendar.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req: Request, @Res() res: Response) {
    
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('Callback received with query:', req.query);
      const user = req.user;
      if (!user) {
        throw new Error('No user data found');
      }
      console.log('Authenticated user:', user);

      const events = await this.googleCalendarService.getEvents(user.accessToken)

      return res.json({ 
        message: 'User successfully added to the database',
        user,
        events,
       });

    } catch (error) {
      console.error('Error in googleAuthCallback:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
}
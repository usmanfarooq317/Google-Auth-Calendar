import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { Response } from 'express';

@Controller('auth/google')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  // Endpoint to initiate OAuth flow
  @Get('login')
  @Redirect()
  login() {
    const url = this.googleCalendarService.getAuthUrl();
    return { url };
  }

  // Callback endpoint after user consents
  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    if (!code) {
      throw new Error('No code provided');
    }
    // Exchange the authorization code for access and refresh tokens
    const tokens = await this.googleCalendarService.getTokens(code);

    // Store tokens securely (this is just an example; use a database in production)
    // For simplicity, we'll just send the tokens back to the client
    res.cookie('accessToken', tokens.access_token, { httpOnly: true });
    res.cookie('refreshToken', tokens.refresh_token, { httpOnly: true });

    // Redirect to a page where you can display the events
    res.redirect('/auth/google/events');
  }

  // Endpoint to fetch calendar events using the stored access token
  @Get('events')
  async getEvents(@Res() res: Response) {
    const accessToken = res.req.cookies['accessToken'];

    if (!accessToken) {
      return res.redirect('/auth/google/login');
    }

    // Fetch events using the access token
    const events = await this.googleCalendarService.getEvents(accessToken);

    // Return the events or render them on a page
    res.json(events);
  }
}
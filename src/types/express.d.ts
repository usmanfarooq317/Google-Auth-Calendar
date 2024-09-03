import { User } from '@prisma/client';  // Adjust the import based on where your User model is defined

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
import { PrismaClient } from '@prisma/client';
import logger from './logger';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Log Prisma queries if not in production
prisma.$on('query', (e: Prisma.QueryEvent) => {
  logger.info(`Params: ${e.params}`);
  logger.info(`Duration: ${e.duration}ms`);
});






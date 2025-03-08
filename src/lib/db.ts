import { PrismaClient, Prisma } from '@prisma/client'
import logger from './logger';
  
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV === 'production') globalForPrisma.prisma = prisma 

// Log Prisma queries if not in production
   prisma.$on('query', (e: Prisma.QueryEvent) => {
    logger.info(`Params: ${e.params}`);
    logger.info(`Duration: ${e.duration}ms`);
  });






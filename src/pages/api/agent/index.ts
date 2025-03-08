import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = 10, sort = 'name' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    const agents = await prisma.agent.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [sort as string]: 'asc',
      },
      include: {
        provider: true,
        persona: true,
        users: {
          include: {
            user: true,
          },
        },
        domains: {
          include: {
            domain: true,
          },
        },
        metrics: true,
      },
    });

    const totalAgents = await prisma.agent.count();

    res.status(200).json({
      data: agents,
      total: totalAgents,
      page: pageNumber,
      pageSize,
    });

    logger.info(`Fetched agents - Page: ${pageNumber}, Limit: ${pageSize}, Sort: ${sort}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
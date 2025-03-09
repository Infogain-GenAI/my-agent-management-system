import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';
import { status as AgentStatus } from '@prisma/client';

// Get agents by status
const getAgentsByStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, userId, page = 1, limit = 10, sort = 'name' } = req.query as { status: AgentStatus, userId: string, page?: string, limit?: string, sort?: string };

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing user ID' });
  }

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    const agents = await prisma.agent.findMany({
      where: {
        status,
        users: {
          some: {
            user_id: userId,
          },
        },
      },
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

    const totalAgents = await prisma.agent.count({
      where: {
        status,
        users: {
          some: {
            user_id: userId,
          },
        },
      },
    });

    res.status(200).json({
      data: agents,
      total: totalAgents,
      page: pageNumber,
      pageSize,
    });

    logger.info(`Agents list by status: ${JSON.stringify(agents)}`);
    logger.info(`Fetched agents by status - Page: ${pageNumber}, Limit: ${pageSize}, Sort: ${sort}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents by status: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default getAgentsByStatus;
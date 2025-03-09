import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';
import { status } from '@prisma/client';

// Get agents by status
const getAgentsByStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, page = 1, limit = 10, sort = 'name' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    const agents = await prisma.agent.findMany({
      where: {
        status: status as status,  
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
        status: status as status,  
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
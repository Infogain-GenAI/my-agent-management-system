import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

const getAgentsByUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, status, page = 1, limit = 10, sort = 'name' } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing user ID' });
  }

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    const agents = await prisma.agent.findMany({
      where: {
        users: {
          some: {
            user_id: userId,
          },
        },
        ...(status && { status: status as string }),
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
        users: {
          some: {
            user_id: userId,
          },
        },
        ...(status && { status: status as string }),
      },
    });

    res.status(200).json({
      data: agents,
      total: totalAgents,
      page: pageNumber,
      pageSize,
    });

    logger.info(`Agents list by user ID: ${JSON.stringify(agents)}`);
    logger.info(`Fetched agents by user ID - Page: ${pageNumber}, Limit: ${pageSize}, Sort: ${sort}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents by user ID: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default getAgentsByUserId;

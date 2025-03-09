import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

// Get agents by domain
const getAgentsByDomain = async (req: NextApiRequest, res: NextApiResponse) => {
  const { domain, page = 1, limit = 10, sort = 'name' } = req.query;

  if (!domain || typeof domain !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing domain' });
  }

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    const agents = await prisma.agent.findMany({
      where: {
        domains: {
          some: {
            domain: {
              id: {
                equals: domain 
              },
            },
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
        domains: {
          some: {
            domain: {
              id: {
                equals: domain
              },
            },
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

    logger.info(`Agents list by domain: ${JSON.stringify(agents)}`);
    logger.info(`Fetched agents by domain - Page: ${pageNumber}, Limit: ${pageSize}, Sort: ${sort}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents by domain: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
}

export default getAgentsByDomain;

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';
import { status as AgentStatus } from '@prisma/client';

// Get agents by provider and domain filtered by status and ordered by name
const getAgentsByProviderAndDomain = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider, domain, userId, status, page = 1, limit = 10, sort = 'name' } = req.query as { provider: string, domain: string, userId: string, status?: AgentStatus, page?: string, limit?: string, sort?: string };

  if (!provider || typeof provider !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing provider' });
  }

  if (!domain || typeof domain !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing domain' });
  }

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing user ID' });
  }

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    const agents = await prisma.agent.findMany({
      where: {
        provider: { id: { contains: provider } },
        domains: {
          some: {
            domain: {
              id: {
                equals: domain,
              },
            },
          },
        },
        // users: {
        //   some: {
        //     user_id: userId,
        //   },
        // },
        ...(status && { status }),
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
        provider: { id: { contains: provider } },
        domains: {
          some: {
            domain: {
              id: {
                equals: domain,
              },
            },
          },
        },
        // users: {
        //   some: {
        //     user_id: userId,
        //   },
        // },
        ...(status && { status }),
      },
    });

    res.status(200).json({
      data: agents,
      total: totalAgents,
      page: pageNumber,
      pageSize,
    });

    logger.info(`Agents list by provider and domain: ${JSON.stringify(agents)}`);
    logger.info(`Fetched agents by provider and domain - Page: ${pageNumber}, Limit: ${pageSize}, Sort: ${sort}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents by provider and domain: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default getAgentsByProviderAndDomain;
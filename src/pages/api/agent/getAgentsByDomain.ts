import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';
import { status as AgentStatus } from '@prisma/client';

// Get agents by domain
const getAgentsByDomain = async (req: NextApiRequest, res: NextApiResponse) => {
  const { domain, userId, status, page = 1, limit = 10, sort = 'name' } = req.query as { domain: string, userId: string, status?: AgentStatus, page?: string, limit?: string, sort?: string };

  // Validate the domain and user ID
  if (!domain || typeof domain !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing domain' });
  }

  // if (!userId || typeof userId !== 'string') {
  //   return res.status(400).json({ error: 'Invalid or missing user ID' });
  // }

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    // Fetch agents by domain, including related data
    const agents = await prisma.agent.findMany({
      where: {
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

    // Count the total number of agents
    const totalAgents = await prisma.agent.count({
      where: {
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

    // Respond with the agents data
    res.status(200).json({
      data: agents,
      total: totalAgents,
      page: pageNumber,
      pageSize,
    });

    logger.info(`Agents list by domain: ${JSON.stringify(agents)}`);
    logger.info(`Fetched agents by domain - Page: ${pageNumber}, Limit: ${pageSize}, Sort: ${sort}`);
  } catch (error) {
    // Handle errors and respond with an error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents by domain: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default getAgentsByDomain;

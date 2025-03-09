import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';
 
// Get agents by provider and domain filtered by status and ordered by name
const getAgentsByProviderAndDomain = async (req: NextApiRequest, res: NextApiResponse)  => {
  const { provider, domain, page = 1, limit = 10, sort = 'name' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    const agents = await prisma.agent.findMany({
      where: {
        provider: {
          id: {
            equals: provider as string
          },
        },
        domains: {
          some: {
            domain: {
              id: {
                equals: domain as string,
              },
            },
          },
        }
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
        provider: {
          id: {
            equals: provider as string
          },
        },
        domains: {
          some: {
            domain: {
                id: {
                equals: domain as string
              },
            },
          },
        }
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
}

export default getAgentsByProviderAndDomain;
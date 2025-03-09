import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';


const getAgentsByProvider = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider, page = 1, limit = 10, sort = 'name' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  if (!provider || typeof provider !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing provider' });
  }

  try {
    const agents = await prisma.agent.findMany({
      where: { provider: { id: { contains: provider } } },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sort as string]: 'asc' },
    });


    const totalAgents = await prisma.agent.count({
        where: {
          domains: {
            some: {
              domain: {
                id: {
                  equals: provider
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

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents by status: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default getAgentsByProvider;

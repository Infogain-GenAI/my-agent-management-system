import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';
import { status as AgentStatus } from '@prisma/client';

const getAgentsByProvider = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider, userId, status, page = 1, limit = 10, sort = 'name' } = req.query as { provider: string, userId: string, status?: AgentStatus, page?: string, limit?: string, sort?: string };

  // Validate the provider and user ID
  if (!provider || typeof provider !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing provider' });
  }

  // if (!userId || typeof userId !== 'string') {
  //   return res.status(400).json({ error: 'Invalid or missing user ID' });
  // }

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    // Fetch agents by provider, including related data
    const agents = await prisma.agent.findMany({
      where: {
        provider: { id: { contains: provider } },
        // users: {
        //   some: {
        //     user_id: userId,
        //   },
        // },
        ...(status && { status }),
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sort as string]: 'asc' },
    });

    // Count the total number of agents
    const totalAgents = await prisma.agent.count({
      where: {
        provider: { id: { contains: provider } },
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
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents by provider: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default getAgentsByProvider;

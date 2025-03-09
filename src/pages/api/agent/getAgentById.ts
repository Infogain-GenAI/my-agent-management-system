import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

const getAgentById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing agent ID' });
  }

  try {
    const agent = await prisma.agent.findUnique({
      where: { id },
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

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    return res.status(200).json(agent);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agent by ID: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default getAgentById;

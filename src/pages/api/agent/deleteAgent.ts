import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

const deleteAgent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Missing required field',
      requiredField: 'id',
    });
  }

  try {
    await prisma.user_agent.deleteMany({
      where: { agent_id: id },
    });

    await prisma.domain_agent.deleteMany({
      where: { agent_id: id },
    });

    await prisma.agent.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Delete success' });
    logger.info(`Deleted agent with id: ${id}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error deleting agent: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default deleteAgent;
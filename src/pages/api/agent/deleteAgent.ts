import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

const deleteAgent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, user_id } = req.body;

  // Validate required fields
  if (!id || !user_id) {
    return res.status(400).json({
      error: 'Missing required fields',
      requiredFields: ['id', 'user_id'],
    });
  }

  try {
    // Start a transaction to ensure all related records are deleted
    await prisma.$transaction(async (prisma) => {
      // Delete all project associations
      await prisma.project_agent.deleteMany({
        where: { agent_id: id }
      });

      // Delete all user associations
      await prisma.user_agent.deleteMany({
        where: { agent_id: id }
      });

      // Delete all domain associations
      await prisma.domain_agent.deleteMany({
        where: { agent_id: id }
      });

      // Delete all metrics
      await prisma.metric.deleteMany({
        where: { agent_id: id }
      });

      // Finally, delete the agent
      await prisma.agent.delete({
        where: { id }
      });
    });

    logger.info(`Deleted agent with ID: ${id}`);
    return res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error deleting agent: ${errorMessage}`);
    return res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default deleteAgent;
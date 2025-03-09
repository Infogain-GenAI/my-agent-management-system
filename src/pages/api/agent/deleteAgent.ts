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
    // Find the agent to ensure the user has permission to delete it
    const agent = await prisma.agent.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    // Check if the user has permission to delete the agent
    if (!agent || !agent.users.some(user => user.user_id === user_id)) {
      return res.status(403).json({ error: 'Forbidden: User does not have permission to delete this agent' });
    }

    // Delete the user-agent and domain-agent relationships
    await prisma.user_agent.deleteMany({
      where: { agent_id: id, user_id },
    });

    await prisma.domain_agent.deleteMany({
      where: { agent_id: id },
    });

    // Delete the agent
    await prisma.agent.delete({
      where: { id },
    });

    // Respond with success message
    res.status(200).json({ message: 'Delete success' });
    logger.info(`Deleted agent with id: ${id}`);
  } catch (error) {
    // Handle errors and respond with an error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error deleting agent: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default deleteAgent;
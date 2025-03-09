import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

// Update an existing agent
export const updateAgent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, description, status, capabilities, features, config, provider_id, persona_id, user_id, domain_id } = req.body;

  if (!id || !name || !status || !capabilities || !features || !config || !provider_id || !persona_id || !user_id || !domain_id) {
    return res.status(400).json({
      error: 'Missing required fields',
      requiredFields: ['id', 'name', 'status', 'capabilities', 'features', 'config', 'provider_id', 'persona_id', 'user_id', 'domain_id'],
    });
  }

  try {
    const updatedAgent = await prisma.agent.update({
      where: { id },
      data: {
        name,
        description,
        status,
        capabilities,
        features,
        config,
        provider_id,
        persona_id,
        user_id,
        domains: {
          upsert: {
            where: { domain_id_agent_id: { domain_id, agent_id: id } },
            update: { domain: { connect: { id: domain_id } } },
            create: { domain: { connect: { id: domain_id } } },
          },
        },
        users: {
          upsert: {
            where: { user_id_agent_id: { user_id, agent_id: id } },
            update: { user: { connect: { id: user_id } } },
            create: { user: { connect: { id: user_id } } },
          },
        },
      },
    });

    res.status(200).json(updatedAgent);
    logger.info(`Updated agent: ${JSON.stringify(updatedAgent)}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error updating agent: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default updateAgent;
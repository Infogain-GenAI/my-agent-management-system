import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

// Create a new agent
const createAgent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, status, capabilities, features, config, provider_id, persona_id, user_id, domain_id } = req.body;

  if (!name || !status || !capabilities || !features || !config || !provider_id || !persona_id || !user_id || !domain_id) {
    return res.status(400).json({
      error: 'Missing required fields',
      requiredFields: ['name', 'status', 'capabilities', 'features', 'config', 'provider_id', 'persona_id', 'user_id', 'domain_id'],
    });
  }

  try {
    const newAgent = await prisma.agent.create({
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
          create: {
            domain: {
              connect: { id: domain_id },
            },
          },
        },
        users: {
          create: {
            user: {
              connect: { id: user_id },
            },
          },
        },
      },
    });

    res.status(201).json(newAgent);
    logger.info(`Created new agent: ${JSON.stringify(newAgent)}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error creating agent: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default createAgent;

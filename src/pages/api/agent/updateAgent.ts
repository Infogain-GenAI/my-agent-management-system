import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

// Update an existing agent
const updateAgent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, description, status, capabilities, features, config, provider_id, persona_id, user_id, domain_id, projectIds } = req.body;

  // Validate required fields
  if (!id || !name || !status || !capabilities || !features || !config || !provider_id || !persona_id || !user_id || !domain_id) {
    return res.status(400).json({
      error: 'Missing required fields',
      requiredFields: ['id', 'name', 'status', 'capabilities', 'features', 'config', 'provider_id', 'persona_id', 'user_id', 'domain_id'],
    });
  }

  try {
    // Find the agent to ensure the user has permission to update it
    const agent = await prisma.agent.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    // Check if the user has permission to update the agent
    if (!agent || !agent.users.some(user => user.user_id === user_id)) {
      return res.status(403).json({ error: 'Forbidden: User does not have permission to update this agent' });
    }

    // Update the agent with the provided data
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
        users: {
          upsert: {
            where: { user_id_agent_id: { user_id, agent_id: id } },
            update: { user: { connect: { id: user_id } } },
            create: { user: { connect: { id: user_id } } },
          },
        },
        domains: {
          upsert: {
            where: { domain_id_agent_id: { domain_id, agent_id: id } },
            update: { domain: { connect: { id: domain_id } } },
            create: { domain: { connect: { id: domain_id } } },
          },
        },
        projects: {
          deleteMany: {},
          create: projectIds?.map((projectId: string) => ({
            project: { connect: { id: projectId } }
          })) || []
        }
      },
      include: {
        users: true,
        projects: {
          include: {
            project: {
              include: {
                users: true
              }
            }
          }
        }
      }
    });

    // Respond with the updated agent
    res.status(200).json(updatedAgent);
    logger.info(`Updated agent: ${JSON.stringify(updatedAgent)}`);
  } catch (error) {
    // Handle errors and respond with an error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error updating agent: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default updateAgent;
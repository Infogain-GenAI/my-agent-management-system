import { NextApiRequest, NextApiResponse } from 'next';
//import { prisma } from '@/lib/db';
import { prisma, logger } from './common';


export default async function createAgent(req: NextApiRequest, res: NextApiResponse) {
  const { name, description, status, capabilities, features, config, provider_id, persona_id, user_id, domain_id, projectIds } = req.body;

  // Validate required fields
  if (!name || !status || !capabilities || !features || !config || !provider_id || !persona_id || !user_id || !domain_id) {
    return res.status(400).json({
      error: 'Missing required fields',
      requiredFields: ['name', 'status', 'capabilities', 'features', 'config', 'provider_id', 'persona_id', 'user_id', 'domain_id'],
    });
  }

  try {
    const agent = await prisma.agent.create({
      data: {
        name,
        description,
        status,
        capabilities,
        features,
        config,
        provider: { connect: { id: provider_id } },
        persona: { connect: { id: persona_id } },
        user_id,
        users: {
          create: {
            user: {
              connect: { id: user_id },
            },
          },
        },
        domains: {
          create: {
            domain: {
              connect: { id: domain_id },
            },
          },
        },
        projects: {
          create: projectIds?.map((projectId: string) => ({
            project: { connect: { id: projectId } }
          })) || []
        }
      },
      include: {
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

    // Respond with the created agent
    res.status(201).json(agent);
    logger.info(`Created new agent: ${JSON.stringify(agent)}`);
  } catch (error) {
    // Handle errors and respond with an error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error creating agent: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
}
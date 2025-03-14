import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return getAgentById(req, res);
      } else {
        return getAgents(req, res);
      }
    case 'POST':
      return createAgent(req, res);
    case 'PUT':
      return updateAgent(req, res);
    case 'DELETE':
      return deleteAgent(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

// Get all agents with pagination and sorting
async function getAgents(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = 10, sort = 'name' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  try {
    const agents = await prisma.agent.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [sort as string]: 'asc',
      },
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

    const totalAgents = await prisma.agent.count();

    res.status(200).json({
      data: agents,
      total: totalAgents,
      page: pageNumber,
      pageSize,
    });

    logger.info(`Agents list: ${JSON.stringify(agents)}`);
    logger.info(`Fetched agents - Page: ${pageNumber}, Limit: ${pageSize}, Sort: ${sort}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agents: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
}

// Get an agent by ID
async function getAgentById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const agent = await prisma.agent.findUnique({
      where: { id: id as string },
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

    res.status(200).json(agent);
    logger.info(`Fetched agent: ${JSON.stringify(agent)}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching agent: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
}

// Create a new agent
async function createAgent(req: NextApiRequest, res: NextApiResponse) {
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
}

// Update an existing agent
async function updateAgent(req: NextApiRequest, res: NextApiResponse) {
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
}

// Delete an agent
async function deleteAgent(req: NextApiRequest, res: NextApiResponse) {
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

    res.status(200).json({ message: `Delete success : Deleted agent with id: ${id}` });
    logger.info(`Deleted agent with id: ${id}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error deleting agent: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
}
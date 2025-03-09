import { PrismaClient, status as AgentStatus } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getAgentsByName = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, userId, status, page = 1, limit = 10, sort = 'name' } = req.query as { name: string, userId: string, status?: AgentStatus, page?: string, limit?: string, sort?: string };

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing agent name' });
  }

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing user ID' });
  }

  try {
    const agents = await prisma.agent.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        users: {
          some: {
            user_id: userId,
          },
        },
        ...(status && { status }),
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sort]: 'asc' },
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

    return res.status(200).json(agents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default getAgentsByName;

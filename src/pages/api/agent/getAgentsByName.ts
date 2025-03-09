import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getAgentsByName = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, page = 1, limit = 10, sort = 'name' } = req.query as { name: string, page?: string, limit?: string, sort?: string };

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing agent name' });
  }

  try {
    const agents = await prisma.agent.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sort]: 'asc' },
    });

    return res.status(200).json(agents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default getAgentsByName;

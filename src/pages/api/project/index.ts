import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// GET handler
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { id, userId, page = '1', limit = '10', sort = 'name' } = req.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    const where = userId ? { users: { some: { id: userId as string } } } : {};

    if (id) {
      const project = await prisma.project.findUnique({
        where: { id: id as string },
        include: {
          users: true,
          agents: {
            include: { agent: true }
          }
        }
      });
      return res.status(200).json(project);
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: parseInt(limit as string),
        orderBy: { [sort as string]: 'asc' },
        include: {
          users: true,
          agents: {
            include: { agent: true }
          }
        }
      }),
      prisma.project.count({ where })
    ]);

    return res.status(200).json({
      projects,
      total,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching projects' });
  }
}

// POST handler
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { name, description, userIds, agentIds } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        users: {
          connect: userIds.map((id: string) => ({ id })),
        },
        agents: {
          create: agentIds?.map((agentId: string) => ({
            agent: { connect: { id: agentId } }
          })) || []
        }
      },
      include: { 
        users: true,
        agents: {
          include: {
            agent: true
          }
        }
      },
    });
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating project' });
  }
}

// PUT handler
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, description, userIds } = req.body;

  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        users: {
          set: userIds.map((id: string) => ({ id })),
        },
      },
      include: { users: true },
    });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating project' });
  }
}

// DELETE handler
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  try {
    await prisma.project.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting project' });
  }
}

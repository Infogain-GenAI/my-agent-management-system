import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

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
      logger.warn('Invalid method', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { id, email, page = '1', limit = '10', sort = 'email' } = req.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    if (id) {
      const user = await prisma.user.findUnique({
        where: { id: id as string },
        include: {
          agents: {
            include: { agent: true }
          },
          projects: true
        }
      });
      return res.status(200).json(user);
    }

    const where = email ? { email: email as string } : {};
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit as string),
        orderBy: { [sort as string]: 'asc' },
        include: {
          agents: {
            include: { agent: true }
          },
          projects: true
        }
      }),
      prisma.user.count({ where })
    ]);

    return res.status(200).json({
      users,
      total,
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching users' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Creating new user', { data: { ...data, password: '[REDACTED]' } });

  try {
    const user = await prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
        password: data.password, // Note: In production, hash password before storing
        projects: {
          connect: data.projectIds.map((id: string) => ({ id }))
        }
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
        projects: true
      },
    });
    logger.info('Successfully created user', { id: user.id });
    return res.status(201).json(user);
  } catch (error) {
    logger.error('Failed to create user', { error });
    return res.status(500).json({ message: 'Error creating user' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Updating user', { id: data.id });

  try {
    const user = await prisma.user.update({
      where: { id: data.id },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
        // Only update password if provided
        ...(data.password ? { password: data.password } : {}),
        projects: {
          set: data.projectIds.map((id: string) => ({ id }))
        }
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
        projects: true
      },
    });
    logger.info('Successfully updated user', { id: user.id });
    return res.status(200).json(user);
  } catch (error) {
    logger.error('Failed to update user', { error });
    return res.status(500).json({ message: 'Error updating user' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  logger.info('Deleting user', { id });

  try {
    await prisma.user.delete({
      where: { id: String(id) },
    });
    logger.info('Successfully deleted user', { id });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete user', { error });
    return res.status(500).json({ message: 'Error deleting user' });
  }
}

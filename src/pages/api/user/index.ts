import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'POST':
      return createUser(req, res);
    case 'PUT':
      return updateUser(req, res);
    case 'DELETE':
      return deleteUser(req, res);
    default:
      logger.warn('Invalid method', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  logger.info('Fetching all users');
  try {
    const users = await prisma.user.findMany({
      orderBy: { first_name: 'asc' },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
    logger.info('Successfully fetched users', { count: users.length });
    return res.status(200).json(users);
  } catch (error) {
    logger.error(error);
    logger.error('Failed to fetch users', { error });
    return res.status(500).json({ message: 'Error fetching users' });
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
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
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
    logger.info('Successfully created user', { id: user.id });
    return res.status(201).json(user);
  } catch (error) {
    logger.error('Failed to create user', { error });
    return res.status(500).json({ message: 'Error creating user' });
  }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
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
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
    logger.info('Successfully updated user', { id: user.id });
    return res.status(200).json(user);
  } catch (error) {
    logger.error('Failed to update user', { error });
    return res.status(500).json({ message: 'Error updating user' });
  }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
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

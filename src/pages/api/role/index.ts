import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getRoles(req, res);
    case 'POST':
      return createRole(req, res);
    case 'PUT':
      return updateRole(req, res);
    case 'DELETE':
      return deleteRole(req, res);
    default:
      logger.warn('Invalid method', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getRoles(req: NextApiRequest, res: NextApiResponse) {
  logger.info('Fetching all roles');
  try {
    const roles = await prisma.role.findMany({
      orderBy: { role: 'asc' },
    });
    logger.info('Successfully fetched roles', { count: roles.length });
    return res.status(200).json(roles);
  } catch (error) {
    logger.error('Failed to fetch roles', { error });
    return res.status(500).json({ message: 'Error fetching roles' });
  }
}

async function createRole(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Creating new role', { data });

  try {
    const role = await prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully created role', { id: role.id });
    return res.status(201).json(role);
  } catch (error) {
    logger.error('Failed to create role', { error });
    return res.status(500).json({ message: 'Error creating role' });
  }
}

async function updateRole(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Updating role', { id: data.id });

  try {
    const role = await prisma.role.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully updated role', { id: role.id });
    return res.status(200).json(role);
  } catch (error) {
    logger.error('Failed to update role', { error });
    return res.status(500).json({ message: 'Error updating role' });
  }
}

async function deleteRole(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  logger.info('Deleting role', { id });

  try {
    await prisma.role.delete({
      where: { id: String(id) },
    });
    logger.info('Successfully deleted role', { id });
    return res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete role', { error });
    return res.status(500).json({ message: 'Error deleting role' });
  }
}

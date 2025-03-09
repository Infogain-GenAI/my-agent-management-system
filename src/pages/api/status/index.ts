import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';
import { Status } from '@/lib/enums';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getStatusEnum(req, res);
    case 'POST':
      return createStatus(req, res);
    case 'PUT':
      return updateStatus(req, res);
    case 'DELETE':
      return deleteStatus(req, res);
    default:
      logger.warn('Invalid method', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
  }
}


 

async function getStatusEnum(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(Object.values(Status));
}

async function getStatuses(req: NextApiRequest, res: NextApiResponse) {
  logger.info('Fetching all statuses');
  try {
    const statuses = await prisma.status.findMany({
      orderBy: { name: 'asc' },
    });
    logger.info('Successfully fetched statuses', { count: statuses.length });
    return res.status(200).json(statuses);
  } catch (error) {
    logger.error('Failed to fetch statuses', { error });
    return res.status(500).json({ message: 'Error fetching statuses' });
  }
}

async function createStatus(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Creating new status', { data });

  try {
    const status = await prisma.status.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully created status', { id: status.id });
    return res.status(201).json(status);
  } catch (error) {
    logger.error('Failed to create status', { error });
    return res.status(500).json({ message: 'Error creating status' });
  }
}

async function updateStatus(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Updating status', { id: data.id });

  try {
    const status = await prisma.status.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully updated status', { id: status.id });
    return res.status(200).json(status);
  } catch (error) {
    logger.error('Failed to update status', { error });
    return res.status(500).json({ message: 'Error updating status' });
  }
}

async function deleteStatus(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  logger.info('Deleting status', { id });

  try {
    await prisma.status.delete({
      where: { id: String(id) },
    });
    logger.info('Successfully deleted status', { id });
    return res.status(200).json({ message: 'Status deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete status', { error });
    return res.status(500).json({ message: 'Error deleting status' });
  }
}

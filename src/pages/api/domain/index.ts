import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getDomains(req, res);
    case 'POST':
      return createDomain(req, res);
    case 'PUT':
      return updateDomain(req, res);
    case 'DELETE':
      return deleteDomain(req, res);
    default:
      logger.warn('Invalid method', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getDomains(req: NextApiRequest, res: NextApiResponse) {
  logger.info('Fetching all domains');
  try {
    const domains = await prisma.domain.findMany({
      orderBy: { name: 'asc' },
    });
    logger.info('Successfully fetched domains', { count: domains.length });
    return res.status(200).json(domains);
  } catch (error) {
    logger.error('Failed to fetch domains', { error });
    return res.status(500).json({ message: 'Error fetching domains' });
  }
}

async function createDomain(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Creating new domain', { data });

  try {
    const domain = await prisma.domain.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully created domain', { id: domain.id });
    return res.status(201).json(domain);
  } catch (error) {
    logger.error('Failed to create domain', { error });
    return res.status(500).json({ message: 'Error creating domain' });
  }
}

async function updateDomain(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Updating domain', { id: data.id });

  try {
    const domain = await prisma.domain.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully updated domain', { id: domain.id });
    return res.status(200).json(domain);
  } catch (error) {
    logger.error('Failed to update domain', { error });
    return res.status(500).json({ message: 'Error updating domain' });
  }
}

async function deleteDomain(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  logger.info('Deleting domain', { id });

  try {
    await prisma.domain.delete({
      where: { id: String(id) },
    });
    logger.info('Successfully deleted domain', { id });
    return res.status(200).json({ message: 'Domain deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete domain', { error });
    return res.status(500).json({ message: 'Error deleting domain' });
  }
}

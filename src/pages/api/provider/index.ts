import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getProviders(req, res);
    case 'POST':
      return createProvider(req, res);
    case 'PUT':
      return updateProvider(req, res);
    case 'DELETE':
      return deleteProvider(req, res);
    default:
      logger.warn('Invalid method', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getProviders(req: NextApiRequest, res: NextApiResponse) {
  logger.info('Fetching all providers');
  try {
    const providers = await prisma.provider.findMany({
      orderBy: { name: 'asc' },
    });
    logger.info('Successfully fetched providers', { count: providers.length });
    return res.status(200).json(providers);
  } catch (error) {
    logger.error('Failed to fetch providers', { error });
    return res.status(500).json({ message: 'Error fetching providers' });
  }
}

async function createProvider(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Creating new provider', { data });

  try {
    const provider = await prisma.provider.create({
      data: {
        name: data.name,
        description: data.description,
        url: data.url,
        apiKey: data.apiKey,
      },
    });
    logger.info('Successfully created provider', { id: provider.id });
    return res.status(201).json(provider);
  } catch (error) {
    logger.error('Failed to create provider', { error });
    return res.status(500).json({ message: 'Error creating provider' });
  }
}

async function updateProvider(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Updating provider', { id: data.id });

  try {
    const provider = await prisma.provider.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        url: data.url,
        apiKey: data.apiKey,
      },
    });
    logger.info('Successfully updated provider', { id: provider.id });
    return res.status(200).json(provider);
  } catch (error) {
    logger.error('Failed to update provider', { error });
    return res.status(500).json({ message: 'Error updating provider' });
  }
}

async function deleteProvider(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  logger.info('Deleting provider', { id });

  try {
    await prisma.provider.delete({
      where: { id: String(id) },
    });
    logger.info('Successfully deleted provider', { id });
    return res.status(200).json({ message: 'Provider deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete provider', { error });
    return res.status(500).json({ message: 'Error deleting provider' });
  }
}

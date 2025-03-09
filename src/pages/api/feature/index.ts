import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getFeatures(req, res);
    case 'POST':
      return createFeature(req, res);
    case 'PUT':
      return updateFeature(req, res);
    case 'DELETE':
      return deleteFeature(req, res);
    default:
      logger.warn('Invalid method', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getFeatures(req: NextApiRequest, res: NextApiResponse) {
  logger.info('Fetching all features');
  try {
    // Verify prisma connection
    if (!prisma) {
      throw new Error('Database connection not initialized');
    }

    const features = await prisma.feature.findMany({
      orderBy: { name: 'asc' },
    });
    
    logger.info('Successfully fetched features', { count: features.length });
    return res.status(200).json(features);
  } catch (error) {
    logger.error('Failed to fetch features', {
      error: {
        name: error.name,
        message: error.message,
        code: error?.code,
        stack: error.stack,
      },
    });
    
    if (error.message.includes('Database connection')) {
      return res.status(500).json({ 
        message: 'Database connection error',
        details: error.message 
      });
    }
    
    return res.status(500).json({ 
      message: 'Error fetching features',
      details: error.message
    });
  }
}

async function createFeature(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Creating new feature', { data });

  try {
    const feature = await prisma.feature.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully created feature', { id: feature.id });
    return res.status(201).json(feature);
  } catch (error) {
    logger.error('Failed to create feature', { error });
    return res.status(500).json({ message: 'Error creating feature' });
  }
}

async function updateFeature(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Updating feature', { id: data.id });

  try {
    const feature = await prisma.feature.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully updated feature', { id: feature.id });
    return res.status(200).json(feature);
  } catch (error) {
    logger.error('Failed to update feature', { error });
    return res.status(500).json({ message: 'Error updating feature' });
  }
}

async function deleteFeature(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  logger.info('Deleting feature', { id });

  try {
    await prisma.feature.delete({
      where: { id: String(id) },
    });
    logger.info('Successfully deleted feature', { id });
    return res.status(200).json({ message: 'Feature deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete feature', { error });
    return res.status(500).json({ message: 'Error deleting feature' });
  }
}

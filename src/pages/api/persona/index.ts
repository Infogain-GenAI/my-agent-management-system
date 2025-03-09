import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getPersonas(req, res);
    case 'POST':
      return createPersona(req, res);
    case 'PUT':
      return updatePersona(req, res);
    case 'DELETE':
      return deletePersona(req, res);
    default:
      logger.warn('Invalid method', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getPersonas(req: NextApiRequest, res: NextApiResponse) {
  logger.info('Fetching all personas');
  try {
    const personas = await prisma.persona.findMany({
      orderBy: { name: 'asc' },
    });
    logger.info('Successfully fetched personas', { count: personas.length });
    return res.status(200).json(personas);
  } catch (error) {
    logger.error('Failed to fetch personas', { error });
    return res.status(500).json({ message: 'Error fetching personas' });
  }
}

async function createPersona(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Creating new persona', { data });

  try {
    const persona = await prisma.persona.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully created persona', { id: persona.id });
    return res.status(201).json(persona);
  } catch (error) {
    logger.error('Failed to create persona', { error });
    return res.status(500).json({ message: 'Error creating persona' });
  }
}

async function updatePersona(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  logger.info('Updating persona', { id: data.id });

  try {
    const persona = await prisma.persona.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    logger.info('Successfully updated persona', { id: persona.id });
    return res.status(200).json(persona);
  } catch (error) {
    logger.error('Failed to update persona', { error });
    return res.status(500).json({ message: 'Error updating persona' });
  }
}

async function deletePersona(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  logger.info('Deleting persona', { id });

  try {
    await prisma.persona.delete({
      where: { id: String(id) },
    });
    logger.info('Successfully deleted persona', { id });
    return res.status(200).json({ message: 'Persona deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete persona', { error });
    return res.status(500).json({ message: 'Error deleting persona' });
  }
}
